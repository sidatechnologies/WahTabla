'use server'

import { cookies } from "next/headers";
import { decode } from "next-auth/jwt";
import { RequestInit } from "next/dist/server/web/spec-extension/request";
import * as z from "zod"
import { changePasswordSchema } from "@/schema/profile";

const sessionTokenName =
  process.env.NODE_ENV === 'production'
    ? '__Secure-authjs.session-token'
    : 'authjs.session-token';

const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL ?? 'http://localhost:5842'


export const changePassword = async (values: z.infer<typeof changePasswordSchema>) => {

  const cookieStore = cookies()
  const tokens = cookieStore.get(sessionTokenName)?.value ?? ''

  const session = await decode({
    token: tokens,
    secret: process.env.AUTH_SECRET!,
    salt: sessionTokenName
  })

  if (!session) {
    return { success: false, message: 'Access token not found in cookies' };
  }

  if (!session?.data?.tokens?.access || !session?.data?.tokens?.refresh) {
    return { success: false, message: 'Access or refresh token not found in session' };
  }

  const accessToken = session.data.tokens.access;
  const refreshToken = session.data.tokens.refresh;

  // Construct the Cookie header
  const cookieHeader = `accessToken=${accessToken}; refreshToken=${refreshToken}; Path=/; HttpOnly; Secure`;

  const options: RequestInit = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Cookie: cookieHeader, // Add cookies to the request
    },
    credentials: "include",
    body: JSON.stringify(values) // Ensure cookies are included in the request
  };
  try {

    // console.log(options)
    const response = await fetch(`${baseUrl}/users/change-password`, options)
    // console.log(response.status)
    const data = await response.json()
    // console.log(data)

    if (response.status === 200) {

      return {
        success: true,
        message: 'Successfully Changed Password',
      }
    } else {
      return { success: false, message: data.message || 'Password Changing failed' }
    }


  } catch (error) {
    console.error('Login Error:', error)
    // Use a type guard to check if error is an instance of Error
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred'
    return { success: false, message: errorMessage }
  }
}