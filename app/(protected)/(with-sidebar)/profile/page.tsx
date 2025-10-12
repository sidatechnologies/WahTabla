import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";


import ProfileModuleList from "@/components/profile-module-list";
import PanelTopbar from "@/components/panel-topbar";
import Profile from "@/components/profile";
import { getProfile } from "@/action/profile/getProfile";

const ProfilePage = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["getFullProfile"],
    queryFn: getProfile,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="rounded-lg overflow-hidden">
        <PanelTopbar suite="WahTabla" service="Courses" />
        <ProfileModuleList />
        {/* <Profile /> */}
      </div>
    </HydrationBoundary >
  );
};

export default ProfilePage;
