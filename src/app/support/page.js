import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function SupportPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 px-6 py-10 max-w-2xl mx-auto w-full">
        <h1 className="text-2xl font-bold text-text-primary mb-6">Support</h1>

        <div className="flex flex-col gap-4 text-sm text-text-secondary leading-relaxed">
          <p>
            Have a question, found something not working correctly, or want
            to suggest a Nohakhan or Noha to add? We&apos;d like to hear from you.
          </p>

          <div>
            <p className="text-text-primary font-medium mb-1">
              Reporting an issue
            </p>
            <p>
              If a video isn&apos;t playing, a link is broken, or something looks
              wrong, reach out through the Contact page with as much detail as
              possible so we can fix it quickly.
            </p>
          </div>

          <div>
            <p className="text-text-primary font-medium mb-1">
              Suggesting content
            </p>
            <p>
              We&apos;re always looking to add more Nohakhans and Nohay. If there&apos;s
              someone or something you&apos;d like to see here, let us know.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}