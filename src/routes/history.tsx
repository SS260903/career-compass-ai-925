import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { FileText, Eye, Download } from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { Button } from "@/components/ui/button";
import { getUser } from "@/lib/auth";

export const Route = createFileRoute("/history")({
  head: () => ({ meta: [{ title: "Resume History — AI Career Helper" }] }),
  component: History,
});

type Entry = { id: string; name: string; at: string; analysis: unknown };

function extractScore(a: unknown): number | undefined {
  if (a && typeof a === "object") {
    const d = a as Record<string, unknown>;
    const v = d.atsScore ?? d.ats_score ?? d.score;
    if (typeof v === "number") return v;
    if (typeof v === "string" && !isNaN(Number(v))) return Number(v);
  }
  return undefined;
}

function History() {
  const navigate = useNavigate();
  const [items, setItems] = useState<Entry[]>([]);

  useEffect(() => {
    if (!getUser()) { navigate({ to: "/login" }); return; }
    try {
      const raw = localStorage.getItem("ach_resumes");
      setItems(raw ? JSON.parse(raw) : []);
    } catch { setItems([]); }
  }, [navigate]);

  const view = (e: Entry) => {
    localStorage.setItem("ach_last_analysis", JSON.stringify(e));
    navigate({ to: "/analysis" });
  };

  const download = (e: Entry) => {
    const blob = new Blob([JSON.stringify(e.analysis, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = `${e.name.replace(/\.[^.]+$/, "")}-analysis.json`; a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <PageShell>
      <section className="mx-auto max-w-5xl px-6 pt-16 pb-24">
        <h1 className="text-4xl font-bold sm:text-5xl">Resume <span className="gradient-text">History</span></h1>
        <p className="mt-2 text-muted-foreground">Review your past resume analyses.</p>

        {items.length === 0 ? (
          <div className="glass mt-10 rounded-3xl p-10 text-center">
            <p className="text-muted-foreground">No resumes uploaded yet.</p>
            <Link to="/resume"><Button className="gradient-bg mt-4 text-white">Upload Resume</Button></Link>
          </div>
        ) : (
          <div className="mt-8 space-y-3">
            {items.map((e) => {
              const score = extractScore(e.analysis);
              return (
                <div key={e.id} className="glass flex flex-wrap items-center gap-4 rounded-2xl p-4">
                  <FileText className="h-6 w-6 shrink-0 text-brand" />
                  <div className="min-w-0 flex-1">
                    <div className="truncate font-medium">{e.name}</div>
                    <div className="text-xs text-muted-foreground">{new Date(e.at).toLocaleString()}</div>
                  </div>
                  {score !== undefined && (
                    <div className="glass rounded-full px-3 py-1 text-xs font-semibold">
                      <span className="gradient-text">ATS {score}%</span>
                    </div>
                  )}
                  <Button size="sm" variant="outline" onClick={() => view(e)}><Eye className="mr-1 h-3.5 w-3.5" /> View</Button>
                  <Button size="sm" variant="outline" onClick={() => download(e)}><Download className="mr-1 h-3.5 w-3.5" /> Report</Button>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </PageShell>
  );
}
