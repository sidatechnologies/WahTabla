"use client";

import { ParsedResponse } from "@/utils/parse-course";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";

export default function CoursesPills({ data }: { data: ParsedResponse }) {
  const router = useRouter();

  if (!data || Object.keys(data).length === 0) {
    return (
      <Card className="w-full p-6 bg-transparent border-none shadow-none">
        <p className="text-center text-muted-foreground">
          No courses bought yet!
        </p>
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 w-full">
      {Object.entries(data).map(([courseId, course]) => (
        <div key={courseId} className="w-full p-3 space-y-4 bg-gradient-to-r from-white-200 to-blue-300 transition-colors duration-300 rounded-lg shadow-xl border bg-muted">
          {/* Course Name */}
          <h2 className="text-sm font-bold tracking-tight">
            DHWANI {course.courseName}
          </h2>

          {/* Years */}
          <div className="flex flex-wrap gap-4">
            {course.years?.map((year) => (
              <div
                key={`${courseId}-${year.yearId}`}
                onClick={() =>
                  router.push(`/courses/${courseId}/year/${year.yearId}`)
                }
                className="cursor-pointer px-4 py-2 flex flex-col"
              >
                <span className="font-medium text-xs">{year.yearName}</span>
                <div className="flex flex-wrap gap-2 mt-1">
                  {year.modules?.map((module) => (
                    <span
                      key={module.moduleId}
                      className="bg-white/70 text-xs text-gray-700 px-3 py-1 rounded-full"
                    >
                      {module.moduleName}
                    </span>
                  )) ?? (
                      <span className="text-sm text-gray-500">No modules</span>
                    )}
                </div>
              </div>
            )) ?? <p className="text-sm text-gray-500">No years</p>}
          </div>
        </div>
      ))}
    </div>
  );
}
