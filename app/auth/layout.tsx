import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Authentication",
  description: "A Sign Up page with one column for email input and two buttons for auth signup from google and apple.",
};

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="hidden lg:block flex-1 h-full w-1/2">
        <span className="h-full w-1/2 bg-primary absolute left-0 top-0" />
        <p className=" w-[700px] absolute bottom-0 left-0 px-10 py-10 text-xl text-white text-wrap">
        &quot;Unlock your Musical Potential with our curated Tabla Course&quot;
        </p>
        <span className="absolute top-0 left-0 p-10">
        <Image
            src='/icons/logo.svg'
            alt='logo'
            width={0}
            height={0}
            className="w-72 text-transparent rounded-md"
        />
        </span>
      </div>
      <div className="flex-1">
      {children}
      </div>
    </div>
  );
}
