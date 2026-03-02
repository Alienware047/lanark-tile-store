import GallerySection from "@/components/sections/GallerySection";
import NewsRoom from "@/components/sections/NewsRoom";

export const metadata = {
  title: "Larnark - Gallery",
  description: "Welcome to Larnark, browse our gallery for your premier destination for exquisite tiles, stone, and consulting services. Explore our contemporary collection and expert solutions for your flooring needs.",
};

export default function GalleryPage() {
    return(
        <div>
            <GallerySection />
            <NewsRoom />
        </div>
    )
} 