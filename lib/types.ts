export type Video = {
  videoId: number;
  videoTitle: string;
  videoUrl: string;
  videoVimeoId: string;
  description: string;
  duration: number;
  thumbnailUrl: string;
  isExam?: boolean;
  examId?: string
};

export type Month = {
  monthId: number;
  monthName: string;
  videos: Video[];
};

export type Module = {
  moduleId: number;
  moduleName: string;
  months: Month[];
};

export type Exam = {
  examId: number;
  isActive: boolean;
  type: string;
  weekNumber: number;
  yearId: number;
}

export type Year = {
  yearId: number;
  yearName: string;
  vimeoYearId: string;
  modules: Module[];
  exams: Exam[];
};

export type Course = {
  courseName: string;
  vimeoCourseId: string;
  years: Year[];
};

export type ParsedResponse = {
  [courseId: number]: Course;
};

export type VideoAnalytics = {
  analyticsId: number | null;
  userId: number | null;
  videoId: number;
  videoName: string;
  playCount: number;
  pauseCount: number;
  seekCount: number;
  durationSeconds: number;
  totalVideoDuration: number;
  watchedSeconds: number;
  watchProgress: number; // 0–100
  fullyWatched: boolean;
  isAvailable: boolean;
  startDate: string;
  endDate: string | null;
  isExam?: boolean; 
  examId?: number | null;
  yearId?: number | null;
  courseId?: number | null
};
