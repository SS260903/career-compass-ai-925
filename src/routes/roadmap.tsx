import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getUser } from "@/lib/auth";
import { CHAT_WEBHOOK_URL } from "@/lib/webhooks";
import { toast } from "sonner";

export const Route = createFileRoute("/roadmap")({
  head: () => ({ meta: [{ title: "Career Roadmap — AI Career Helper" }] }),
  component: Roadmap,
});

function Roadmap() {
  const navigate = useNavigate();
  const [education, setEducation] = useState("");
  const [target, setTarget] = useState("");
  const [skills, setSkills] = useState("");
  const [experience, setExperience] = useState("");
  const [loading, setLoading] = useState(false);
  const [steps, setSteps] = useState<string[] | null>(null);
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const u = getUser();
    if (!u) { navigate({ to: "/login" }); return; }
    setUserId(u.id);
  }, [navigate]);

  const generate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSteps(null);
    try {
      const res = await fetch(CHAT_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "career_roadmap", userId, education, target, skills, experience }),
      });
      const raw = await res.text();
      let data: unknown = raw;
      try { data = JSON.parse(raw); } catch { /* string */ }
      let list: string[] = [];
      if (Array.isArray(data)) list = data.map(String);
      else if (data && typeof data === "object") {
        const d = data as Record<string, unknown>;
        const r = d.roadmap ?? d.steps ?? d.output;
        if (Array.isArray(r)) list = r.map(String);
        else if (typeof r === "string") list = r.split(/\n+/).filter(Boolean);
      } else if (typeof data === "string") {
        list = data.split(/\n+/).filter(Boolean);
      }
      setSteps(list.length ? list : [String(data)]);
    } catch {
      toast.error("Failed to generate roadmap");
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageShell>
      <section className="mx-auto max-w-4xl px-6 pt-16 pb-24">
        <h1 className="text-4xl font-bold sm:text-5xl">Career <span className="gradient-text">Roadmap</span></h1>
        <p className="mt-2 text-muted-foreground">Tell us about yourself and we'll craft a personalized plan.</p>

        <form onSubmit={generate} className="glass mt-8 grid gap-4 rounded-3xl p-6 sm:grid-cols-2">
          <div>
            <Label>Current Education</Label>
            <Input value={education} onChange={(e) => setEducation(e.target.value)} placeholder="e.g. B.Tech in CSE" required className="mt-1" />
          </div>
          <div>
            <Label>Target Career</Label>
            <Input value={target} onChange={(e) => setTarget(e.target.value)} placeholder="e.g. AI Engineer" required className="mt-1" />
          </div>
          <div>
            <Label>Current Skills</Label>
            <Input value={skills} onChange={(e) => setSkills(e.target.value)} placeholder="Python, SQL, ..." className="mt-1" />
          </div>
          <div>
            <Label>Experience Level</Label>
            <Input value={experience} onChange={(e) => setExperience(e.target.value)} placeholder="Fresher / 1-2 years / ..." className="mt-1" />
          </div>
          <div className="sm:col-span-2">
            <Button type="submit" disabled={loading} className="gradient-bg w-full text-white">
              {loading ? (<><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Generating...</>) : "Generate Roadmap"}
            </Button>
          </div>
        </form>

        {steps && (
          <div className="mt-8">
            <h2 className="text-2xl font-bold">Your roadmap</h2>
            <ol className="mt-4 space-y-3">
              {steps.map((s, i) => (
                <li key={i} className="flex gap-3">
                  <div className="gradient-bg grid h-8 w-8 shrink-0 place-items-center rounded-full text-xs font-bold text-white">{i + 1}</div>
                  <div className="glass flex-1 rounded-2xl px-4 py-3 text-sm">{s}</div>
                </li>
              ))}
            </ol>
          </div>
        )}
      </section>
    </PageShell>
  );
}
