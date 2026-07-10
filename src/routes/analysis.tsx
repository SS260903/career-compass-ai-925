import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { CheckCircle2, AlertTriangle, Award, BookOpen, Youtube, Globe, GraduationCap, Briefcase } from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/analysis")({
  head: () => ({ meta: [{ title: "Resume Analysis — AI Career Helper" }] }),
  component: Analysis,
});

type Analysis = {
  atsScore?: number;
  summary?: string;
  strengths?: string[];
  weaknesses?: string[];
  missingSkills?: string[];
  recommendedRoles?: string[];
  certifications?: string[];
  roadmap?: string[];
  resources?: { books?: string[]; youtube?: string[]; courses?: string[]; documentation?: string[]; practice?: string[] };
  interview?: { technical?: string[]; hr?: string[]; coding?: string[]; behavioral?: string[] };
  raw?: unknown;
};

function normalize(data: unknown): Analysis {
  if (!data) return {};
  if (typeof data === "string") return { summary: data, raw: data };
  const d = data as Record<string, unknown>;
  const get = <T,>(...keys: string[]): T | undefined => {
    for (const k of keys) if (d[k] !== undefined) return d[k] as T;
    return undefined;
  };
  return {
    atsScore: Number(get("atsScore", "ats_score", "ATS_Score", "score")) || undefined,
    summary: get("summary", "resumeSummary"),
    strengths: get("strengths"),
    weaknesses: get("weaknesses"),
    missingSkills: get("missingSkills", "missing_skills"),
    recommendedRoles: get("recommendedRoles", "roles", "careerRoles"),
    certifications: get("certifications"),
    roadmap: get("roadmap", "learningRoadmap"),
    resources: get("resources"),
    interview: get("interview", "interviewPrep"),
    raw: data,
  };
}

function CircularScore({ value }: { value: number }) {
  const v = Math.max(0, Math.min(100, value));
  const r = 54;
  const c = 2 * Math.PI * r;
  const offset = c - (v / 100) * c;
  return (
    <div className="relative grid h-40 w-40 place-items-center">
      <svg className="-rotate-90" width="160" height="160">
        <circle cx="80" cy="80" r={r} strokeWidth="12" className="fill-none stroke-secondary" />
        <circle
          cx="80" cy="80" r={r} strokeWidth="12"
          className="fill-none"
          stroke="url(#g)" strokeLinecap="round"
          strokeDasharray={c} strokeDashoffset={offset}
        />
        <defs>
          <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="oklch(0.55 0.20 265)" />
            <stop offset="100%" stopColor="oklch(0.60 0.22 300)" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute text-center">
        <div className="text-3xl font-bold">{v}%</div>
        <div className="text-xs text-muted-foreground">ATS Score</div>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="glass rounded-3xl p-6">
      <h2 className="text-xl font-semibold">{title}</h2>
      <div className="mt-4">{children}</div>
    </div>
  );
}

