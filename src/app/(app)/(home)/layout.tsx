import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Footer } from "@/modules/home/ui/component/footer";
import { Navbar } from "@/modules/home/ui/component/navbar";
import {
  SearchFilters,
  SearchFiltersSkeleton,
} from "@/modules/home/ui/component/search-filters";

import { getQueryClient, trpc } from "@/trpc/server";
import { Suspense } from "react";

interface Props {
  children: React.ReactNode;
}

const Layout = async ({ children }: Props) => {
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(trpc.categories.getMany.queryOptions());

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<SearchFiltersSkeleton />}>
          <SearchFilters />
        </Suspense>
      </HydrationBoundary>
      <div className="flex-1 bg-slate-100">{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
