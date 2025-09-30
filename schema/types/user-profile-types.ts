export type User = {
  userId: number;
  username: string;
  email: string;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  profile: {
    id: string;
    firstName: string;
    lastName: string;
    dateOfBirth: string; // ISO date string
    gender: string;
    createdAt: string; // ISO date string
    updatedAt: string; // ISO date string
  };
};

export type Video = {
  videoId: number;
  monthId: number;
  videoVimeoId: string;
  videoTitle: string;
  videoUrl: string;
  description: string;
  duration: number;
  thumbnailUrl: string;
};

export type Month = {
  monthId: number;
  courseId: number;
  yearId: number;
  vimeoMonthId: string;
  monthName: string;
  moduleId: number;
  videos: Video[];
};

export type Module = {
  moduleId: number;
  courseId: number;
  yearId: number;
  moduleName: string;
  months: Month[];
};

export type Year = {
  yearId: number;
  courseId: number;
  vimeoYearId: string;
  yearName: string;
  modules: Module[];
};

export type Course = {
  courseId: number;
  courseName: string;
  vimeoCourseId: string;
};

export type OrderDetails =
  | {
      courseId: number;
      monthName: string;
      courseName: string;
      vimeoCourseId: string;
      moduleId: number;
      monthId: number;
      years: Year[];
      videos: Video[];
    }
  | {
      moduleId: number;
      courseId: number;
      monthName: string;
      monthId: number;
      courseName: string;
      vimeoCourseId: string;
      yearId: number;
      moduleName: string;
      months: Month[];
      videos: Video[];
    }
  | {
      monthId: number;
      courseId: number;
      courseName: string;
      vimeoMonthId: string;
      vimeoCourseId: string;
      monthName: string;
      moduleId: number;
      videos: Video[];
    }
  | {
      yearId: number;
      courseId: number;
      vimeoCourseId: string;
      vimeoYearId: string;
      courseName: string;
      yearName: string;
      monthName: string;
      moduleId: number;
      monthId: number;
      modules: Module[];
      videos: Video[];
    };

export type Order = {
  type: "Course" | "Module" | "Month" | "Year";
  course?: Course;
  year?: Year;
  details: OrderDetails;
};

export type UserProfileApiResponseType = {
  user: User;
  orders: Order[];
};
