import ProfileSidebar from "@/components/profile-sidebar";

export default function dashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="w-full flex mt-8 relative scroll-smooth">
      <aside className="hidden w-[300px] h-full md:flex flex-col justify-start items-start sticky top-8">
        <ProfileSidebar />
      </aside>
      {children}
    </section>
  );
}
