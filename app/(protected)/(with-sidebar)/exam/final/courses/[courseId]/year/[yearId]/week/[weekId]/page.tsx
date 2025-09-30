import { FinalExamContainer } from "@/components/exam/final-exam-form-container";
import React from "react";

const Page = ({
  params,
}: {
  params: { courseId: string; yearId: string; weekId: string };
}) => {
  const yearId = parseInt(params.yearId);
  const courseId = parseInt(params.courseId);
  const weekId = parseInt(params.weekId);

  // console.log(yearId, courseId, weekId)
  return (
    <div className="w-full min-h-screen flex flex-col justify-start items-center mx-auto overflow-scroll">
      <FinalExamContainer
        courseId={courseId}
        weekNumber={weekId}
        yearId={yearId}
        type="final"
      />
    </div>
  );
};

export default Page;
