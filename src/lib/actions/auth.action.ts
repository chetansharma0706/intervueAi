"use server";

import { cookies } from "next/headers";
import { auth, db } from "../../../firebase/admin";
const ONE_WEEK = 7 * 24 * 60 * 60; // Seconds in one week

export async function SignUp(params: SignUpParams) {
  const { uid, email, name } = params;
  try {
    const userRecord = await db.collection("users").doc(uid).get();
    if (userRecord.exists) {
      return {
        success: false,
        message: "User already exists. Please login",
      };
    }
    await db.collection("users").doc(uid).set({
      email,
      name,
    });
    return {
      success: true,
      message: "User created successfully",
    };
  } catch (e: any) {
    // Handle error
    console.log(e);
    if (e.code === "auth/email-already-in-use") {
      return {
        success: false,
        message: "Email already in use",
      };
    } else if (e.code === "auth/invalid-email") {
      return {
        success: false,
        message: "Invalid email",
      };
    } else if (e.code === "auth/operation-not-allowed") {
      return {
        success: false,
        message: "Operation not allowed",
      };
    } else {
      return {
        success: false,
        message: "Something went wrong",
      };
    }
  }
}

export async function SignIn(params: SignInParams) {
  const { email, idToken } = params;
  try {
    const userRecord = await auth.getUserByEmail(email);
    if (!userRecord) {
      return {
        success: false,
        message: "User does not exist. Please sign up",
      };
    }
    await setSessionCookie(idToken);
    return {
      success: true,
      message: "User signed in successfully",
    };
  } catch (e: any) {
    // Handle error
    console.log(e);
    if (e.code === "auth/user-not-found") {
      return {
        success: false,
        message: "User not found",
      };
    } else if (e.code === "auth/wrong-password") {
      return {
        success: false,
        message: "Wrong password",
      };
    } else {
      return {
        success: false,
        message: "Something went wrong",
      };
    }
  }
}

export async function setSessionCookie(idToken: string) {
    const cookieStore = await cookies();
    const sessionCookie = await auth.createSessionCookie(idToken, {
      expiresIn: ONE_WEEK * 1000, // 7 days
    });
    cookieStore.set("session", sessionCookie, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: ONE_WEEK, 
      sameSite: "lax",
      path: "/",
    });
} 

export async function getCurrentUser():Promise<User | null>{
    const cookieStore = await cookies();
    // Get the session cookie from the request
    const sessionCookie = cookieStore.get("session")?.value;
    if(!sessionCookie){
        return null;
    }
    try {   
        const decodedClaims = await auth.verifySessionCookie(sessionCookie, true);
        const userRecord = await db.collection("users").doc(decodedClaims.uid).get();
        if (!userRecord.exists) {
            return null;
        }
        return {
            ...userRecord.data(),
            id: decodedClaims.uid,
        } as User;
    }catch(e){
        console.log(e);
        return null;
    }

}

export async function isAuthenticated():Promise<boolean>{
   const user = await getCurrentUser();
   if(!user){
       return false;
   }
   return true;
}


// export async function resetPassword(email: string) {
//   try {
//     console.log("Password reset email sent!");
//   } catch (error) {
//     console.error("Error sending password reset email:", error);
//     throw new Error(error.message); // Propagate error to frontend
//   }
// }
