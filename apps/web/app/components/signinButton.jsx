import React from 'react'
import Link from 'next/link'
import { getSession } from '../session'

export default async function SigninButton() {

    const session = await getSession()
  return (
    <div>{!session || !session.user ? 

        <>
        <Link 
              href="/auth/signin" 
              className="bg-blue-600 text-white px-5 py-2 rounded-full font-medium hover:bg-blue-700 transition-all shadow-sm active:scale-95"
            >
              Sign In
        </Link>

        <Link 
              href="/auth/signup" 
              className="bg-blue-600 text-white px-5 py-2 rounded-full font-medium hover:bg-blue-700 transition-all shadow-sm active:scale-95"
            >
              Sign Up
        </Link></>
     : 
     <>
      <p>{session.user.name}</p>
      <a href={"/api/auth/signout"}>Sign Out</a>
     </>
     }</div>
  )
}
