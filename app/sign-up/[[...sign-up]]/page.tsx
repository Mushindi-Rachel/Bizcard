import { SignUp } from "@clerk/nextjs";
export default function Page() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 flex items-center justify-center">
      <SignUp />
    </main>
  );
}
