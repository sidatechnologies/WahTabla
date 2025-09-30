import { z } from 'zod';

export const VideoSchema = z.object({
    video_id: z.string(),
    module_id: z.string(),
    title: z.string(),
    description: z.string().nullable().optional(),
    duration: z.number().optional(),
    thumbnail_url: z.string().optional(),
    vimeo_url: z.string(),
});


export type VideoSchemaType = z.infer<typeof VideoSchema>;

export type moduleDataType = {
    id: string;
    vimeo_module_id: string;
    title: string;
    description: string;
}

export type GetCourseResponseType = {
    module: moduleDataType
    videos: VideoSchemaType[]
}

export type GetCourseAPIResponse = {
    success: boolean
    message: string
    data?: GetCourseResponseType // Data is optional for failure cases
}

export type GetAllCourseAPIResponse = {
    success: boolean
    message: string
    data?: moduleDataType[] // Data is optional for failure cases
}

export type VimeoVideo = {
    uri: string;              // Video URI
    name: string;             // Video title
    description?: string;     // Video description
    duration: number;         // Duration in seconds
    pictures: {
        sizes: { width: number; height: number; link: string }[];
    };
    link: string;             // Direct link to the video on Vimeo
    embed: {
        html: string;
    };
}