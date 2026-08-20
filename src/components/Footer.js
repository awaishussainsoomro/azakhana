import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-border px-6 py-6 max-w-5xl mx-auto w-full flex flex-col md:flex-row items-center justify-between gap-4">
      <div className="flex items-center gap-2">
        <img src="/logo.png" alt="AzaKhana" className="w-6 h-6 object-contain" />
        <span className="text-sm font-semibold text-text-primary">
          AzaKhana
        </span>
      </div>

      <div className="flex gap-5 text-xs text-text-secondary">
        <Link href="/about" className="hover:text-text-primary transition-colors">About</Link>
        <Link href="/support" className="hover:text-text-primary transition-colors">Support</Link>
        <Link href="/privacy" className="hover:text-text-primary transition-colors">Privacy</Link>
        <Link href="/contact" className="hover:text-text-primary transition-colors">Contact</Link>
      </div>

      <p className="text-xs text-text-muted flex items-center gap-1">
        Built with <span className="text-accent">♥</span> for the lovers of
        Ahlulbayt (a.s.)
      </p>
    </footer>
  );
}