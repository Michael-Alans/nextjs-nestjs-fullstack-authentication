
"use server"

import { SignJWT, jwtVerify } from "jose"
import { redirect } from "next/navigation"
import { cookies } from "next/headers"

export type Session = {
    user: {
        id:string,
        name:string
    },

    accessToken:string,
    refreshToken:string

}

const secretkey = process.env.SESSION_SECRET_KEY!
const encodedkey = new TextEncoder().encode(secretkey)

export async function createSession(payload: Session) {
  // 1. ADD THIS LOG HERE to see what is being sent to the "factory"
  console.log("Creating session with payload:", payload);

  const expiredAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  
  // 2. Ensure payload is spread correctly
  const session = await new SignJWT({ ...payload }) // Use spread to be safe
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime('7D')
    .sign(encodedkey);

  const cookieStore = await cookies(); 
  cookieStore.set("session", session, {
    httpOnly: true,
    secure: true,
    expires: expiredAt,
    sameSite: "lax",
    path: "/"
  });
}
export async function getSession() {
  const cookieStore = await cookies(); 
  const cookie = cookieStore.get("session")?.value
  if(!cookie) return null

  try {
    const {payload} = await jwtVerify(cookie, encodedkey, {
      algorithms: ["HS256"]
    })
    

    return payload as Session
  } catch (err) {
    console.error('Failed to verify the session', err)
    redirect("/auth/signin")
  }
}

export async function deleteSession() {
  (await cookies()).delete('session')
}


export async function updateToken({ accessToken, refreshToken }: {
  accessToken: string;
  refreshToken: string;
}) {
  const cookie = (await cookies()).get("session")?.value;
  if (!cookie) return null;

  // 1. Destructure "payload" from the result
  const { payload } = await jwtVerify(cookie, encodedkey);
  
  if (!payload) throw new Error('Session not found');

  // 2. Cast the payload so TS knows it has 'user', 'accessToken', etc.
  const sessionPayload = payload as unknown as Session;

  const newPayload: Session = {
    user: {
      ...sessionPayload.user,
    },
    accessToken,
    refreshToken
  };

  await createSession(newPayload);
}