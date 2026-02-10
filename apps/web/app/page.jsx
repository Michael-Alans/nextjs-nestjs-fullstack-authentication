import React from 'react'
import { getSession } from './session'

async function page() {

  const session = await getSession()
  console.log({session})

  return (
    <div>Home page</div>
  )
}

export default page