"use client";

import { ShoppingCart } from "lucide-react";
import { useCart } from "@/components/layout/CartContext";

export default function CartButton(){

const {toggleCart,cart}=useCart();

return(

<button
onClick={toggleCart}
className="relative"
>

<ShoppingCart size={24}/>

<span
className="
absolute
-top-2
-right-2
bg-[var(--theme-primary)]
text-white
text-xs
px-1.5
rounded-full
"
>

{cart.length}

</span>

</button>

);

}