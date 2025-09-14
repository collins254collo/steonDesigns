import "./globals.css";
import type { Metadata } from "next";
import Navbar from "../components/navbar";
import Footer from "@/components/footer";
import { CartProvider } from "@/context/cartContext";

export const metadata: Metadata = {
  title: "Steon Interiors | Elegant Interior Design",
  description: "Transform your home and office with Colman Interiors. We create timeless, elegant, and functional spaces tailored to your style.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-white text-gray-900">
        <CartProvider>
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
