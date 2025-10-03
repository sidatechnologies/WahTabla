"use client";

import React, { useState } from "react";
import { Skeleton } from "./ui/skeleton";
import { useFullProfileDetails } from "@/data/get-full-profile";
import CertificateTable from "./certificates-table";

type Attempt = {
    attemptId: number;
    score: number;
    passed: boolean;
};

type Exam = {
    examId: number;
    weekNumber: number;
    type: string;
    title: string;
    totalMarks: number | null;
    attempts?: Attempt[];
};

type Course = {
    courseName: string;
    exams: Exam[];
    years: any[];
};

type ParsedResponse = {
    [key: string]: {
        courseName: string;
        exams: Exam[];
        years: any[];
    };
};

type SuccessResponse = {
  success: true;
  message: string;
  data: ParsedResponse;
};

type ErrorResponse = {
  success: false;
  message: any;
  data?: undefined;
};

type ApiResponse = SuccessResponse | ErrorResponse;

const CertificateModuleList = () => {
    const { data: courses, isError, error, isPending } = useFullProfileDetails();


    if (isError || error) {
        console.warn('isError: ', isError)
        console.warn('error: ', error)
        return <span className="text-red-600">Some Error Occured. Please check console for more details.</span>;
    }

    if (isPending) {
        return (
            <h1>Loading...</h1>
        )
    }

    if (!courses.success) {
        console.error('Error while fetching profile and course details: ', courses.message)
        return (
            <div className="w-full flex justify-center items-center">
                <h1>Something Went Wrong!</h1>
            </div>
        )
    }

    const safeCourses = courses as unknown as SuccessResponse

    return (
        <div className="min-w-[600px] w-full min-h-[92vh] bg-white rounded-lg flex justify-start items-start p-4 shadow-sm">
            {courses?.data ? (
                <div className="w-full h-full flex flex-col justify-start items-start gap-8 p-5 bg-muted rounded-lg">
                    {courses.data ? (
                        <CertificateTable data={safeCourses.data} user={courses.user} />
                    ) : (
                        <div className="w-full flex flex-col gap-6">
                            <Skeleton className="h-8 w-full mt-2" /> {/* Title skeleton */}
                            <table className="w-full border-collapse">
                                <thead className="w-full">
                                    <tr>
                                        <th className="p-4 text-left text-muted-foreground/40 font-semibold">
                                            <Skeleton className="h-6 w-1/3" />{" "}
                                            {/* Course Name Skeleton */}
                                        </th>
                                        <th className="p-4 text-left text-muted-foreground/40 font-semibold">
                                            <Skeleton className="h-6 w-1/4" /> {/* Start Skeleton */}
                                        </th>
                                        <th className="p-4 text-left text-muted-foreground/40 font-semibold">
                                            <Skeleton className="h-6 w-1/4" /> {/* Status Skeleton */}
                                        </th>
                                        <th className="p-4 text-left text-muted-foreground/40 font-semibold">
                                            <Skeleton className="h-6 w-1/4" /> {/* Module Skeleton */}
                                        </th>
                                        <th className="p-4 text-left text-muted-foreground/40 font-semibold">
                                            <Skeleton className="h-6 w-1/4" />{" "}
                                            {/* Progress Skeleton */}
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="w-full">
                                    {[...Array(5)].map(
                                        (
                                            _,
                                            index // Assuming 5 skeleton rows
                                        ) => (
                                            <tr key={index}>
                                                <td className="p-4 flex justify-start items-center gap-2">
                                                    <Skeleton className="h-14 w-14" />{" "}
                                                    {/* Image Skeleton */}
                                                    <div className="flex flex-col justify-start items-start">
                                                        <Skeleton className="h-6 w-3/4" />{" "}
                                                        {/* Title Skeleton */}
                                                        <Skeleton className="h-4 w-1/2" />{" "}
                                                        {/* Subtitle Skeleton */}
                                                    </div>
                                                </td>
                                                <td className="p-4">
                                                    <Skeleton className="h-4 w-1/4" />{" "}
                                                    {/* Start Date Skeleton */}
                                                </td>
                                                <td className="p-4">
                                                    <Skeleton className="h-4 w-1/4" />{" "}
                                                    {/* Status Skeleton */}
                                                </td>
                                                <td className="p-4">
                                                    <Skeleton className="h-4 w-1/4" />{" "}
                                                    {/* Module Skeleton */}
                                                </td>
                                                <td className="p-4">
                                                    <Skeleton className="h-4 w-1/4" />{" "}
                                                    {/* Progress Skeleton */}
                                                </td>
                                            </tr>
                                        )
                                    )}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            ) : (
                <div>No Coursed bought yet!</div>
            )}
        </div>
    );
};

export default CertificateModuleList;
