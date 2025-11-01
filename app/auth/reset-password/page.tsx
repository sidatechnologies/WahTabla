// app/auth/reset-password/page.tsx
"use client";

import ResetPassword from "@/components/reset-password";
import { Suspense } from "react";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResetPassword />;
    </Suspense>
  )
}
