// app/payment-success/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import Confetti from "react-confetti";

export default function PaymentSuccessPage() {
  const router = useRouter();
  const [windowSize, setWindowSize] = useState({
    width: 0,
    height: 0,
  });
  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    // Update window dimensions
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    // Set initial size
    handleResize();

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Stop confetti after 5 seconds
    const timer = setTimeout(() => setShowConfetti(false), 5000);

    // Clean up
    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(timer);
    };
  }, []);

  const navigateToDashboard = () => {
    router.push("/profile");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      {showConfetti && (
        <Confetti
          width={windowSize.width}
          height={windowSize.height}
          recycle={false}
          numberOfPieces={400}
        />
      )}

      <Card className="w-full max-w-md shadow-lg border-0">
        <CardHeader className="text-center bg-green-50 rounded-t-lg border-b">
          <div className="mx-auto p-2 bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mb-4">
            <CheckCircle2 className="h-10 w-10 text-green-600" />
          </div>
          <CardTitle className="text-2xl font-bold text-green-700">Payment Successful!</CardTitle>
          <CardDescription className="text-green-600">
            Your transaction has been processed successfully
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6 pb-4">
          <Alert className="bg-blue-50 border-blue-100">
            <AlertTitle className="text-blue-700">Receipt Sent</AlertTitle>
            <AlertDescription className="text-blue-600">
              A receipt has been sent to your email address.
              Please check your inbox (and spam folder if necessary).
            </AlertDescription>
          </Alert>
          
          <div className="mt-6 text-center text-gray-600">
            <p>Thank you for your purchase!</p>
            <p className="mt-2">You can now access your course from your dashboard.</p>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center pb-6">
          <Button 
            size="lg"
            className="bg-primary hover:bg-primary/90 text-white font-medium px-6"
            onClick={navigateToDashboard}
          >
            Go to Dashboard
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}