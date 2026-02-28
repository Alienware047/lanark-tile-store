"use client";

import { useState } from "react";
import ShopSection from "@/components/Shop/ShopCenter";
import ShopSidebar from "@/components/Shop/ShopSideBar";
import { products } from "@/lib/products";
import type { Product } from "@/types/product";
import { SlidersHorizontal, X } from "lucide-react";

export default function ShopPage() {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="bg-[var(--color-background)] py-12">
      <div className="container mx-auto px-4 sm:px-6">

        {/* Mobile filter toggle button */}
        <div className="flex items-center justify-between mb-6 lg:hidden">
          <p className="text-sm text-[var(--text-muted)]">
            {filteredProducts.length} products
          </p>
          <button
            onClick={() => setSidebarOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-[var(--color-primary)] text-[var(--color-primary-foreground)] rounded-lg text-sm font-medium"
          >
            <SlidersHorizontal size={16} />
            Filters
          </button>
        </div>

        {/* Mobile sidebar overlay */}
        {sidebarOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-black/50"
              onClick={() => setSidebarOpen(false)}
            />
            {/* Drawer */}
            <div className="absolute right-0 top-0 h-full w-80 max-w-[90vw] bg-[var(--color-background)] shadow-2xl overflow-y-auto">
              <div className="flex items-center justify-between p-4 border-b border-[var(--color-border)]">
                <h2 className="font-semibold text-[var(--color-foreground)]">Filters</h2>
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="p-1 rounded hover:bg-[var(--surface)] transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
              <div className="p-4">
                <ShopSidebar
                  products={products}
                  onFilter={(filtered) => {
                    setFilteredProducts(filtered);
                    setSidebarOpen(false);
                  }}
                />
              </div>
            </div>
          </div>
        )}

        {/* Desktop layout */}
        <div className="flex gap-8 xl:gap-12">
          {/* Sidebar — hidden on mobile, visible on lg+ */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="card p-6 sticky top-6">
              <ShopSidebar products={products} onFilter={setFilteredProducts} />
            </div>
          </aside>

          {/* Main content */}
          <main className="flex-1 min-w-0">
            <ShopSection products={filteredProducts} />
          </main>
        </div>

      </div>
    </div>
  );
}