import Agent from '@/components/custom/Agent'
import React from 'react'

const page = () => {
  return (
    <div>
        <h1 className='text-3xl font-bold'>Interview</h1>
        <Agent userName="Chetan Sharma" type='generate'/>
    </div>
  )
}

export default page