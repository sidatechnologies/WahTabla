"use client";

import { useState } from "react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent } from "./ui/card";
import { cn } from "@/lib/utils";
import BuyingOptionsNew from "./buy-course-options-new";
import { courses, CoursesType } from "@/data/constants/courses";
import { Button } from "./ui/button";
import { ArrowLeftIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";

const BuyCourse = () => {
  const [selectedCourse, setSelectedCourse] = useState<CoursesType>(courses[0]);
  const router = useRouter()

  const handleSelectingCourse = (course: CoursesType) => {
    setSelectedCourse(course);
  };
  return (
    <div className="w-full">
      <div className="w-full flex justify-center items-center gap-6">
        <div className="w-full flex flex-col justify-start items-start gap-2 py-10 pt-6">
          <Button variant="secondary" size="icon" className="rounded-full mb-6" onClick={() => router.back()}>
            <ArrowLeftIcon />
          </Button>
          <Label>Select Course</Label>
          <RadioGroup
            value={selectedCourse.name}
            className="flex flex-wrap justify-start items-start gap-6"
          >
            {courses.map((course, index) => {
              return (
                <Card
                  key={index}
                  className={cn(
                    "rounded-md px-6 py-3 cursor-pointer",
                    selectedCourse.name === course.name
                      ? "border border-blue-500"
                      : ""
                  )}
                  onClick={() => handleSelectingCourse(course)}
                >
                  <CardContent className="flex justify-center items-center gap-4 py-2">
                    <RadioGroupItem value={course.name} id={course.name} />
                    <Label className="text-lg font-semibold cursor-pointer select-none">
                      Dhwani {course.name}
                    </Label>
                  </CardContent>
                </Card>
              );
            })}
          </RadioGroup>
        </div>
      </div>
      <div>
        <BuyingOptionsNew course={selectedCourse} />
      </div>
    </div>
  );
};

export default BuyCourse;
