import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";


import CertificateModuleList from "@/components/certificate-module-list";
import Profile from "@/components/profile";
import { getProfile } from "@/action/profile/getProfile";

const CertificatePage = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["getFullProfile"],
    queryFn: getProfile,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="max-w-[1196px] w-full flex flex-col desktop:flex-row justify-start px-0 mx-auto tablet:max-w-full tablet:mx-0 tablet:pl-4 tablet:gap-4">
        <CertificateModuleList />
        <Profile />
      </div>
    </HydrationBoundary>
  );
};

export default CertificatePage;
