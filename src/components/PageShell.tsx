import type { ReactNode } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { InteractiveRobot } from "@/components/InteractiveRobot";
import { CursorSpotlight } from "@/components/CursorSpotlight";
import { PageLoader } from "@/components/PageLoader";

export function PageShell({ children, showBg = true }: { children: ReactNode; showBg?: boolean }) {
  return (
    <div className="relative flex min-h-screen flex-col">
      {showBg && <AnimatedBackground />}
      <CursorSpotlight />
      <PageLoader />
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
      <InteractiveRobot />
    </div>
  );
}
