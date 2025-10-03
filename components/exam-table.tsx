"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"

interface ExamTableProps {
  data: any[] // exams array
  courseId: string | number
  yearId: string | number
}

export function ExamTable({ data, courseId, yearId   }: ExamTableProps) {
  const router = useRouter()

  // Filter out final exams
  const filteredExams = data.filter((exam: any) => exam.type !== "final")

  const handleGiveExam = (exam: any) => {
    const weekNumber = exam.weekNumber
    if (exam.type === "mcq") {
      router.push(`/exam/mcq/courses/${courseId}/year/${yearId}/week/${weekNumber}`)
    } else if (exam.type === "assignment") {
      router.push(`/exam/saq/courses/${courseId}/year/${yearId}/week/${weekNumber}`)
    }
  }

  return (
    <Table>
      <TableCaption>Examinations (excluding Final Exam)</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Week</TableHead>
          <TableHead>Title</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {filteredExams.map((exam: any) => {
          const lastAttempt = exam.attempts?.[exam.attempts.length - 1]
          const passed = lastAttempt?.passed === true
          const status = passed
            ? "Passed ✅"
            : lastAttempt
            ? "Not Passed ❌"
            : "Not Attempted"

          return (
            <TableRow key={exam.examId}>
              <TableCell className="font-medium">{exam.weekNumber}</TableCell>
              <TableCell>{exam.title}</TableCell>
              <TableCell>{status}</TableCell>
              <TableCell>
                {!passed && (
                  <Button size="sm" variant="outline" onClick={() => handleGiveExam(exam)}>
                    Give Exam
                  </Button>
                )}
              </TableCell>
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  )
}
