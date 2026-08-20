import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function MissionPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 px-6 py-10 max-w-2xl mx-auto w-full">
        <p className="text-xs tracking-widest text-accent font-semibold mb-2">
          OUR MISSION
        </p>
        <h1 className="text-2xl font-bold text-text-primary mb-6">
          Keep the message of Karbala alive.
        </h1>

        <div className="flex flex-col gap-4 text-sm text-text-secondary leading-relaxed">
          <p>
            Nohay carry more than melody, they carry memory. Each verse
            passes down the story of Karbala, the sacrifice of Imam Hussain
            (a.s.) and his companions, and the resilience of Ahlulbayt (a.s.),
            from one generation to the next.
          </p>
          <p>
            AzaKhana exists to make sure that message stays easy to access and
            easy to pass on, whether you are listening during Muharram,
            teaching a child the story behind a Noha, or simply reflecting on
            your own.
          </p>
          <p>
            We built this platform to be clean, fast, and free of
            distractions, so the focus stays where it belongs: on the message
            itself.
          </p>
          <p>
            This is a humble, ongoing effort. If you are a Nohakhan, a
            production team, or someone who wants to help this platform grow,
            we&apos;d love to hear from you.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}