import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowRight, Brain, FileSearch, Target, Route as RouteIcon, GraduationCap, MessagesSquare, Sparkles } from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { Button } from "@/components/ui/button";
import { getUser } from "@/lib/auth";

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

function Index() {
  const navigate = useNavigate();
  const [authed, setAuthed] = useState(false);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const u = getUser();
    if (u) {
      navigate({ to: "/dashboard", replace: true });
      return;
    }
    setAuthed(false);
    setChecked(true);
  }, [navigate]);

  return (
    <PageShell>
      <section className="relative mx-auto max-w-7xl px-6 pt-20 pb-24 text-center">
        <div className="glass mx-auto mb-6 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium">
          <Sparkles className="h-3.5 w-3.5 text-brand-purple" />
          Powered by advanced AI
        </div>
        <h1 className="mx-auto max-w-4xl text-5xl font-bold leading-[1.05] sm:text-6xl md:text-7xl">
          Discover Your <span className="gradient-text">Dream Career</span> with AI
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
          Get instant career guidance, resume analysis, ATS score, personalized learning roadmap,
          interview preparation, and skill recommendations using Artificial Intelligence.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {checked && !authed && (
            <Link to="/signup">
              <Button size="lg" className="gradient-bg text-white shadow-lg hover:opacity-90">
                Get Started <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </Link>
          )}
        </div>
      </section>


      <section id="features" className="mx-auto max-w-7xl px-6 py-16">
        <div className="mb-12 text-center">
          <h2 className="text-4xl font-bold sm:text-5xl">Everything you need to <span className="gradient-text">level up</span></h2>
          <p className="mt-3 text-muted-foreground">Six AI-powered tools to accelerate your career journey.</p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <div
              key={f.title}
              className="glass group rounded-3xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
            >
              <div className="gradient-bg mb-4 grid h-12 w-12 place-items-center rounded-2xl text-white shadow-lg transition-transform group-hover:scale-110">
                <f.icon className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold">{f.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-16">
        <div className="glass rounded-3xl p-10 text-center">
          <GraduationCap className="mx-auto mb-4 h-10 w-10 text-brand-purple" />
          <h2 className="text-3xl font-bold sm:text-4xl">Ready to shape your future?</h2>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
            Join thousands using AI Career Helper to land their dream role.
          </p>
          <div className="mt-6 flex justify-center gap-3">
            <Link to="/signup">
              <Button size="lg" className="gradient-bg text-white">Get Started Free</Button>
            </Link>
            <Link to="/features">
              <Button size="lg" variant="outline">Explore Features</Button>
            </Link>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
