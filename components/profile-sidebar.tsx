"use client";

import React from "react";
import { Button } from "./ui/button";
import {
  ArchiveIcon,
  CardStackPlusIcon,
  GearIcon,
  QuestionMarkCircledIcon,
  ReaderIcon,
} from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";
import { ShieldCheck } from "lucide-react";

const ProfileSidebar = () => {
  const pathname = usePathname();
  const router = useRouter();
  return (
    <section className="w-[250px] flex flex-col justify-start items-start space-y-1 min-h-[92vh] bg-white shadow-sm rounded-lg p-4">
      <div className="w-full flex flex-col justify-start items-start gap-1">
        <Button
          variant="ghost"
          className={cn(
            "w-full h-12 text-lg font-medium justify-start py-1",
            pathname === "/profile" ? "bg-accent" : ""
          )}
          onClick={() => router.push("/profile")}
        >
          <ArchiveIcon className="w-12 h-12 text-black" />
          <span>Overview</span>
        </Button>
        <Button
          variant="ghost"
          className={cn(
            "w-full h-12 text-lg font-medium justify-start py-1",
            pathname === "/buy-course" ? "bg-accent" : ""
          )}
          onClick={() => router.push("/buy-course")}
        >
          <CardStackPlusIcon className="w-12 h-12 text-black" />
          <span>Buy Course</span>
        </Button>
        <Button
          variant="ghost"
          className={cn(
            "w-full h-12 text-lg font-medium justify-start py-1",
            pathname === "/doubt-clearing" ? "bg-accent" : ""
          )}
          onClick={() => router.push("/doubt-clearing")}
        >
          <QuestionMarkCircledIcon className="w-12 h-12 text-black" />
          <span>Doubt Clearing</span>
        </Button>
        <Button
          variant="ghost"
          className={cn(
            "w-full h-12 text-lg font-medium justify-start py-1",
            pathname === "/settings" ? "bg-accent" : ""
          )}
          onClick={() => router.push("/settings")}
        >
          <GearIcon className="w-12 h-12 text-black" />
          <span>Settings</span>
        </Button>
        <Button
          variant="ghost"
          className={cn(
            "w-full h-12 text-lg font-medium justify-start py-1",
            pathname === "/exam" ? "bg-accent" : ""
          )}
          onClick={() => router.push("/exam")}
        >
          <ReaderIcon className="w-12 h-12 text-black" />
          <span>Exam</span>
        </Button>
        <Button
          variant="ghost"
          className={cn(
            "w-full h-12 text-lg font-medium justify-start py-1",
            pathname === "/exam" ? "bg-accent" : ""
          )}
          onClick={() => router.push("/certificates")}
        >
          <ShieldCheck className="w-12 h-12 text-black" />
          <span>Certificates</span>
        </Button>
      </div>
    </section>
  );
};

export default ProfileSidebar;
