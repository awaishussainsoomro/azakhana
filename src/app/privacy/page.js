import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 px-6 py-10 max-w-2xl mx-auto w-full">
        <h1 className="text-2xl font-bold text-text-primary mb-2">Privacy Policy</h1>
        <p className="text-xs text-text-muted mb-6">Last updated: August 2026</p>

        <div className="flex flex-col gap-4 text-sm text-text-secondary leading-relaxed">
          <p>
            AzaKhana is built to be simple and does not require an account to
            browse, search, or watch content.
          </p>

          <div>
            <p className="text-text-primary font-medium mb-1">
              What we collect
            </p>
            <p>
              We do not collect personal information from visitors. Basic,
              anonymous usage data (such as which Nohay are viewed) may be
              used internally to improve the platform, such as showing what&apos;s
              trending.
            </p>
          </div>

          <div>
            <p className="text-text-primary font-medium mb-1">
              Embedded content
            </p>
            <p>
              Videos on this platform are embedded from YouTube. Playing a
              video may be subject to YouTube&apos;s own privacy policy and
              cookies, which AzaKhana does not control.
            </p>
          </div>

          <div>
            <p className="text-text-primary font-medium mb-1">Changes</p>
            <p>
              This policy may be updated as the platform grows. Significant
              changes will be reflected on this page.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}