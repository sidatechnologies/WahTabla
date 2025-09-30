"use client";

import { Label } from "@radix-ui/react-label";
import {
  Select,
  SelectItem,
  SelectGroup,
  SelectContent,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { useState } from "react";
import { Button } from "./ui/button";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import { toast } from "sonner";
import Link from "next/link";

type propsType = {
  id: number;
  name: string;
  lengthInYears: number;
};

const BuyingOptions = ({ course }: { course: propsType }) => {
  const [selectedOption, setSelectedOption] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");

  const handleCheckout = () => {
    if (selectedCourse && selectedOption) {
      console.dir({ course, selectedCourse, selectedOption });
    } else {
      toast("Please Select Valid Options!");
    }
  };
  return (
    <div className="w-full flex flex-col justify-start items-start gap-6">
      <Label>Choose Options</Label>
      <div className="flex flex-col md:flex-row gap-6 md:gap-10">
        <Select
          value={selectedOption}
          onValueChange={(value) => {
            setSelectedOption(value);
            setSelectedCourse("");
          }}
        >
          <SelectTrigger className="w-[280px] bg-white">
            <SelectValue placeholder="How do you wish to buy the Course?" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Course Content</SelectLabel>
              <SelectItem value="month-wise">
                <span className="w-full flex justify-between items-end gap-8">
                  <span>Month Wise</span>
                  <span className="text-xs text-gray-500">$120/month</span>
                </span>
              </SelectItem>
              <SelectItem value="module-wise">
                <span className="w-full flex justify-between items-end gap-8">
                  <span>Module Wise</span>
                  <span className="text-xs text-gray-500">$330/month</span>
                </span>
              </SelectItem>
              <SelectItem value="year-wise">
                <span className="w-full flex justify-between items-end gap-8">
                  <span>Year Wise</span>
                  <span className="text-xs text-gray-500">$1200/month</span>
                </span>
              </SelectItem>
              <SelectItem value="full-course">
                <span className="w-full flex justify-between items-end gap-8">
                  <span>Full Course</span>
                  <span className="text-xs text-gray-500">
                    ${1200 * course.lengthInYears}/month
                  </span>
                </span>
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <Select
          value={selectedCourse}
          onValueChange={(value) => {
            setSelectedCourse(value);
          }}
        >
          <SelectTrigger className="w-[280px] bg-white">
            <SelectValue placeholder="Select your purchase." />
          </SelectTrigger>
          <SelectContent>
            {selectedOption === "month-wise" && (
              <SelectGroup>
                <SelectLabel>Month Wise</SelectLabel>
                {Array.from(
                  { length: course.lengthInYears * 12 },
                  (_, index) => (
                    <SelectItem key={index} value={`month-${index + 1}`}>
                      <span className="w-full flex justify-between items-end gap-8">
                        <span>{`Month ${index + 1}`}</span>
                        <span className="text-xs text-gray-500">4 videos</span>
                      </span>
                    </SelectItem>
                  )
                )}
              </SelectGroup>
            )}
            {selectedOption === "module-wise" && (
              <SelectGroup>
                <SelectLabel>Month Wise</SelectLabel>
                {Array.from(
                  { length: course.lengthInYears * 3 },
                  (_, index) => (
                    <SelectItem key={index} value={`module-${index + 1}`}>
                      <span className="w-full flex justify-between items-end gap-8">
                        <span>{`Module ${index + 1}`}</span>
                        <span className="text-xs text-gray-500">12 videos</span>
                      </span>
                    </SelectItem>
                  )
                )}
              </SelectGroup>
            )}
            {selectedOption === "year-wise" && (
              <SelectGroup>
                <SelectLabel>Month Wise</SelectLabel>
                {Array.from({ length: course.lengthInYears }, (_, index) => (
                  <SelectItem key={index} value={`year-${index + 1}`}>
                    <span className="w-full flex justify-between items-end gap-8">
                      <span>{`Year ${index + 1}`}</span>
                      <span className="text-xs text-gray-500">48 videos</span>
                    </span>
                  </SelectItem>
                ))}
              </SelectGroup>
            )}
            {selectedOption === "full-course" && (
              <SelectItem value="full-course">Full Course</SelectItem>
            )}
            <SelectItem value="none">None</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Link
          href='/'
        >
          <Button
            disabled={selectedCourse.length < 1 || selectedOption.length < 1}
            onClick={handleCheckout}
          >
            Checkout <ArrowRightIcon />{" "}
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default BuyingOptions;
