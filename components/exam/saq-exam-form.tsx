"use client";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Badge } from "@/components/ui/badge";
import { Clock, FileText, Link, Send } from "lucide-react";
import {
  SAQExamData,
  SAQSubmissionRequest,
  SAQSubmissionItem,
} from "@/types/exam/saq-exam";
import { toast } from "sonner";

interface SaqExamFormProps {
  examData: SAQExamData;
  onSubmit: (data: SAQSubmissionRequest) => void;
  isSubmitting: boolean;
}

export default function SaqExamForm({
  examData,
  onSubmit,
  isSubmitting,
}: SaqExamFormProps) {
  const [submissions, setSubmissions] = useState<SAQSubmissionItem[]>(
    examData.questions.map((q) => ({
      questionId: q.questionId,
      submissionType: "text",
      textAnswer: "",
      linkUrl: "",
      notes: "",
    }))
  );

  const updateSubmission = (
    questionId: number,
    field: keyof SAQSubmissionItem,
    value: string
  ) => {
    setSubmissions((prev) =>
      prev.map((sub) =>
        // sub.questionId === questionId ? { ...sub, [field]: value } : sub
        sub.questionId === questionId ? { 
           ...sub, 
           [field]: value,
           // Clear opposite field when switching submission type
           ...(field === "submissionType" && value === "text" ? { linkUrl: "" } : {}),
           ...(field === "submissionType" && value === "link" ? { textAnswer: "" } : {})
         } : sub
      )
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate submissions
    const isValid = submissions.every((sub) => {
      if (sub.submissionType === "text") {
        return sub.textAnswer?.trim() !== "";
      } else if (sub.submissionType === "link") {
        return sub.linkUrl?.trim() !== "";
      }
      return false;
    });

    if (!isValid) {
      toast.error("Please provide answers for all questions.");
      return;
    }

    // Clean submissions to only include relevant fields
    const cleanedSubmissions = submissions.map((sub) => {
      const cleaned: SAQSubmissionItem = {
        questionId: sub.questionId,
        submissionType: sub.submissionType,
        notes: sub.notes?.trim() || undefined,
      };

      if (sub.submissionType === "text") {
        cleaned.textAnswer = sub.textAnswer?.trim();
      } else if (sub.submissionType === "link") {
        cleaned.linkUrl = sub.linkUrl?.trim();
      }

      return cleaned;
    });

    onSubmit({
      examId: examData.examId,
      submissions: cleanedSubmissions,
    });
  };

  return (
    <div className="container max-w-4xl mx-auto py-8 space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl">{examData.title}</CardTitle>
              <p className="text-muted-foreground mt-2">
                {examData.courseName} - {examData.yearName} - Week{" "}
                {examData.weekNumber}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="flex items-center gap-1">
                <FileText className="h-4 w-4" />
                {examData.type}
              </Badge>
              {examData.totalMarks && (
                <Badge variant="outline">{examData.totalMarks} marks</Badge>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="mb-6 p-4 bg-muted rounded-lg">
            <h3 className="font-medium mb-2">Assignment Instructions</h3>
            <p className="text-sm text-muted-foreground">
              {examData.assignmentPrompt}
            </p>
          </div>
          <p className="text-sm text-muted-foreground mb-6">
            {examData.description}
          </p>
        </CardContent>
      </Card>

      <form onSubmit={handleSubmit} className="space-y-6">
        {examData.questions.map((question, index) => {
          const submission = submissions.find(
            (sub) => sub.questionId === question.questionId
          );

          return (
            <Card key={question.questionId}>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <span className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center text-sm">
                    {index + 1}
                  </span>
                  Question {question.questionOrder}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="prose max-w-none">
                  <p className="text-foreground">{question.question}</p>
                </div>

                {/* Submission Type Selection */}
                <div className="space-y-3">
                  <Label className="text-sm font-medium">Answer Type</Label>
                  <RadioGroup
                    value={submission?.submissionType}
                    onValueChange={(value) =>
                      updateSubmission(
                        question.questionId,
                        "submissionType",
                        value
                      )
                    }
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem
                        value="text"
                        id={`text-${question.questionId}`}
                      />
                      <Label
                        htmlFor={`text-${question.questionId}`}
                        className="flex items-center gap-2"
                      >
                        <FileText className="h-4 w-4" />
                        Text Answer
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem
                        value="link"
                        id={`link-${question.questionId}`}
                      />
                      <Label
                        htmlFor={`link-${question.questionId}`}
                        className="flex items-center gap-2"
                      >
                        <Link className="h-4 w-4" />
                        Link/URL
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                {/* Text Answer */}
                {submission?.submissionType === "text" && (
                  <div className="space-y-2">
                    <Label htmlFor={`answer-${question.questionId}`}>
                      Your Answer
                    </Label>
                    <Textarea
                      id={`answer-${question.questionId}`}
                      placeholder="Type your detailed answer here..."
                      value={submission.textAnswer || ""}
                      onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                        updateSubmission(
                          question.questionId,
                          "textAnswer",
                          e.target.value
                        )
                      }
                      className="min-h-[120px]"
                    />
                  </div>
                )}

                {/* Link Answer */}
                {submission?.submissionType === "link" && (
                  <div className="space-y-2">
                    <Label htmlFor={`link-${question.questionId}`}>
                      Link/URL
                    </Label>
                    <Input
                      id={`link-${question.questionId}`}
                      type="url"
                      placeholder="https://example.com or Google Drive link"
                      value={submission.linkUrl || ""}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        updateSubmission(
                          question.questionId,
                          "linkUrl",
                          e.target.value
                        )
                      }
                    />
                  </div>
                )}

                {/* Notes */}
                <div className="space-y-2">
                  <Label htmlFor={`notes-${question.questionId}`}>
                    Additional Notes (Optional)
                  </Label>
                  <Textarea
                    id={`notes-${question.questionId}`}
                    placeholder="Any additional notes or explanations..."
                    value={submission?.notes || ""}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                      updateSubmission(
                        question.questionId,
                        "notes",
                        e.target.value
                      )
                    }
                    className="min-h-[60px]"
                  />
                </div>
              </CardContent>
            </Card>
          );
        })}

        <div className="flex justify-end gap-4">
          <Button
            type="submit"
            disabled={isSubmitting}
            className="flex items-center gap-2"
          >
            {isSubmitting ? (
              <>
                <Clock className="h-4 w-4 animate-spin" />
                Submitting...
              </>
            ) : (
              <>
                <Send className="h-4 w-4" />
                Submit Assignment
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