function Analysis() {
  const navigate = useNavigate();
  const [a, setA] = useState<Analysis | null>(null);
  const [fileName, setFileName] = useState<string>("");

  useEffect(() => {
    try {
      const raw = localStorage.getItem("ach_last_analysis");
      if (!raw) { navigate({ to: "/resume" }); return; }
      const entry = JSON.parse(raw);
      setFileName(entry.name);
      setA(normalize(entry.analysis));
    } catch {
      navigate({ to: "/resume" });
    }
  }, [navigate]);

  if (!a) return null;

  return (
    <PageShell>
      <section className="mx-auto max-w-6xl px-6 pt-12 pb-24">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-4xl font-bold sm:text-5xl">Resume <span className="gradient-text">Analysis</span></h1>
            {fileName && <p className="mt-1 text-sm text-muted-foreground">{fileName}</p>}
          </div>
          <Link to="/resume"><Button variant="outline">Upload another</Button></Link>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          <div className="glass flex flex-col items-center justify-center rounded-3xl p-6">
            <CircularScore value={a.atsScore ?? 0} />
            <p className="mt-4 text-center text-sm text-muted-foreground">
              {a.atsScore !== undefined ? "ATS Compatibility" : "Score not available"}
            </p>
          </div>
          <div className="lg:col-span-2">
            <Section title="Resume Summary">
              <p className="text-sm leading-relaxed text-muted-foreground">
                {a.summary || "No summary was returned by the AI."}
              </p>
            </Section>
          </div>
        </div>

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <Section title="Strengths">
            {a.strengths?.length ? (
              <ul className="space-y-2">
                {a.strengths.map((s, i) => (
                  <li key={i} className="flex gap-2 text-sm">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" /> {s}
                  </li>
                ))}
              </ul>
            ) : <p className="text-sm text-muted-foreground">No strengths returned.</p>}
          </Section>
          <Section title="Weaknesses">
            {a.weaknesses?.length ? (
              <ul className="space-y-2">
                {a.weaknesses.map((s, i) => (
                  <li key={i} className="flex gap-2 text-sm">
                    <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" /> {s}
                  </li>
                ))}
              </ul>
            ) : <p className="text-sm text-muted-foreground">No weaknesses returned.</p>}
          </Section>
        </div>

        <div className="mt-6">
          <Section title="Missing Skills">
            {a.missingSkills?.length ? (
              <div className="flex flex-wrap gap-2">
                {a.missingSkills.map((s, i) => (
                  <span key={i} className="glass rounded-full px-3 py-1 text-xs font-medium">
                    <span className="gradient-text">{s}</span>
                  </span>
                ))}
              </div>
            ) : <p className="text-sm text-muted-foreground">No missing skills returned.</p>}
          </Section>
        </div>

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <Section title="Recommended Career Roles">
            {a.recommendedRoles?.length ? (
              <div className="grid gap-3 sm:grid-cols-2">
                {a.recommendedRoles.map((r, i) => (
                  <div key={i} className="glass flex items-center gap-3 rounded-2xl p-3">
                    <Briefcase className="h-5 w-5 text-brand" /> <span className="text-sm font-medium">{r}</span>
                  </div>
                ))}
              </div>
            ) : <p className="text-sm text-muted-foreground">No roles returned.</p>}
          </Section>
          <Section title="Recommended Certifications">
            {a.certifications?.length ? (
              <div className="grid gap-3 sm:grid-cols-2">
                {a.certifications.map((c, i) => (
                  <div key={i} className="glass flex items-center gap-3 rounded-2xl p-3">
                    <Award className="h-5 w-5 text-brand-purple" /> <span className="text-sm font-medium">{c}</span>
                  </div>
                ))}
              </div>
            ) : <p className="text-sm text-muted-foreground">No certifications returned.</p>}
          </Section>
        </div>

        {a.roadmap?.length ? (
          <div className="mt-6">
            <Section title="Learning Roadmap">
              <ol className="space-y-3">
                {a.roadmap.map((step, i) => (
                  <li key={i} className="flex gap-3">
                    <div className="gradient-bg grid h-8 w-8 shrink-0 place-items-center rounded-full text-xs font-bold text-white">
                      {i + 1}
                    </div>
                    <div className="glass flex-1 rounded-2xl px-4 py-2 text-sm">{step}</div>
                  </li>
                ))}
              </ol>
            </Section>
          </div>
        ) : null}

        {a.resources && (
          <div className="mt-6">
            <Section title="Recommended Resources">
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <ResourceCard icon={BookOpen} title="Books" items={a.resources.books} />
                <ResourceCard icon={Youtube} title="YouTube" items={a.resources.youtube} />
                <ResourceCard icon={GraduationCap} title="Courses" items={a.resources.courses} />
                <ResourceCard icon={Globe} title="Documentation" items={a.resources.documentation} />
                <ResourceCard icon={Globe} title="Practice" items={a.resources.practice} />
              </div>
            </Section>
          </div>
        )}

        {a.interview && (
          <div className="mt-6">
            <Section title="Interview Preparation">
              <div className="grid gap-4 md:grid-cols-2">
                <InterviewList title="Technical" items={a.interview.technical} />
                <InterviewList title="HR" items={a.interview.hr} />
                <InterviewList title="Coding" items={a.interview.coding} />
                <InterviewList title="Behavioral" items={a.interview.behavioral} />
              </div>
            </Section>
          </div>
        )}

        {!a.atsScore && !a.summary && a.raw && (
          <div className="mt-6">
            <Section title="Raw AI Response">
              <pre className="max-h-96 overflow-auto whitespace-pre-wrap rounded-xl bg-muted p-4 text-xs">
                {typeof a.raw === "string" ? a.raw : JSON.stringify(a.raw, null, 2)}
              </pre>
            </Section>
          </div>
        )}
      </section>
    </PageShell>
  );
}

function ResourceCard({ icon: Icon, title, items }: { icon: typeof BookOpen; title: string; items?: string[] }) {
  if (!items?.length) return null;
  return (
    <div className="glass rounded-2xl p-4">
      <div className="mb-2 flex items-center gap-2 font-semibold">
        <Icon className="h-4 w-4 text-brand" /> {title}
      </div>
      <ul className="space-y-1 text-sm text-muted-foreground">
        {items.map((i, k) => <li key={k}>• {i}</li>)}
      </ul>
    </div>
  );
}

function InterviewList({ title, items }: { title: string; items?: string[] }) {
  if (!items?.length) return null;
  return (
    <div className="glass rounded-2xl p-4">
      <div className="mb-2 font-semibold">{title} Questions</div>
      <ol className="space-y-1 text-sm text-muted-foreground">
        {items.map((q, i) => <li key={i}>{i + 1}. {q}</li>)}
      </ol>
    </div>
  );
}
