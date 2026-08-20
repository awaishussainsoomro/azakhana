import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 px-6 py-10 max-w-2xl mx-auto w-full">
        <h1 className="text-2xl font-bold text-text-primary mb-6">About AzaKhana</h1>

        <div className="flex flex-col gap-4 text-sm text-text-secondary leading-relaxed">
          <p>
            AzaKhana was built with a simple goal: to make Nohay easy to find,
            organize, and listen to all in one place, without the clutter of
            unrelated content or algorithms that bury what you are actually
            looking for.
          </p>
          <p>
            Every Noha here is organized by Nohakhan, munasabat, and year, so
            whether you remember the reciter, the event, or just a phrase from
            the lyrics, you can find it in seconds.
          </p>
          <p>
            This platform is an independent, community-focused effort. It is
            not affiliated with any specific Nohakhan, organization, or
            production house. All content is either linked with permission or
            embedded from publicly available official sources.
          </p>
          <p>
            AzaKhana is a work in progress, growing steadily with more
            Nohakhans, occasions, and features over time.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}