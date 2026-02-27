import PageHero from "@/components/layout/PageHero";
import ProductDetails from "@/components/Shop/ProductDetails";
import ReviewForm from "@/components/Shop/ReviewForm";
import { products } from "@/lib/products";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ShopDetails({ params }: PageProps) {
    const { id } = await params;
    const product = products.find((p) => p.id === id);

    if (!product) {
        notFound();
    }

    return (
        <div>
            <PageHero
                title="Shop Details"
                bgImage="/assets/images/bg/breadcumb.jpg"
                breadcrumbs={[
                    { label: "Shop", href: "/shop" },
                    { label: product.name },
                ]}
            />
            <ProductDetails product={product} />
            {/* <ReviewForm /> */}
        </div>
    )
}