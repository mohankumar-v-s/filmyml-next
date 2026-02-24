import { Skeleton } from "@/components/ui/skeleton";

export default function PersonSkeleton() {
  return (
    <div className="min-h-screen bg-black text-white pt-4">
      <main className="container mx-auto px-4">
        <div className="relative mt-4 flex flex-col md:flex-row md:items-start md:gap-8">
          <div className="relative mb-6 flex-shrink-0 md:mb-0 md:w-1/3 lg:w-1/4">
            <Skeleton className="aspect-[2/3] w-full rounded-lg bg-gray-800" />
          </div>

          <div className="flex-grow">
            <Skeleton className="mb-4 h-10 w-3/4 bg-gray-800" />

            <div className="space-y-2">
              <Skeleton className="h-4 w-1/2 bg-gray-800" />
              <Skeleton className="h-4 w-1/2 bg-gray-800" />
              <Skeleton className="h-4 w-full bg-gray-800" />
              <Skeleton className="h-4 w-full bg-gray-800" />
              <Skeleton className="h-4 w-3/4 bg-gray-800" />
            </div>
          </div>
        </div>

        <section className="mt-12">
          <Skeleton className="mb-4 h-6 w-24 bg-gray-800" />
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="group">
                <Skeleton className="aspect-[2/3] w-full rounded-lg bg-gray-800" />
                <Skeleton className="mt-2 h-4 w-3/4 bg-gray-800" />
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
