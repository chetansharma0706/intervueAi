import Agent from '@/components/custom/Agent'
import { getCurrentUser } from '@/lib/actions/auth.action'
import React from 'react'

const page = async () => {

  const user = await getCurrentUser();

  
  return (
    <div>
        <h1 className='text-3xl font-bold'>Interview Creation</h1>
        <Agent userName={user?.name} userId={user?.id} type='generate'/>
    </div>
  )
}

export default page