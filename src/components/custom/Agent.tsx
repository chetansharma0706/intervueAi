"use client"
import { cn } from '@/lib/utils';
import { vapi } from '@/lib/vapi.sdk';
import Image from 'next/image'
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'

enum CallStautus {
  INACTIVE = 'INACTIVE',
  CONNECTING = 'CONNECTING',
  ACTIVE = 'ACTIVE',
  FINISHED = 'FINISHED'
}

interface SavedMessage {
  role: "user" | "assistant" | "system";
  content:string;
}

const Agent = ({userName , userId , type}:AgentProps) => {
  
  const router = useRouter();
  const [isSpeaking , setIsSpeaking] = useState(false);
  const [callStatus , setCallStatus] = useState(CallStautus.INACTIVE);
  const [messages , setMessages] = useState<SavedMessage[]>([]);

  useEffect(() => {
    const onCallStart = () => {setCallStatus(CallStautus.ACTIVE)};
    const onCallEnd = () => {setCallStatus(CallStautus.FINISHED)};

    const onMessage = (message:Message) => {
      if(message.type === 'transcript' && message.transcriptType === 'final'){
        const newMessage = { role: message.role, content: message.transcript };
        setMessages((prev) => [...prev, newMessage]); 
      }
      
    }

    const onSpeechStart = () => {
      setIsSpeaking(true);
    }
    const onSpeechEnd = () => {
      setIsSpeaking(false);
    }
    const onError = (error:Error) => {
      console.error('Error:', error);
    }
    vapi.on('call-start', onCallStart);
    vapi.on('call-end', onCallEnd);
    vapi.on('speech-start', onSpeechStart);
    vapi.on('speech-end', onSpeechEnd);
    vapi.on('message', onMessage);
    vapi.on('error', onError);
    
   
    return () => {
      vapi.off('call-start', onCallStart);
      vapi.off('call-end', onCallEnd);
      vapi.off('speech-start', onSpeechStart);
      vapi.off('speech-end', onSpeechEnd);
      vapi.off('message', onMessage);
      vapi.off('error', onError); 
    }
  }, []);
    

  useEffect(() => {
    if(callStatus === CallStautus.FINISHED){
      router.push('/');
    }
  }
  , [callStatus, messages , type , userId]);

  const handleCall = async () => {
    setCallStatus(CallStautus.CONNECTING);
    try{
      await vapi.start(process.env.NEXT_PUBLIC_VAPI_ASSISTANT_ID! ,{
        variableValues: {
          username: userName,
          userid: userId,
      } });
    }catch(e){
      console.error(e);
      setCallStatus(CallStautus.INACTIVE);
    }
  }

  const handleDisconnect = async () => {
    setCallStatus(CallStautus.FINISHED);
    vapi.stop();
  }


  const isCallInActiveOrFinished = callStatus === CallStautus.INACTIVE || callStatus === CallStautus.FINISHED;
  const latestMessage = messages[messages.length - 1]?.content || '';
  return (
    <>
    <div className="call-view mt-4">
      <div className="card-interviewer">
        <div className="avatar max-md:size-[80px]">
          <Image src="/ai-avatar.png" alt="Avatar" width={65} height={54} className='max-md:w-3/5 max-md:h-3.5/5'/>
          {isSpeaking && <span className='animate-speak'></span>}
        </div>
        <h3>AI Interviewer</h3>

      </div>
      <div className="card-border">
        <div className="card-content">
          <Image src="/user-avatar.png" alt="user avatar" width={540} height={540} className='rounded-full object-cover size-[120px]'/>
          <h3>{userName}</h3>
        </div>

      </div>
    </div>
    {messages.length > 0 && (
      <div className="transcript-border mt-4">
        <div className="transcript">
          <p className={cn('transition-opacity duration-500 opacity-0', 'animate-fadeIn opacity-100')}>
            {latestMessage}
          </p>
        </div>
      </div>
    )}
    <div className="w-full flex justify-center mt-4">
      {callStatus !== 'ACTIVE' ? (
        <button className='btn-call' onClick={handleCall}>
          <span className={cn('absolute animate-ping rounded-full opacity-75', callStatus !== 'CONNECTING' && 'hidden')}/>
           <span> {isCallInActiveOrFinished ?  'Call' : '...'}  </span>
         
        </button>
      ) : (
        <button className='btn-disconnect' onClick={handleDisconnect}>
          <span>
            END
          </span>
        </button>
      )}
    </div>
    </>
  )
}

export default Agent