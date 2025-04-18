import React from 'react'
import AuthForm from "@/components/AuthForm"

const page = () => {
  return (
    <AuthForm type="sign-in" /> // Pass the type prop to AuthForm
  )
}

export default page