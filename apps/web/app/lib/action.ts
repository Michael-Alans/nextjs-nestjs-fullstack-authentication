"use server"
import { getSession } from "../session"
import { authFetch } from "./authFetch"

export const getProfile = async () => {
  const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL
  
  // 1. Await the function call to get the actual data
 //  const session = await getSession(); 

  // 2. Debugging: Check if the token actually exists before fetching
  //if (!session?.accessToken) {
   // console.error("No access token found in session");
   // return { error: "Not authenticated" };
 // }

 // const response = await fetch(`${NEXT_PUBLIC_API_URL}/auth/protected`, {
  //  headers: {
   //     // 3. Ensure Bearer prefix is followed by the string
   //     Authorization: `Bearer ${session.accessToken}`,
   // },
  //  // Optional: disable caching if profile data changes often
   // cache: 'no-store' 
  //})

  //if (!response.ok) {
   // const errorData = await response.json();
   // return errorData;
  //}

  //return await response.json();

  const response = await authFetch(`${NEXT_PUBLIC_API_URL}/auth/protected`, {});
  const result = response.json()
  return result
}