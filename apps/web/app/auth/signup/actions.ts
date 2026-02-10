"use server";

import z, { json } from "zod";
import { redirect } from "next/navigation";
import { createSession, updateToken } from "../../session";

/* =======================
   SCHEMAS
======================= */

const SignupSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(50),
  email: z.string().email("Invalid email address").trim().toLowerCase(),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[0-9]/, "Password must contain at least one number"),
});

const SigninSchema = z.object({
  email: z.string().email("Invalid email address").trim().toLowerCase(),
  password: z.string().min(1, "Password is required"),
});

/* =======================
   TYPES
======================= */

export type SignupState = {
  errors?: {
    name?: string[];
    email?: string[];
    password?: string[];
  };
  message?: string | null;
};

export type SigninState = {
  errors?: {
    email?: string[];
    password?: string[];
  };
  message?: string | null;
};

/* =======================
   SIGNUP ACTION
======================= */

export async function handleSignup(
  prevState: SignupState | null,
  formData: FormData
): Promise<SignupState> {
  const validatedFields = SignupSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Validation failed",
    };
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/register`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validatedFields.data),
      }
    );

    const text = await response.text();
    const data = text ? JSON.parse(text) : null;

    if (!response.ok) {
      return {
        message: data?.message || "Failed to create account",
      };
    }
  } catch (error) {
    return {
      message: "Server error: Connection failed",
    };
  }

  redirect("/auth/signin");
}

/* =======================
   SIGNIN ACTION
======================= */

export async function handleSignin(
  prevState: SigninState,
  formData: FormData
): Promise<SigninState> {
  console.log(">>> SERVER ACTION TRIGGERED <<<");

  const validatedFields = SigninSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/signin`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(validatedFields.data),
    }
  );

  if (response.ok) {
    const result = await response.json();

    await createSession({user: 
      {id:result.id, 
        name:result.name,
      },
      accessToken:result.accessToken,
      refreshToken:result.refreshToken
    })

    console.log(result);
    // You must return a state object here to satisfy the return type
    
    redirect("/")
  } else {
    // Added missing 'return' keyword and wrapped in object
    return { 
      message: response.status === 400 ? "invalid credentials!" : response.statusText 
    };
  }

  
}

export const refreshToken = async (oldRefreshToken: string) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`, { // Added comma here
      method: "POST",
      body: JSON.stringify({
        refresh: oldRefreshToken,
      }),
    });

    if(!response.ok) {
      throw new Error('Failed to refresh token' + response.statusText)
    }
    
    const {accessToken, refreshToken } = await response.json()
    //update tokens
    const updateRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/update`, {
      method:"POST",
      body:JSON.stringify({
          accessToken,
          refreshToken
      })
  })

  if(!updateRes.ok) throw new Error("Failed to update the tokens")
  return accessToken
    
  } catch (err) {
    console.error('failed to  refresh token:', err)
    return null
  }
}; // Added missing closing brace