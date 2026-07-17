import { createFileRoute } from "@tanstack/react-router";
import { Brain, FileSearch, Target, Sparkles, Route as RouteIcon, MessagesSquare, BookOpen, Trophy, Rocket } from "lucide-react";
import { PageShell } from "@/components/PageShell";

export const Route = createFileRoute("/features")({
  head: () => ({
    meta: [
      { title: "Features — AI Career Helper" },
      { name: "description", content: "Explore AI career guidance, resume analysis, ATS scoring, roadmaps, and interview prep." },
    ],
  }),
  component: Features,
});

const items = [
  { icon: Brain, title: "AI Career Guidance", desc: "Chat with an AI mentor tailored to your goals, background, and interests." },
  { icon: FileSearch, title: "Resume Analysis", desc: "Deep AI review of every section with actionable improvements." },
  { icon: Target, title: "ATS Score", desc: "Beat applicant tracking systems with a precise compatibility score." },
  { icon: Sparkles, title: "Skill Gap Analysis", desc: "See exactly which skills stand between you and your target role." },
  { icon: RouteIcon, title: "Learning Roadmap", desc: "A step-by-step path with books, courses, and certifications." },
  { icon: MessagesSquare, title: "Interview Preparation", desc: "Technical, behavioral, and HR questions with model answers." },
  { icon: BookOpen, title: "Curated Resources", desc: "Handpicked videos, docs, and practice sites for your journey." },
  { icon: Trophy, title: "Certifications", desc: "Recommendations from Google, AWS, Microsoft, IBM, Oracle & more." },
  { icon: Rocket, title: "Career Roles", desc: "Discover roles matching your profile and future potential." },
];

function Features() {
  return (
    <PageShell>
      <section className="mx-auto max-w-7xl px-6 pt-20 pb-12 text-center">
        <h1 className="text-5xl font-bold sm:text-6xl">
          Powerful <span className="gradient-text">AI features</span>
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
          Everything you need to plan, prepare, and land your next role — in one place.
        </p>
      </section>
      <section className="mx-auto max-w-7xl px-6 pb-20">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((f) => (
            <div
              key={f.title}
              className="glass group relative overflow-hidden rounded-3xl p-6 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:border-brand/30"
            >
              <div className="absolute inset-x-0 top-0 h-1 gradient-bg opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <div className="gradient-bg mb-4 grid h-12 w-12 place-items-center rounded-2xl text-white transition-transform duration-300 group-hover:scale-110">
                <f.icon className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold">{f.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
