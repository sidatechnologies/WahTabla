import React from "react";
import Navbar from "@/components/navbar";

interface LegalLayoutProps {
  children: React.ReactNode;
}

const LegalLayout: React.FC<LegalLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen w-full flex flex-col">
      <div className="w-full relative">
        <Navbar />
      </div>
      <main className=" flex flex-col justify-start items-start max-w-[1512px] w-full mx-auto px-4">
        {children}
      </main>
    </div>
  );
};

export default LegalLayout;