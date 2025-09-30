"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { FinalExamSubmitData } from "@/types/exam/final-exam";
import { CheckCircle, Clock, FileText, ExternalLink } from "lucide-react";

interface FinalExamResultDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  result: FinalExamSubmitData;
  onRetry?: () => void;
}

export function FinalExamResultDialog({
  open,
  onOpenChange,
  result,
  onRetry,
}: FinalExamResultDialogProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  const handleViewSubmission = () => {
    if (result.linkUrl) {
      window.open(result.linkUrl, '_blank');
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md bg-white">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-600" />
            Final Exam Submitted Successfully
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <Card>
            <CardContent className="pt-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Attempt ID:</span>
                  <Badge variant="outline">#{result.attemptId}</Badge>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Status:</span>
                  <Badge 
                    variant={result.status === 'submitted' ? 'default' : 'secondary'}
                    className="capitalize"
                  >
                    {result.status}
                  </Badge>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Total Marks:</span>
                  <span className="font-semibold">{result.totalMarks}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Submitted At:</span>
                  <div className="flex items-center gap-1 text-sm">
                    <Clock className="h-3 w-3" />
                    {formatDate(result.submittedAt)}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-sm text-blue-800 font-medium mb-2">
              {result.message}
            </p>
            <p className="text-xs text-blue-600">
              Your submission is now awaiting teacher grading. You will be notified once your exam has been evaluated.
            </p>
          </div>

          {result.linkUrl && (
            <Button
              variant="outline"
              onClick={handleViewSubmission}
              className="w-full"
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              View Submitted Document
            </Button>
          )}
        </div>

        <DialogFooter>
          <Button 
            onClick={() => onOpenChange(false)}
            className="w-full"
          >
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}