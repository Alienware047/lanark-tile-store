"use client";

import { useState } from "react";
import ShopSection from "@/components/Shop/ShopCenter";
import ShopSidebar from "@/components/Shop/ShopSideBar";
import { products } from "@/lib/products";
import type { Product } from "@/types/product";

export default function ShopPage(){
    const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);

    return(
        <div className="bg-[var(--color-background)] py-12">
            <div className="container mx-auto px-6">
                <div className="flex gap-12">
                    <aside className="w-64 flex-shrink-0">
                        <div className="card p-6 sticky top-6">
                            <ShopSidebar products={products} onFilter={setFilteredProducts} />
                        </div>
                    </aside>
                    <main className="flex-1">
                        <ShopSection products={filteredProducts} />
                    </main>
                </div>
            </div>
        </div>
    )
}