"use client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import Logo from "./custom/logo";
import Link from "next/link";
import { SignIn, SignUp } from "@/lib/actions/auth.action";
import {
  Form,
  // FormControl,
  // FormField,
  // FormItem,
  // FormLabel,
  // FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";
import FormField from "./custom/FormField";
import { useRouter } from "next/navigation";
import { auth } from "../../firebase/client";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword , sendPasswordResetEmail} from "firebase/auth";
// import { Input } from "@/components/ui/input";

const authFormSchema = (type: string) => {
  return z.object({
    // Conditionally require 'name' field only for 'sign-up'
    name: type === 'sign-up'
      ? z.string()
          .min(4, { message: "Name must be at least 4 characters." })
          .max(50, { message: "Name must not exceed 50 characters." })
      : z.string().optional(),

    // 'email' is required for all three types
    email: z.string()
      .email({ message: "Please enter a valid email address." }),

    // Conditionally require 'password' field only for 'sign-up' and 'sign-in'
    password: type !== 'forget-password' // Only required for 'sign-up' and 'sign-in'
      ? z.string()
          .min(4, { message: "Password must be at least 4 characters long." })
      : z.string().optional(),
  });
};




const AuthForm = ({ type }: { type: string }) => {
  const router = useRouter();

  const formSchema = authFormSchema(type);
  type formSchemaType = z.infer<typeof formSchema>
  const form = useForm<formSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });
  const onSubmit = async (data: formSchemaType) => {
    try{
      if(type === "sign-up"){
        const { name, email, password } = data;
        const userCredentials = await createUserWithEmailAndPassword(
          auth,
          email,
          password!
        );
        // Call the sign up function from the auth action
        const response = await SignUp({ 
          uid: userCredentials.user.uid,
          name:name!, email:email, password:password!
        });
        // Check if the response is successful
        // If not, show an error message
        if(!response?.success){
          toast.error(response?.message);
          return;
        }
        toast.success("Signed up Successfully");
        console.log("Sign up: " + data);
        router.push('/sign-in');
      }else if(type === "sign-in"){
        const { email, password } = data;
        // Call the sign in function from the auth action
        const userCredentials = await signInWithEmailAndPassword(
          auth,
          email,
          password!
        );
        const idToken = await userCredentials.user.getIdToken();
        if(!idToken){
          toast.error("Something went wrong. Please try again.");
          return;
        }
        await SignIn({ email, idToken });
        toast.success("Signed in Successfully");
        console.log("Sign in: " + data);
        router.push('/');

      }else if (type === "forget-password") {
        const { email } = data;
        try {
          await sendPasswordResetEmail(auth, email);
          // Success: password reset email sent
          toast.success("Reset password link sent to your email.");
          console.log("Reset Password: " + data);
          // router.push('/sign-in');
        } catch (error : any) {
          // Error: handle any error that occurs
          toast.error(error.message || "Something went wrong. Please try again.");
        }
      }
    }catch(error:any){
      toast.error("There is some issue: " + error.message);
    }
  };


  return (
    <div className="card-border lg:min-w-[466px]">
      <div className="card flex flex-col text-center gap-6 py-14 px-10">
        <Logo />
        <h3 className="text-xl text-primary-100">Practice your interview skills with AI</h3>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="form space-y-6 mt-4"
          >
            {/* Conditionally render the 'name' field based on the form type */}
            {type === 'sign-up' && (
              <FormField name={"name"} control={form.control} label="Name" placeholder="Enter your name" />
            )}

            <FormField name={"email"} control={form.control} label="Email" placeholder="Enter your email" type="email" />

            {/* Conditionally render the 'password' field based on the form type */}
            {type !== 'forget-password' && (
              <FormField name={"password"} control={form.control} label="Password" placeholder="Enter your password" type="password" />
            )}

            {type === "sign-in" && <div className="text-sm">
              <Link href="/forget-password" className="text-primary-100 cursor-pointer">
                Forgot Password?
              </Link>
              </div>}

            <Button type="submit" className="btn">
              {type === "sign-in" ? "Sign In" : type === "sign-up" ? "Sign Up" : "Reset Password"}
            </Button>
          </form>
        </Form>

        <Link href={type === "sign-in" ? '/sign-up' : '/sign-in'} className="text-sm text-gray-500">
          {type === "sign-in" 
            ? "Don't have an account?" 
            : type === "sign-up" 
            ? "Already have an account?" 
            : "Remember your password?"}
          <span className="text-primary-100 cursor-pointer">
            {type === "sign-in" ? "Sign Up" : type === "sign-up" ? "Sign In" : "Sign In"}
          </span>
        </Link>
      </div>
    </div>
  );
};

// This is a simple authentication form component

export default AuthForm;
