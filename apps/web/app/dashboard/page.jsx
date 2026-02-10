import React from 'react'
import { getSession } from '../session'
import { redirect } from 'next/navigation'

 async function Dashboard() {

  const session = await getSession()
  if(!session || !session.user) redirect("/auth/signin")
  console.log({session})
  

  return (
    <div>Dashboard</div>
  )
}

export default Dashboard