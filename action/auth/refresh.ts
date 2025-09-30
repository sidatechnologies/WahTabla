'use server'

// import { cookies } from "next/headers";
// import { decode } from "next-auth/jwt";
import { RequestInit } from "next/dist/server/web/spec-extension/request";
import { BackendJWT } from "next-auth";

// const sessionTokenName =
//   process.env.NODE_ENV === 'production'
//     ? '__Secure-authjs.session-token'
//     : 'authjs.session-token';

const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL ?? 'http://localhost:5842'


export const refresh = async (accesstoken: string, refreshtoken: string) => {

  // const cookieStore = cookies()
  // const tokens = cookieStore.get(sessionTokenName)?.value ?? ''

  // const session = await decode({
  //   token: tokens,
  //   secret: process.env.AUTH_SECRET!,
  //   salt: sessionTokenName
  // })

  // if (!session) {
  //   return { success: false, message: 'Access token not found in cookies' };
  // }

  // if (!session?.data?.tokens?.access || !session?.data?.tokens?.refresh) {
  //   return { success: false, message: 'Access or refresh token not found in session' };
  // }

  const accessToken = accesstoken;
  const refreshToken = refreshtoken;

  // Construct the Cookie header
  const cookieHeader = `accessToken=${accessToken}; refreshToken=${refreshToken}; Path=/; HttpOnly; Secure`;

  const options: RequestInit = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Cookie: cookieHeader, // Add cookies to the request
    },
    credentials: "include", // Ensure cookies are included in the request
  };


  try {
    const response = await fetch(`${baseUrl}/users/refresh-token`, options)
    const data = await response.json()
    console.log(data)
    if (response.status === 200) {

      const tokens: BackendJWT = {
        access: data.data.accessToken,
        refresh: data.data.refreshToken
      }

      return {
        success: true,
        message: data.message,
        tokens
      }
    } else {
      return { success: false, message: data.message || 'Token refreshment failed' }
    }


  } catch (error) {
    console.error('Login Error:', error)
    // Use a type guard to check if error is an instance of Error
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred'
    return { success: false, message: errorMessage }
  }
}