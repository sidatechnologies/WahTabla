'use server'

import { cookies } from "next/headers";
import { decode } from "next-auth/jwt";
import { RequestInit } from "next/dist/server/web/spec-extension/request";
import { VideoAnalytics } from "@/lib/types";

const sessionTokenName =
    process.env.NODE_ENV === 'production'
        ? '__Secure-authjs.session-token'
        : 'authjs.session-token';

const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL ?? 'http://localhost:5842';

export interface SubmitVideoAnalyticsRequest {
    analytics: VideoAnalytics[];
    isNextVideo?: boolean;
}

export interface SubmitVideoAnalyticsResponse {
    success: boolean;
    message: string;
    data?: {
        analytics: VideoAnalytics[];
    };
}

export const submitVideoAnalytics = async (
    values: SubmitVideoAnalyticsRequest
): Promise<SubmitVideoAnalyticsResponse> => {

    const cookieStore = cookies()
    const tokens = cookieStore.get(sessionTokenName)?.value ?? ''

    const session = await decode({
        token: tokens,
        secret: process.env.NEXT_PUBLIC_AUTH_SECRET!,
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

    // Remove analyticsId from each analytics object if needed
    // const analyticsToSend = values.analytics.map(({ analyticsId, ...rest }) => rest);
    const analyticsToSend = values.analytics;
    const options: RequestInit = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Cookie: cookieHeader, // Add cookies to the request
        },
        credentials: "include", // Ensure cookies are included in the request
        body: JSON.stringify({
            analytics: analyticsToSend
        })
    };

    try {
        const url = `${baseUrl}/analytics/add/${values.isNextVideo}`;

        const response = await fetch(url, options);
        const responseData = await response.json();

        if (response.status === 201) {
            return {
                success: true,
                message: responseData.message || 'Video analytics submitted successfully',
                data: responseData.data
            };
        } else {
            return {
                success: false,
                message: responseData.message || 'Failed to submit video analytics'
            };
        }

    } catch (error) {
        console.error('Video Analytics Submission Error:', error);
        const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
        return { success: false, message: errorMessage };
    }
};
