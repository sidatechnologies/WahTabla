"use client";

import { useMcqQuestionsData } from "@/data/exams/get-mcq-exam";
import { ExamFormContainer } from "./exam-form-container";

// 13, 26, 39, 52

const WeekWiseMcqExam = ({
  weekNumber,
  courseId,
  yearId,
}: {
  weekNumber: number;
  courseId: number;
  yearId: number;
}) => {
  const {
    data: examdata,
    isPending,
    isError,
    error,
  } = useMcqQuestionsData({
    courseId: courseId,
    yearId: yearId,
    weekNumber: weekNumber,
    type: "mcq",
  });

  if (isPending) {
    return <div>Loading</div>;
  }

  if (isError) {
    console.log(error);

    return <div>Error loading data: {error.message}</div>;
  }

  if (!examdata.data) {
    return <div>No Exam question found</div>;
  }

  return (
    <div className="h-full overflow">
      <ExamFormContainer courseId={1} yearId={1} weekNumber={13} type="mcq" />
    </div>
  );
};

export default WeekWiseMcqExam;
