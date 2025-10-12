import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";


import CertificateModuleList from "@/components/certificate-module-list";
import Profile from "@/components/profile";
import { getProfile } from "@/action/profile/getProfile";
import PanelTopbar from "@/components/panel-topbar";

const CertificatePage = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["getFullProfile"],
    queryFn: getProfile,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="rounded-lg overflow-hidden">
        <PanelTopbar suite="WahTabla" service="Certificates" />
        <CertificateModuleList />
      </div>
    </HydrationBoundary>
  );
};

export default CertificatePage;
