import { Button } from '@/components/ui/button'
import React from 'react'
import Image from 'next/image'
import { dummyInterviews } from '../../../constants'
import InterviewCard from '@/components/custom/InterviewCard'
import { getCurrentUser, getInterviewsByUserId } from '@/lib/actions/auth.action'

const page = async () => {
  const user = await getCurrentUser();
  const userInterviews = await getInterviewsByUserId(user?.id);
  const hasAnyPreviousInterviews = userInterviews?.length > 0;


  return (
    <>  
    <section className="card-cta">
      <div className="flex flex-col gap-6 max-w-lg">
        <h1 className='max-lg:text-3xl'>Become Interview-ready with our Ai-Powered Practice and Feedback</h1>
        <p className="text-gray-400 mb-6">Practice real-world coding and behavioral interviews. Get instant feedback from our AI and boost your confidence to crack top tech roles.</p>
        <Button asChild className="btn-primary max-sm:w-full">
          <a href="/interview">Start an Interview</a>
        </Button>
        </div>
        <div className="w-130 h-110 overflow-hidden rounded-lg max-lg:hidden">
          <Image
            src="/hero-image.png"
            alt="robot"
            width={600}
            height={600}
            priority
            className="object-cover w-full h-full "
          />
        </div>

      </section>
      <section className="flex flex-col gap-6 mt-8">
        <h2>Your Interviews</h2>
        <div className="interviews-section">
          {hasAnyPreviousInterviews ? (
            userInterviews?.map((interview) => (
              <InterviewCard {...interview} key={interview.id} />
            ))
          ) : (
            <p>You haven&apos;t taken any Interview yet </p>
          )}
        </div>
        
      </section>
      <section className="flex flex-col gap-6 mt-8">
        <h2>Take an Interview</h2>
        <div className="interviews-section">
        {dummyInterviews.map((interview) => (
            <InterviewCard {...interview} key={interview.id} />
          ))}
          {/* <p>Sorry! No Interview Available Right Now</p> */}
        </div>
      </section>
    </>   
  )
}

export default page