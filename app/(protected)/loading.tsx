import { Skeleton } from "@/components/ui/skeleton";

const Loading = () => {
  return (
    <div className="w-full min-h-screen">
      <section className="w-full h-full flex mt-8 relative scroll-smooth">
        <div className=" w-full flex flex-col justify-start px-0 mx-auto tablet:max-w-full tablet:mx-0 tablet:pl-6">
          <Skeleton className="h-[500px] w-full" /> {/* Video skeleton */}
        </div>
      </section>
    </div>
  );
};

export default Loading;