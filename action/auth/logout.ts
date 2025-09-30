'use server'

import { cookies } from "next/headers";
import { decode } from "next-auth/jwt";
import { RequestInit } from "next/dist/server/web/spec-extension/request";

const sessionTokenName =
  process.env.NODE_ENV === 'production'
    ? '__Secure-authjs.session-token'
    : 'authjs.session-token';


const csrfTokenName = 
  process.env.NODE_ENV === 'production'
    ? '__Host-authjs.csrf-token'
    : 'authjs.csrf-token';

const callbackUrlName =
  process.env.NODE_ENV === 'production'
    ? '__Secure-authjs.callback-url'
    : 'authjs.callback-url';

const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL ?? 'http://localhost:5842'


export const logout = async () => {

  const cookieStore = cookies()
  const tokenCookie = cookieStore.get(sessionTokenName);

  if (!tokenCookie?.value) {
    return { success: false, message: 'Session token not found in cookies' };
  }

  const tokens = tokenCookie.value;

  try {
    const session = await decode({
      token: tokens,
      secret: process.env.NEXT_PUBLIC_AUTH_SECRET!,
      salt: sessionTokenName
    })

    if (!session) {
      deleteAuthCookies(cookieStore);
      return { success: false, message: 'Access token not found in cookies' };
    }

    if (!session?.data?.tokens?.access || !session?.data?.tokens?.refresh) {
      deleteAuthCookies(cookieStore);
      return { success: false, message: 'Access or refresh token not found in session' };
    }

    const accessToken = session.data.tokens.access;
    const refreshToken = session.data.tokens.refresh;

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

    const response = await fetch(`${baseUrl}/users/logout`, options)
    const data = await response.json()

    if (response.status === 200) {

      deleteAuthCookies(cookieStore);
      return {
        success: true,
        message: data.message || "Logout Successful",
      }
    } else {
      deleteAuthCookies(cookieStore);
      return { success: false, message: data.message || 'Logout failed on server' }
    }


  } catch (error) {
    console.error('Logout Error:', error)
    deleteAuthCookies(cookieStore);
    // Use a type guard to check if error is an instance of Error
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred'
    return { success: false, message: errorMessage }
  }
}



// Helper function to delete all auth-related cookies
function deleteAuthCookies(cookieStore: ReturnType<typeof cookies>) {
  // For production secure cookies, we need to specify the correct options
  if (process.env.NODE_ENV === 'production') {
    // Session token cookie
    cookieStore.set(sessionTokenName, '', {
      expires: new Date(0),
      path: '/',
      secure: true,
      httpOnly: true,
      sameSite: 'lax'
    });
    
    // CSRF token cookie
    if (cookieStore.has(csrfTokenName)) {
      cookieStore.set(csrfTokenName, '', {
        expires: new Date(0),
        path: '/',
        secure: true,
        httpOnly: true,
        sameSite: 'lax'
      });
    }
    
    // Callback URL cookie
    if (cookieStore.has(callbackUrlName)) {
      cookieStore.set(callbackUrlName, '', {
        expires: new Date(0),
        path: '/',
        secure: true,
        sameSite: 'lax'
      });
    }
  } else {
    // In development, we can use the simpler delete method
    cookieStore.delete(sessionTokenName);
    
    if (cookieStore.has(csrfTokenName)) {
      cookieStore.delete(csrfTokenName);
    }
    
    if (cookieStore.has(callbackUrlName)) {
      cookieStore.delete(callbackUrlName);
    }
  }
  
  // Delete any other potential NextAuth cookies
  const otherCookies = ['next-auth.callback-url', 'next-auth.csrf-token', 'next-auth.session-token', 'authjs.callback-url', 'authjs.csrf-token', '__Host-authjs.csrf-token', '__Secure-authjs.callback-url'];
  for (const cookieName of otherCookies) {
    if (cookieStore.has(cookieName)) {
      cookieStore.delete(cookieName);
    }
  }
}