"use server"

import { GetCourseResponseType, GetCourseAPIResponse } from "@/schema/course";
const base_url = process.env.NEXT_PUBLIC_BACKEND_URL


export const getCourse = async(moduleId: string):Promise<GetCourseAPIResponse> => {
    const options = {
        method: "GET",
        headers: {
            accept: "application/json",
        },
    };

    try {
        const response = await fetch(`${base_url}/modules/${moduleId}`, options)
        const data = await response.json()

        if (response.status === 200 && data.success) {

            const details = {
                module: data.data.module,
                videos: data.data.videos
            } as GetCourseResponseType
            return {
                success: true,
                message: data.message,
                data: details
            }

        } else {
            return { success: false, message: data.message || 'Login failed' }
        }

    } catch (error) {
        console.error('Login Error:', error)
        // Use a type guard to check if error is an instance of Error
        const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred'

        return { success: false, message: errorMessage }
    }
}