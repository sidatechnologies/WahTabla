import { VideoAnalytics } from "@/lib/types";

// Matching pairs for matching-type questions
interface FinalExamMatchingPair {
  symbol: string;
  name: string;
}

// Individual question structure
interface FinalExamQuestion {
  questionId: number;
  type: 'objective' | 'short-answer' | 'composition' | 'long-answer';
  text: string;
  questionOrder: number;
  marks: number;
  isCompulsory: boolean;
  requiresDiagram: boolean;
  requiresMatching: boolean;
  requiresNotation: boolean;
  requiresVariations: boolean;
  requiresTihayi: boolean;
  requiresBiography: boolean;
  requiresDefinition: boolean;
  requiresExamples: boolean;
  matchingPairs: FinalExamMatchingPair[] | null;
}

// Section structure containing questions
interface FinalExamSection {
  sectionId: number;
  name: string;
  description: string;
  marks: number;
  instructions: string;
  sectionOrder: number;
  questions: FinalExamQuestion[];
}

// Student attempt record
interface FinalExamAttempt {
  attemptId: number;
  passed: boolean;
  submittedAt: string; // ISO date string
  gradedAt: string | null; // ISO date string or null if not graded
}

// Main exam data structure
interface FinalExamData {
  examId: number;
  courseId: number;
  courseName: string;
  yearName: string;
  weekNumber: number;
  type: 'final' | 'midterm' | 'quiz' | 'assignment'; // Assuming other possible types
  title: string;
  description: string;
  isActive: boolean;
  totalMarks: number;
  attempts: FinalExamAttempt[];
  sections: FinalExamSection[];
  submissionType: 'link' | 'file' | 'text'; // Assuming other possible submission types
  canResubmit: boolean | null;
}

// Complete API response structure
interface FinalExamResponse {
  statusCode: number;
  data: FinalExamData;
  message: string;
  success: boolean;
}

// Submit final exam request body
interface FinalExamSubmitRequest {
  examId: number;
  linkUrl: string;
  notes: string;
}

// Submit final exam response data
interface FinalExamSubmitData {
  attemptId: number;
  examId: number;
  linkUrl: string;
  submittedAt: string; // ISO date string
  status: 'submitted' | 'pending' | 'graded' | 'failed';
  totalMarks: number;
  message: string;
  videoAnalytics?: VideoAnalytics[];

}

// Submit final exam response structure
interface FinalExamSubmitResponse {
  // statusCode: number;
  data?: FinalExamSubmitData;
  message: string;
  success: boolean;
  videoAnalytics?: VideoAnalytics[];
}

// Type unions for better type safety
type FinalExamQuestionType = 'objective' | 'short-answer' | 'composition' | 'long-answer';
type FinalExamType = 'final' | 'midterm' | 'quiz' | 'assignment';
type FinalExamSubmissionType = 'link' | 'file' | 'text';
type FinalExamSubmissionStatus = 'submitted' | 'pending' | 'graded' | 'failed';

// Utility type for question requirements
type FinalExamQuestionRequirements = {
  diagram: boolean;
  matching: boolean;
  notation: boolean;
  variations: boolean;
  tihayi: boolean;
  biography: boolean;
  definition: boolean;
  examples: boolean;
};

// Helper function type for extracting question requirements
type FinalExamExtractRequirements = (question: FinalExamQuestion) => FinalExamQuestionRequirements;

export interface FinalExamParams {
  courseId: number;
  yearId: number;
  weekNumber: number;
  type: string;
}

// Export all types
export type {
  FinalExamMatchingPair,
  FinalExamQuestion,
  FinalExamSection,
  FinalExamAttempt,
  FinalExamData,
  FinalExamResponse,
  FinalExamSubmitRequest,
  FinalExamSubmitData,
  FinalExamSubmitResponse,
  FinalExamQuestionType,
  FinalExamType,
  FinalExamSubmissionType,
  FinalExamSubmissionStatus,
  FinalExamQuestionRequirements,
  FinalExamExtractRequirements
};