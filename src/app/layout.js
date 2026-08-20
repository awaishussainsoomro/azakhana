import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata = {
  title: "AzaKhana — Every Noha. One place.",
  description:
    "Search, discover and listen to Nohay by Nohakhan, occasion and year.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`dark ${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-bg text-text-primary font-sans">
        {children}
      </body>
    </html>
  );
}