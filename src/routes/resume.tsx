import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Upload, FileText, CheckCircle2, Loader2 } from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { Button } from "@/components/ui/button";
import { getUser } from "@/lib/auth";
import { RESUME_WEBHOOK_URL } from "@/lib/webhooks";
import { toast } from "sonner";

export const Route = createFileRoute("/resume")({
  head: () => ({ meta: [{ title: "Upload Resume — AI Career Helper" }] }),
  component: ResumePage,
});

function ResumePage() {
  const navigate = useNavigate();
  const [file, setFile] = useState<File | null>(null);
  const [drag, setDrag] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [done, setDone] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [user, setUser] = useState<{ id: string; name: string } | null>(null);

  useEffect(() => {
    const u = getUser();
    if (!u) { navigate({ to: "/login" }); return; }
    setUser({ id: u.id, name: u.name });
  }, [navigate]);

  const pick = (f: File | null) => {
    if (!f) return;
    if (f.type !== "application/pdf") {
      toast.error("Please upload a PDF file.");
      return;
    }
    setFile(f);
    setDone(false);
  };

  const analyze = async () => {
    if (!file || !user) return;
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("resume", file);
      fd.append("userId", user.id);
      fd.append("userName", user.name);
      const res = await fetch(RESUME_WEBHOOK_URL, { method: "POST", body: fd });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const raw = await res.text();
      let data: unknown = raw;
      try { data = JSON.parse(raw); } catch { /* string */ }

      // Persist
      const entry = {
        id: crypto.randomUUID(),
        name: file.name,
        at: new Date().toISOString(),
        analysis: data,
      };
      try {
        const prev = JSON.parse(localStorage.getItem("ach_resumes") || "[]");
        prev.unshift(entry);
        localStorage.setItem("ach_resumes", JSON.stringify(prev.slice(0, 20)));
        localStorage.setItem("ach_last_analysis", JSON.stringify(entry));
      } catch { /* ignore */ }

      setDone(true);
      toast.success("Analysis complete!");
      navigate({ to: "/analysis" });
    } catch (e) {
      toast.error("Upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <PageShell>
      <section className="mx-auto max-w-3xl px-6 pt-16 pb-24">
        <h1 className="text-4xl font-bold sm:text-5xl">Upload your <span className="gradient-text">resume</span></h1>
        <p className="mt-2 text-muted-foreground">PDF only. We'll analyze it and generate personalized recommendations.</p>

        <div
          onDragOver={(e) => { e.preventDefault(); setDrag(true); }}
          onDragLeave={() => setDrag(false)}
          onDrop={(e) => {
            e.preventDefault(); setDrag(false);
            pick(e.dataTransfer.files?.[0] ?? null);
          }}
          onClick={() => inputRef.current?.click()}
          className={`glass mt-10 cursor-pointer rounded-3xl border-2 border-dashed p-16 text-center transition ${
            drag ? "border-primary bg-primary/5" : "border-border"
          }`}
        >
          <input
            ref={inputRef}
            type="file"
            accept="application/pdf"
            className="hidden"
            onChange={(e) => pick(e.target.files?.[0] ?? null)}
          />
          {file ? (
            <div className="flex flex-col items-center gap-3">
              {done ? (
                <CheckCircle2 className="h-12 w-12 text-emerald-500" />
              ) : (
                <FileText className="gradient-text h-12 w-12" />
              )}
              <div className="font-semibold">{file.name}</div>
              <div className="text-xs text-muted-foreground">{(file.size / 1024).toFixed(1)} KB</div>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-3">
              <div className="gradient-bg grid h-16 w-16 place-items-center rounded-2xl text-white shadow-lg">
                <Upload className="h-7 w-7" />
              </div>
              <div className="text-lg font-semibold">Drag & drop your PDF here</div>
              <div className="text-sm text-muted-foreground">or click to browse</div>
            </div>
          )}
        </div>

        <div className="mt-6 flex justify-end gap-3">
          {file && (
            <Button variant="outline" onClick={() => { setFile(null); setDone(false); }}>
              Remove
            </Button>
          )}
          <Button
            disabled={!file || uploading}
            onClick={analyze}
            className="gradient-bg text-white"
          >
            {uploading ? (<><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Analyzing...</>) : "Analyze Resume"}
          </Button>
        </div>
      </section>
    </PageShell>
  );
}
