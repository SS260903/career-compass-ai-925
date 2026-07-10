import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { MessageSquare } from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { Button } from "@/components/ui/button";
import { getUser } from "@/lib/auth";

export const Route = createFileRoute("/saved-chats")({
  head: () => ({ meta: [{ title: "Saved Chats — AI Career Helper" }] }),
  component: Saved,
});

type Chat = { id: string; question: string; reply: string; at: string };

function Saved() {
  const navigate = useNavigate();
  const [items, setItems] = useState<Chat[]>([]);
  const [open, setOpen] = useState<Chat | null>(null);

  useEffect(() => {
    if (!getUser()) { navigate({ to: "/login" }); return; }
    try {
      const raw = localStorage.getItem("ach_saved_chats");
      setItems(raw ? JSON.parse(raw) : []);
    } catch { setItems([]); }
  }, [navigate]);

  return (
    <PageShell>
      <section className="mx-auto max-w-5xl px-6 pt-16 pb-24">
        <h1 className="text-4xl font-bold sm:text-5xl">Saved <span className="gradient-text">Chats</span></h1>
        <p className="mt-2 text-muted-foreground">Revisit your past AI conversations.</p>

        {items.length === 0 ? (
          <div className="glass mt-10 rounded-3xl p-10 text-center">
            <p className="text-muted-foreground">No conversations yet.</p>
            <Link to="/chat"><Button className="gradient-bg mt-4 text-white">Start chatting</Button></Link>
          </div>
        ) : (
          <div className="mt-8 space-y-3">
            {items.map((c) => (
              <button key={c.id} onClick={() => setOpen(c)} className="glass block w-full rounded-2xl p-4 text-left transition hover:-translate-y-0.5">
                <div className="flex items-start gap-3">
                  <MessageSquare className="mt-0.5 h-5 w-5 shrink-0 text-brand" />
                  <div className="min-w-0 flex-1">
                    <div className="truncate font-medium">{c.question}</div>
                    <div className="line-clamp-2 text-sm text-muted-foreground">{c.reply}</div>
                    <div className="mt-1 text-xs text-muted-foreground">{new Date(c.at).toLocaleString()}</div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}

        {open && (
          <div className="fixed inset-0 z-50 grid place-items-center bg-black/40 p-4" onClick={() => setOpen(null)}>
            <div className="glass max-h-[80vh] max-w-2xl overflow-y-auto rounded-3xl p-6" onClick={(e) => e.stopPropagation()}>
              <div className="mb-2 text-xs text-muted-foreground">{new Date(open.at).toLocaleString()}</div>
              <h3 className="text-lg font-semibold">{open.question}</h3>
              <div className="mt-4 whitespace-pre-wrap text-sm text-muted-foreground">{open.reply}</div>
              <div className="mt-6 text-right">
                <Button onClick={() => setOpen(null)}>Close</Button>
              </div>
            </div>
          </div>
        )}
      </section>
    </PageShell>
  );
}
