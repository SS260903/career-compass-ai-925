import type { ReactNode } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { AnimatedBackground } from "@/components/AnimatedBackground";

export function PageShell({ children, showBg = true }: { children: ReactNode; showBg?: boolean }) {
  return (
    <div className="relative flex min-h-screen flex-col">
      {showBg && <AnimatedBackground />}
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
