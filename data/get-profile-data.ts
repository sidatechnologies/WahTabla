import { getProfileData } from "@/action/profile/get-profile-data";
import { Exam, Course } from "@/types/profile";
import { useQuery } from "@tanstack/react-query";


export function useProfileData () {
    const query =  useQuery({
        queryKey: ["getProfileData"],
        queryFn: async () => await getProfileData(),
    });

    // Utility functions
  const getCourseById = (courseId: number): Course | undefined => {
    if (!query.data?.success || !query.data.data?.courses) return undefined;
    return query.data.data.courses.find(course => course.courseId === courseId);
  };

  const getFailedExams = (): Exam[] => {
    if (!query.data?.success || !query.data.data?.courses) return [];
    
    const failedExams: Exam[] = [];
    
    query.data.data.courses.forEach(course => {
      course.years.forEach(year => {
        year.modules.forEach(module => {
          module.months.forEach(month => {
            month.weeks.forEach(week => {
              week.exams.forEach(exam => {
                if (exam.failed) {
                  failedExams.push(exam);
                }
              });
            });
          });
        });
      });
    });
    
    return failedExams;
  };

  const getExamsForReview = (): Exam[] => {
    if (!query.data?.success || !query.data.data?.courses) return [];
    
    const reviewExams: Exam[] = [];
    
    query.data.data.courses.forEach(course => {
      course.years.forEach(year => {
        year.modules.forEach(module => {
          module.months.forEach(month => {
            month.weeks.forEach(week => {
              week.exams.forEach(exam => {
                if (exam.review) {
                  reviewExams.push(exam);
                }
              });
            });
          });
        });
      });
    });
    
    return reviewExams;
  };

  const getClearedExams = (): Exam[] => {
    if (!query.data?.success || !query.data.data?.courses) return [];
    
    const clearedExams: Exam[] = [];
    
    query.data.data.courses.forEach(course => {
      course.years.forEach(year => {
        year.modules.forEach(module => {
          module.months.forEach(month => {
            month.weeks.forEach(week => {
              week.exams.forEach(exam => {
                if (exam.cleared) {
                  clearedExams.push(exam);
                }
              });
            });
          });
        });
      });
    });
    
    return clearedExams;
  };

  const getPendingExams = (): Exam[] => {
    if (!query.data?.success || !query.data.data?.courses) return [];
    
    const pendingExams: Exam[] = [];
    
    query.data.data.courses.forEach(course => {
      course.years.forEach(year => {
        year.modules.forEach(module => {
          module.months.forEach(month => {
            month.weeks.forEach(week => {
              week.exams.forEach(exam => {
                if (!exam.cleared && !exam.failed) {
                  pendingExams.push(exam);
                }
              });
            });
          });
        });
      });
    });
    
    return pendingExams;
  };

  const getExamProgress = (): {
    total: number;
    cleared: number;
    failed: number;
    pending: number;
  } => {
    if (!query.data?.success || !query.data.data?.courses) {
      return { total: 0, cleared: 0, failed: 0, pending: 0 };
    }
    
    let total = 0;
    let cleared = 0;
    let failed = 0;
    let pending = 0;
    
    query.data.data.courses.forEach(course => {
      course.years.forEach(year => {
        year.modules.forEach(module => {
          module.months.forEach(month => {
            month.weeks.forEach(week => {
              week.exams.forEach(exam => {
                total++;
                if (exam.cleared) {
                  cleared++;
                } else if (exam.failed) {
                  failed++;
                } else {
                  pending++;
                }
              });
            });
          });
        });
      });
    });
    
    return { total, cleared, failed, pending };
  };

  const getExamsByType = (type: 'mcq' | 'assignment' | 'final'): Exam[] => {
    if (!query.data?.success || !query.data.data?.courses) return [];
    
    const examsByType: Exam[] = [];
    
    query.data.data.courses.forEach(course => {
      course.years.forEach(year => {
        year.modules.forEach(module => {
          module.months.forEach(month => {
            month.weeks.forEach(week => {
              week.exams.forEach(exam => {
                if (exam.type === type) {
                  examsByType.push(exam);
                }
              });
            });
          });
        });
      });
    });
    
    return examsByType;
  };

  const getExamById = (examId: number): Exam | undefined => {
    if (!query.data?.success || !query.data.data?.courses) return undefined;
    
    for (const course of query.data.data.courses) {
      for (const year of course.years) {
        for (const module of year.modules) {
          for (const month of module.months) {
            for (const week of month.weeks) {
              const exam = week.exams.find(e => e.examId === examId);
              if (exam) return exam;
            }
          }
        }
      }
    }
    
    return undefined;
  };

  return {
    ...query,
    // Utility functions
    getCourseById,
    getFailedExams,
    getExamsForReview,
    getClearedExams,
    getPendingExams,
    getExamProgress,
    getExamsByType,
    getExamById,
  };
}