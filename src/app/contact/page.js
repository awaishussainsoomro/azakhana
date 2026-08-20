import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 px-6 py-10 max-w-2xl mx-auto w-full">
        <h1 className="text-2xl font-bold text-text-primary mb-6">Contact</h1>

        <div className="flex flex-col gap-4 text-sm text-text-secondary leading-relaxed">
          <p>
            Questions, feedback, or want to get in touch? Reach out anytime.
          </p>

          <div className="bg-surface border border-border rounded-xl p-5">
            <p className="text-xs text-text-muted mb-1">Email</p>
            <p className="text-text-primary font-medium">
              hello@azakhana.com
            </p>
          </div>

          <p>
            We try to respond to all messages, though it may take a little
            time as this platform is currently run independently.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}