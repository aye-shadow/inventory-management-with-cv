import { Inter } from "next/font/google";
import "./globals.css";
import { InventoryProvider } from "./context/inventoryProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Inventory Management",
  description: "Ayesha Ejaz",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <InventoryProvider>
        <body className={inter.className}>{children}</body>
      </InventoryProvider>
    </html>
  );
}