import PageHero from "@/components/layout/PageHero";
import ProductDetails from "@/components/Shop/ProductDetails";
import ReviewForm from "@/components/Shop/ReviewForm";
import { products } from "@/lib/products";


export default function ShopDetails() {
    return (
        <div>
            <PageHero
                title="Shop Details"
                bgImage="/assets/images/bg/breadcumb.jpg"
                breadcrumbs={[
                    { label: "Service", href: "/" },
                    { label: "About" },
                ]}
            />
            <ProductDetails product={products[0]} />
            <ReviewForm />
        </div>
    )
}