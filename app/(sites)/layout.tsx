import PublicHeader from "@/components/layout/PublicHeader";
import PublicFooter from "@/components/layout/PublicFooter";
// import Footer from "@/components/layout/Footer";

export const metadata = {
  title: "Lannark",
  description: "Premium Tiles Marketplace - Clay & Cocoa Brown Theme",
};

export default function SitesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* Sticky public header */}
      <PublicHeader />

      {/* Main content */}
      <main>
        {children}
      </main>

      {/* Footer */}
      <PublicFooter />
      {/* <Footer /> */}
    </>
  );
}
