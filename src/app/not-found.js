import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function NotFound() {
    return (
        <>
            <Navbar />
            <main className="flex-1 flex flex-col items-center justify-center px-6 py-20 text-center">
                <p className="text-6xl font-bold text-accent mb-4">404</p>
                <h1 className="text-xl font-semibold text-text-primary mb-2">
                    Page not found
                </h1>
                <p className="text-sm text-text-secondary mb-6 max-w-sm">
                    The page you&apos;re looking for doesn&apos;t exist or may have been moved.
                </p>
                <Link
                    href="/"
                    className="bg-accent text-white text-sm font-medium px-6 py-2.5 rounded-full"
                >
                    Back to Home
                </Link>
            </main>
            <Footer />
        </>
    );
}