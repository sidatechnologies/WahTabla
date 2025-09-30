'use server'

import { LoginSchemaType } from '@/schema/auth-schema';
import { signIn } from '@/auth';
import { isRedirectError } from 'next/dist/client/components/redirect';
import { AuthError } from 'next-auth';


export async function login(values: LoginSchemaType) {
  try {
    await signIn('credentials', {
      email: values.email,
      password: values.password,
      redirect: false,
    })

    // console.log("signinnnnn", signin)

    return { success: true, message: 'Successfully login' }
  } catch (error) {
    // console.log({ error });

    if (isRedirectError(error)) {
      return { success: false, message: 'RedirectError' }
    }

    if (error instanceof Error) {
      const { type, cause } = error as AuthError;
      switch (type) {
        case 'CredentialsSignin':

          const errorMessage = cause?.err?.message || cause?.err;
          if (typeof errorMessage === 'string' && errorMessage.startsWith('BACKEND_ERROR:')) {
            return { success: false, message: errorMessage.replace('BACKEND_ERROR:', '') };
          }

          console.log(errorMessage)
          return { success: false, message: 'Invalid credentials.' };
        case 'CallbackRouteError':
          return { success: false, message: cause?.err?.toString() };
        default:
          return { success: false, message: 'Something went wrong.' };
      }
    }
    return { success: false, message: error as string }
  }
}