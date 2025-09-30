import { getProfileData } from "@/action/profile/get-profile-data";
import ProfileDashboard from "@/components/profile-dashboard";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import React from "react";

const Page = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["getProfileData"],
    queryFn: getProfileData,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="w-full flex flex-col desktop:flex-row justify-start px-0 mx-auto tablet:max-w-full tablet:mx-0 tablet:pl-4 tablet:gap-4">
        <div className="w-full h-full flex justify-center items-start">
          <ProfileDashboard />
        </div>
      </div>
    </HydrationBoundary>
  );
};

export default Page;
