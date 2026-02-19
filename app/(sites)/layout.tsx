import PublicHeader from "@/components/layout/PublicHeader";
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
      <main className="pt-24">{children}</main>

      {/* Footer */}
      {/* <Footer /> */}
    </>
  );
}
