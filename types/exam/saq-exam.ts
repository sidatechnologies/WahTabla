// SAQ Exam Types
import { Video, VideoAnalytics } from "@/lib/types";
export interface SAQAttempt {
  attemptId: number;
  passed: boolean;
  submittedAt: string;
  gradedAt: string | null;
}

export interface SAQQuestion {
  questionId: number;
  question: string;
  questionOrder: number;
}

export interface SAQExamData {
  examId: number;
  courseId: number;
  courseName: string;
  yearName: string;
  weekNumber: number;
  type: string;
  title: string;
  description: string;
  isActive: boolean;
  totalMarks: number | null;
  attempts: SAQAttempt[];
  assignmentPrompt: string;
  questions: SAQQuestion[];
  canResubmit: boolean | null;
  videoAnalytics: VideoAnalytics[]
}

export interface SAQExamResponse {
  statusCode: number;
  data: SAQExamData;
  message: string;
  success: boolean;
}

export interface SAQExamParams {
  courseId: number;
  yearId: number;
  weekNumber: number;
  type: string;
}

// SAQ Submission Types
export interface SAQSubmissionItem {
  questionId: number;
  submissionType: "text" | "link";
  textAnswer?: string;
  linkUrl?: string;
  notes?: string;
}

export interface SAQSubmissionRequest {
  examId: number;
  submissions: SAQSubmissionItem[];
}

export interface SAQSubmissionResponseData {
  attemptId: number;
  examId: number;
  attemptNumber: number;
  submissionsCount: number;
  submittedAt: string;
  status: string;
  message: string;
  videoAnalytics: VideoAnalytics[]
}

export interface SAQSubmissionResponse {
  data?: SAQSubmissionResponseData;
  message: string;
  success: boolean;
}