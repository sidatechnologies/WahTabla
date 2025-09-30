"use client";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { FinalExamData, FinalExamMatchingPair, FinalExamQuestion, FinalExamSubmitRequest } from "@/types/exam/final-exam";
import { Clock, FileText, AlertCircle, CheckCircle } from "lucide-react";

interface FinalExamFormProps {
  examData: FinalExamData;
  onSubmit: (data: FinalExamSubmitRequest) => void;
  isSubmitting: boolean;
}

export default function FinalExamForm({
  examData,
  onSubmit,
  isSubmitting,
}: FinalExamFormProps) {
  const [linkUrl, setLinkUrl] = useState("");
  const [notes, setNotes] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Check if user has already submitted
  const hasSubmitted = examData.attempts.length > 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!linkUrl.trim()) {
      return;
    }

    const submitData: FinalExamSubmitRequest = {
      examId: examData.examId,
      linkUrl: linkUrl.trim(),
      notes: notes.trim(),
    };

    onSubmit(submitData);
    setIsSubmitted(true);
  };

  const renderQuestion = (question: FinalExamQuestion, sectionName: string) => {
    return (
      <div key={question.questionId} className="mb-4 p-4 border rounded-lg">
        <div className="flex items-start justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className="font-medium text-sm text-gray-600">
              {sectionName} - Q{question.questionOrder}
            </span>
            <Badge variant="outline">{question.marks} marks</Badge>
            {question.isCompulsory && (
              <Badge variant="destructive" className="text-xs">
                Compulsory
              </Badge>
            )}
          </div>
          <Badge variant="secondary" className="text-xs">
            {question.type}
          </Badge>
        </div>
        
        <p className="text-gray-800 mb-2">{question.text}</p>
        
        {/* Show requirements */}
        <div className="flex flex-wrap gap-1 text-xs text-gray-500">
          {question.requiresDiagram && <Badge variant="outline">Diagram Required</Badge>}
          {question.requiresNotation && <Badge variant="outline">Notation Required</Badge>}
          {question.requiresVariations && <Badge variant="outline">Variations Required</Badge>}
          {question.requiresTihayi && <Badge variant="outline">Tihayi Required</Badge>}
          {question.requiresBiography && <Badge variant="outline">Biography Required</Badge>}
          {question.requiresDefinition && <Badge variant="outline">Definition Required</Badge>}
          {question.requiresExamples && <Badge variant="outline">Examples Required</Badge>}
        </div>

        {/* Show matching pairs if applicable */}
        {question.matchingPairs && question.matchingPairs.length > 0 && (
          <div className="mt-2 p-3 bg-gray-50 rounded">
            <p className="text-sm font-medium mb-2">Matching Pairs:</p>
            <div className="grid grid-cols-2 gap-2 text-sm">
              {question.matchingPairs.map((pair: FinalExamMatchingPair, index: number) => (
                <div key={index} className="flex items-center gap-2">
                  <code className="bg-white px-2 py-1 rounded">{pair.symbol}</code>
                  <span>{pair.name}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  if (hasSubmitted) {
    return (
      <div className="container max-w-4xl mx-auto py-8">
        <Alert className="mb-6 bg-green-50 border-green-200">
          <CheckCircle className="h-4 w-4 text-green-600" />
          <AlertDescription className="text-green-800">
            You have already submitted this final exam. Re-attempts are not allowed for final exams.
          </AlertDescription>
        </Alert>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              {examData.title}
            </CardTitle>
            <p className="text-gray-600">{examData.description}</p>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {examData.sections.map((section) => (
                <div key={section.sectionId}>
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold">{section.name}</h3>
                    <p className="text-gray-600 text-sm">{section.description}</p>
                    <p className="text-sm text-blue-600 font-medium">{section.instructions}</p>
                  </div>
                  
                  {section.questions.map((question) => 
                    renderQuestion(question, section.name)
                  )}
                  
                  <Separator className="my-6" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container max-w-4xl mx-auto py-8">
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            {examData.title}
          </CardTitle>
          <p className="text-gray-600">{examData.description}</p>
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              Total Marks: {examData.totalMarks}
            </div>
            <Badge variant="outline">{examData.type}</Badge>
          </div>
        </CardHeader>
      </Card>

      <Alert className="mb-6 bg-blue-50 border-blue-200">
        <AlertCircle className="h-4 w-4 text-blue-600" />
        <AlertDescription className="text-blue-800">
          <strong>Important Instructions:</strong>
          <ul className="mt-2 space-y-1 text-sm">
            <li>• Read all questions carefully before answering</li>
            <li>• Prepare your answers in a document (Word/PDF)</li>
            <li>• Upload your document to Google Drive or similar platform</li>
            <li>• Share the document link below</li>
            <li>• Re-attempts are not allowed for final exams</li>
          </ul>
        </AlertDescription>
      </Alert>

      {/* Display all sections and questions */}
      <div className="space-y-6 mb-8">
        {examData.sections.map((section) => (
          <Card key={section.sectionId}>
            <CardHeader>
              <CardTitle className="text-lg">{section.name}</CardTitle>
              <p className="text-gray-600 text-sm">{section.description}</p>
              <div className="flex items-center gap-2">
                <Badge variant="outline">{section.marks} marks</Badge>
                <span className="text-sm text-blue-600 font-medium">
                  {section.instructions}
                </span>
              </div>
            </CardHeader>
            <CardContent>
              {section.questions.map((question) => 
                renderQuestion(question, section.name)
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Submission Form */}
      <Card>
        <CardHeader>
          <CardTitle>Submit Your Answer Sheet</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="linkUrl">
                Document Link <span className="text-red-500">*</span>
              </Label>
              <Input
                id="linkUrl"
                type="url"
                placeholder="https://drive.google.com/file/d/..."
                value={linkUrl}
                onChange={(e) => setLinkUrl(e.target.value)}
                required
                className="mt-1"
              />
              <p className="text-sm text-gray-500 mt-1">
                Upload your answer sheet to Google Drive, Dropbox, or similar platform and paste the shareable link here.
              </p>
            </div>

            <div>
              <Label htmlFor="notes">Additional Notes (Optional)</Label>
              <Textarea
                id="notes"
                placeholder="Any additional notes or comments..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={3}
                className="mt-1"
              />
            </div>

            <Button
              type="submit"
              disabled={isSubmitting || !linkUrl.trim()}
              className="w-full"
            >
              {isSubmitting ? "Submitting..." : "Submit Final Exam"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}