import {google} from '@ai-sdk/google';
import { getRandomInterviewCover } from '../../../../../utils/utils';
import { db } from '../../../../../firebase/admin';
export async function GET(){
    return Response.json({succcess:true , data:"Hello from VAPI API"},{status:200});
}

export async function POST(request:Request){
    const { type, role , level, techstack , amount , userid } = await request.json();
    try{
        const { questions } = await generateText({
            model:google('gemini-1.5-flash-001'),
            prompt: `Prepare questions for a job interview. 
            The job role is ${role} and the job experience level is ${level}.
            the techstack used in the job is ${techstack}.
            The number of questions required is ${amount}.
            the focus between behavioral and technical questions should lean towards ${type}.
            Please return only the questions, without any additional text.
            The questions are going to be read by a voice assistant so do not use "/" or "*" or any other special characters.
            Return the questions formatted like this:
            [ "question 1", "question 2", "question 3",]
             
            Thank you! <3`,
        })

        const interview = {
            role,
            level,
            techstack: techstack.split(','),
            questions: JSON.parse(questions),
            userId: userid,
            finalised: true,
            coverImage: getRandomInterviewCover(),
            createdAt: new Date().toISOString(),
            
        }

        await db.collection('interviews').add(interview);
        return Response.json({success:true} ,{status:200});

    }catch(e){
        console.error(e);
        return Response.json({success:false, message:"Something went wrong"},{status:500});
    }
}
