import { Skeleton } from "@/components/ui/skeleton";

const Loading = () => {
  return (
    <div className="w-full min-h-screen">
      <section className="w-full h-full flex mt-8 relative scroll-smooth">
        <aside className="hidden w-[400px] min-h-[92vh] h-full tablet:flex flex-col justify-start items-start sticky top-8">
          <Skeleton className="min-h-[92vh] h-full max-w-[400px] w-full" />{" "}
          {/* Sidebar skeleton */}
        </aside>
        <div className="max-w-[1014px] w-full flex flex-col justify-start px-0 mx-auto tablet:max-w-full tablet:mx-0 tablet:pl-12">
          <Skeleton className="h-[500px] w-full" /> {/* Video skeleton */}
          <Skeleton className="h-10 w-3/4 mt-4" /> {/* Title skeleton */}
          <Skeleton className="h-4 w-1/2 mt-2" /> {/* Subtitle skeleton */}
          <Skeleton className="h-6 w-1/4 mt-4" /> {/* Button skeleton */}
        </div>
      </section>
    </div>
  );
};

export default Loading;
