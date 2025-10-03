// app/payment-cancel/page.tsx
"use client";

import { useRouter } from "next/navigation";
import { XCircle, ArrowLeft, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function PaymentCancelPage() {
  const router = useRouter();

  const navigateToDashboard = () => {
    router.push("/profile");
  };

  const navigateToCourses = () => {
    router.push("/buy-course");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-lg border-0">
        <CardHeader className="text-center bg-red-50 rounded-t-lg border-b">
          <div className="mx-auto p-2 bg-red-100 rounded-full w-16 h-16 flex items-center justify-center mb-4">
            <XCircle className="h-10 w-10 text-red-600" />
          </div>
          <CardTitle className="text-2xl font-bold text-red-700">Payment Cancelled</CardTitle>
          <CardDescription className="text-red-600">
            Your transaction was not completed
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6 pb-4">
          <Alert className="bg-gray-50 border-gray-100">
            <AlertDescription className="text-gray-700">
              The payment process was cancelled. No charges have been made to your account.
            </AlertDescription>
          </Alert>
          
          <div className="mt-6 text-center text-gray-600">
            <p>If you experienced any issues during checkout, please try again or contact our support team.</p>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col sm:flex-row gap-3 justify-center pb-6">
          <Button 
            variant="secondary"
            className="flex items-center gap-2 border-gray-300"
            onClick={navigateToDashboard}
          >
            <ArrowLeft size={16} />
            Back to Dashboard
          </Button>
          <Button
            className="bg-primary hover:bg-primary/90 text-white font-medium flex items-center gap-2"
            onClick={navigateToCourses}
          >
            <ShoppingCart size={16} />
            Try Again
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}