import { cn } from '@/lib/utils';
import Image from 'next/image'
import React from 'react'

enum CallStautus {
  INACTIVE = 'INACTIVE',
  CONNECTING = 'CONNECTING',
  ACTIVE = 'ACTIVE',
  FINISHED = 'FINISHED'
}

const messages = [
  "Hello, how are you?",
  "I'm Chetan Sharma, Nice to meet you.",
]
const lastMessage = messages[messages.length - 1];

const Agent = ({userName}:AgentProps) => {
  const isSpeaking = true; // Replace with actual state or prop
  const callStautus = CallStautus.INACTIVE; // Replace with actual state or prop
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
            {lastMessage}
          </p>
        </div>
      </div>
    )}
    <div className="w-full flex justify-center mt-4">
      {callStautus !== 'ACTIVE' ? (
        <button className='btn-call'>
          <span className={cn('absolute animate-ping rounded-full opacity-75', callStautus !== 'CONNECTING' & 'hidden')}/>
           <span> {callStautus === 'INACTIVE' ||  callStautus === 'FINISHED' ?  'Call' : 'Connecting...'}  </span>
         
        </button>
      ) : (
        <button className='btn-disconnect'>
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