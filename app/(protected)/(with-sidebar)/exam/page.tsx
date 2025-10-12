import { getProfileData } from "@/action/profile/get-profile-data";
import PanelTopbar from "@/components/panel-topbar";
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
      <div className="rounded-lg overflow-hidden">
        <PanelTopbar suite="WahTabla" service="Exams" />
        <ProfileDashboard />
        {/* <Profile /> */}
      </div>
    </HydrationBoundary>
  );
};

export default Page;
