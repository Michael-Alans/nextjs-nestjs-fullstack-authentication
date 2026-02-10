import React from 'react'
import {getProfile} from '../lib/action'

async function ProfilePage() {

  const session = getProfile()
  const res = await session
  
  return (
    <div><p>{JSON.stringify(res)}</p></div>
  )
}

export default ProfilePage