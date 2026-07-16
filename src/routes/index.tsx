import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Brain, FileSearch, Target, Route as RouteIcon, GraduationCap, MessagesSquare, Sparkles } from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { Button } from "@/components/ui/button";
import { ScrollReveal } from "@/components/ScrollReveal";
import { WaveDivider } from "@/components/WaveDivider";
import { TiltCard } from "@/components/TiltCard";

export const Route = createFileRoute("/")({
  component: Index,
});

const features = [
  { icon: Brain, title: "AI Career Guidance", desc: "Personalized career advice based on your interests and goals." },
  { icon: FileSearch, title: "Resume Analysis", desc: "Upload your resume and receive detailed AI feedback." },
  { icon: Target, title: "ATS Score", desc: "Calculate ATS compatibility and improve resume quality." },
  { icon: Sparkles, title: "Skill Gap Analysis", desc: "Identify missing skills for your target job." },
  { icon: RouteIcon, title: "Learning Roadmap", desc: "Books, videos, certifications, and courses tailored for you." },
  { icon: MessagesSquare, title: "Interview Preparation", desc: "Generate interview questions and preparation tips." },
];

function LetterHeadline({ text }: { text: string }) {
  const words = text.split(" ");
  let letterIdx = 0;
  return (
    <span className="letter-reveal">
      {words.map((word, wi) => (
        <span key={wi} className="inline-block whitespace-nowrap">
          {word.split("").map((ch) => {
            const delay = letterIdx * 0.03;
            letterIdx += 1;
            return (
              <span key={letterIdx} style={{ animationDelay: `${delay}s` }}>
                {ch}
              </span>
            );
          })}
          {wi < words.length - 1 && <span style={{ animationDelay: `${letterIdx * 0.03}s` }}>&nbsp;</span>}
        </span>
      ))}
    </span>
  );
}

function Index() {
  return (
    <PageShell>
      <section className="relative mx-auto max-w-7xl px-6 pt-20 pb-24 text-center">
        {/* Floating decorative elements */}
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-0 overflow-hidden">
          <div className="absolute left-[10%] top-24 h-20 w-20 rounded-2xl bg-brand/30 blur-2xl animate-blob" />
          <div className="absolute right-[12%] top-40 h-24 w-24 rounded-full bg-brand-purple/30 blur-2xl animate-blob" style={{ animationDelay: "5s" }} />
          <div className="absolute left-1/2 bottom-6 h-16 w-16 -translate-x-1/2 rounded-3xl bg-primary/25 blur-2xl animate-blob" style={{ animationDelay: "9s" }} />
        </div>

        <div className="glass mx-auto mb-6 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium reveal reveal-in">
          <Sparkles className="h-3.5 w-3.5 text-brand-purple" />
          Powered by advanced AI
        </div>
        <h1 className="mx-auto max-w-4xl text-5xl font-bold leading-[1.05] sm:text-6xl md:text-7xl">
          <LetterHeadline text="Discover Your" />{" "}
          <span className="gradient-text"><LetterHeadline text="Dream Career" /></span>{" "}
          <LetterHeadline text="with AI" />
        </h1>
        <ScrollReveal delay={200}>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            Get instant career guidance, resume analysis, ATS score, personalized learning roadmap,
            interview preparation, and skill recommendations using Artificial Intelligence.
          </p>
        </ScrollReveal>
        <ScrollReveal delay={400} stagger>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link to="/signup">
              <Button size="lg" className="btn-fx gradient-bg text-white shadow-lg hover:opacity-90">
                Get Started <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </ScrollReveal>
      </section>

      <WaveDivider />

      <section id="features" className="mx-auto max-w-7xl px-6 py-16">
        <ScrollReveal>
          <div className="mb-12 text-center">
            <h2 className="text-4xl font-bold sm:text-5xl">Everything you need to <span className="gradient-text">level up</span></h2>
            <p className="mt-3 text-muted-foreground">Six AI-powered tools to accelerate your career journey.</p>
          </div>
        </ScrollReveal>
        <ScrollReveal stagger>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f) => (
              <TiltCard key={f.title} className="rounded-3xl">
                <div className="glass glow-card rounded-3xl p-6 h-full">
                  <div className="gradient-bg mb-4 grid h-12 w-12 place-items-center rounded-2xl text-white shadow-lg transition-transform group-hover:scale-110">
                    <f.icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-semibold">{f.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{f.desc}</p>
                </div>
              </TiltCard>
            ))}
          </div>
        </ScrollReveal>
      </section>

      <WaveDivider flip />

      <section className="mx-auto max-w-5xl px-6 py-16">
        <ScrollReveal>
          <div className="glass glow-card rounded-3xl p-10 text-center">
            <GraduationCap className="mx-auto mb-4 h-10 w-10 text-brand-purple" />
            <h2 className="text-3xl font-bold sm:text-4xl">Ready to shape your future?</h2>
            <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
              Join thousands using AI Career Helper to land their dream role.
            </p>
            <div className="mt-6 flex justify-center gap-3">
              <Link to="/signup">
                <Button size="lg" className="btn-fx gradient-bg text-white">Get Started Free</Button>
              </Link>
              <Link to="/features">
                <Button size="lg" variant="outline" className="btn-fx">Explore Features</Button>
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </section>
    </PageShell>
  );
}
