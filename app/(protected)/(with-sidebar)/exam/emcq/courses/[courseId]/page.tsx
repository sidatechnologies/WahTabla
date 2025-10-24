import { ExamFormContainer } from "@/components/exam/exam-form-container";
import React from "react";

const Page = ({
  params,
}: {
  params: { courseId: string; };
}) => {
  const courseId = parseInt(params.courseId);

  console.log(courseId)
  return (
    <div className="w-full min-h-screen flex flex-col justify-start items-center mx-auto">
      <ExamFormContainer courseId={1} yearId={1} weekNumber={13} type="mcq" />
    </div>
  );
};

export default Page;
