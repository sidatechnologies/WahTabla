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
import { 
  CheckCircle, 
  Clock, 
  FileText, 
  Calendar,
  User,
  RefreshCw
} from "lucide-react";
import { SAQSubmissionResponseData } from "@/types/exam/saq-exam";

interface SaqExamResultDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  result: SAQSubmissionResponseData;
  onRetry?: () => void;
}

export function SaqExamResultDialog({
  open,
  onOpenChange,
  result,
  onRetry,
}: SaqExamResultDialogProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case "submitted":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case "pending":
        return <Clock className="h-5 w-5 text-yellow-500" />;
      default:
        return <FileText className="h-5 w-5 text-blue-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "submitted":
        return "bg-green-100 text-green-800 border-green-200";
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      default:
        return "bg-blue-100 text-blue-800 border-blue-200";
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {getStatusIcon(result.status)}
            Assignment Submitted Successfully
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                {/* Status Badge */}
                <div className="flex justify-center">
                  <Badge 
                    variant="outline" 
                    className={`px-4 py-2 text-sm font-medium ${getStatusColor(result.status)}`}
                  >
                    {result.status.charAt(0).toUpperCase() + result.status.slice(1)}
                  </Badge>
                </div>

                {/* Success Message */}
                <div className="text-center">
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {result.message}
                  </p>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">Attempt</span>
                    </div>
                    <p className="font-medium">#{result.attemptNumber}</p>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <FileText className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">Submissions</span>
                    </div>
                    <p className="font-medium">{result.submissionsCount}</p>
                  </div>
                  
                  <div className="space-y-2 col-span-2">
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">Submitted At</span>
                    </div>
                    <p className="font-medium text-sm">
                      {formatDate(result.submittedAt)}
                    </p>
                  </div>
                </div>

                {/* Additional Info */}
                <div className="bg-muted/50 rounded-lg p-3 mt-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">What`&apos;`s Next?</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Your assignment has been submitted successfully and is now awaiting review from your instructor. 
                    You`&apos;`ll be notified once it has been graded.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <DialogFooter className="flex gap-2">
          {onRetry && (
            <Button 
              variant="outline" 
              onClick={onRetry}
              className="flex items-center gap-2"
            >
              <RefreshCw className="h-4 w-4" />
              Submit Another
            </Button>
          )}
          <Button 
            onClick={() => onOpenChange(false)}
            className="flex-1"
          >
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}