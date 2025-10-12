import { getProfileData } from "@/action/profile/get-profile-data";
import ProfileCard from "@/components/profile-card";
import PanelTopbar from "@/components/panel-topbar";
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
      <div className="rounded-lg overflow-hidden">
        <PanelTopbar suite="WahTabla" service="Settings" />
          <ProfileCard />
      </div>
      {/* <div className="max-w-[1196px] w-full flex flex-col desktop:flex-row justify-start px-0 mx-auto tablet:max-w-full tablet:mx-0 tablet:pl-4 tablet:gap-4">
        <div className="w-full h-full flex justify-center items-center p-4">
        </div>
      </div> */}
    </HydrationBoundary>
  );
};

export default Page;
