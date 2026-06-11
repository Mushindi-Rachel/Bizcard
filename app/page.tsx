import Link from "next/link";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900">
      {/* Nav */}
      <nav className="flex items-center justify-between px-8 py-5 border-b border-white/10">
        <span className="text-white font-bold text-xl tracking-tight">CardCraft</span>
        <div className="flex items-center gap-4">
          <SignedOut>
            <Link href="/sign-in" className="text-slate-300 hover:text-white text-sm transition-colors">
              Sign in
            </Link>
            <Link href="/sign-up" className="bg-indigo-500 hover:bg-indigo-400 text-white text-sm px-4 py-2 rounded-lg transition-colors">
              Get started free
            </Link>
          </SignedOut>
          <SignedIn>
            <Link href="/dashboard" className="text-slate-300 hover:text-white text-sm transition-colors">
              Dashboard
            </Link>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
        </div>
      </nav>

      {/* Hero */}
      <section className="flex flex-col items-center justify-center text-center px-4 pt-24 pb-20">
        <div className="inline-block bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-xs font-medium px-3 py-1 rounded-full mb-6">
          No design skills needed
        </div>
        <h1 className="text-5xl md:text-6xl font-bold text-white max-w-3xl leading-tight mb-6">
          Professional business cards,{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
            in minutes
          </span>
        </h1>
        <p className="text-slate-400 text-lg max-w-xl mb-10">
          Fill in your details, pick a template, download as PNG or PDF. Your card includes a QR code for instant contact sharing.
        </p>
        <SignedOut>
          <Link href="/sign-up" className="bg-indigo-500 hover:bg-indigo-400 text-white font-semibold px-8 py-3.5 rounded-xl text-lg transition-colors shadow-lg shadow-indigo-500/25">
            Create your card →
          </Link>
        </SignedOut>
        <SignedIn>
          <Link href="/dashboard" className="bg-indigo-500 hover:bg-indigo-400 text-white font-semibold px-8 py-3.5 rounded-xl text-lg transition-colors shadow-lg shadow-indigo-500/25">
            Go to Dashboard →
          </Link>
        </SignedIn>
      </section>

      {/* Feature grid */}
      <section className="max-w-4xl mx-auto px-4 pb-24 grid md:grid-cols-3 gap-6">
        {[
          { icon: "🎨", title: "10 Templates", desc: "Classic, Modern, Minimal, Bold, Elegant..." },
          { icon: "📱", title: "QR Code", desc: "Auto-generated QR with your contact info" },
          { icon: "⬇️", title: "Download PNG", desc: "Print-ready and digital formats" },
        ].map((f) => (
          <div key={f.title} className="bg-white/5 border border-white/10 rounded-xl p-6">
            <div className="text-3xl mb-3">{f.icon}</div>
            <div className="text-white font-semibold mb-1">{f.title}</div>
            <div className="text-slate-400 text-sm">{f.desc}</div>
          </div>
        ))}
      </section>
    </main>
  );
}
