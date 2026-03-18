import DealCountdown from "@/components/deal-countdown";
import IconBoxes from "@/components/icon-boxes";
import LoadingProductCards from "@/components/loading-cards/loading-product-cards";
import ProductCarousel from "@/components/shared/product/product-carousel";
import ProductList from "@/components/shared/product/product-list";
import { Skeleton } from "@/components/ui/skeleton";
import ViewAllProductsButton from "@/components/view-all-products-button";
import { Suspense } from "react";

export const metadata = {
  title: "Home",
};

const Homepage = async () => {
  return (
    <>
      <ProductCarousel />
      <div className="flex items-center justify-between border-b-2 border-border p-0">
        <h2 className="h2-bold mb-4 hidden md:block">Newest Arrivals</h2>
        <ViewAllProductsButton />
      </div>
      <Suspense fallback={<LoadingProductCards />}>
        <ProductList limit={4} />
      </Suspense>
      <IconBoxes />
      <Suspense fallback={<Skeleton className="h-40 w-full" />}>
        <DealCountdown />
      </Suspense>
    </>
  );
};

export default Homepage;
