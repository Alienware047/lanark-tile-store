import PageHero from "@/components/layout/PageHero";
import BillingForm from "@/components/checkout/BillingForm";
import ShippingForm from "@/components/checkout/ShippingForm";
import OrderTable from "@/components/checkout/OrderTable";
import PaymentMethods from "@/components/checkout/PaymentMethod";
import CheckoutCoupon from "@/components/checkout/CheckoutCoupon";
// import CheckoutLogin from "@/components/Shop/CheckoutLogin";


export default function Checkout() {
    return(
        <div>
            <PageHero
                title="Checkout"
                bgImage="/assets/images/bg/breadcumb.jpg"
                breadcrumbs={[
                    { label: "Home", href: "/" },
                    { label: "Checkout" },
                ]}
            />
            <div className="container mx-auto px-6 py-12">

            <div className="space-y-6">

                {/* <CheckoutLogin /> */}

                <CheckoutCoupon />

            </div>


            <div className="grid lg:grid-cols-2 gap-10 mt-10">

                <BillingForm />

                <ShippingForm />

            </div>


            <OrderTable />

            <PaymentMethods />

        
                    </div>  
        </div>
    )
}