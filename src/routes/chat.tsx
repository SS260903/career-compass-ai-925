import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Send, Sparkles } from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { Button } from "@/components/ui/button";
import { getUser } from "@/lib/auth";
import { CHAT_WEBHOOK_URL } from "@/lib/webhooks";
import { toast } from "sonner";

export const Route = createFileRoute("/chat")({
  head: () => ({ meta: [{ title: "AI Chat — AI Career Helper" }] }),
  component: Chat,
});

type Msg = { role: "user" | "assistant"; content: string };

const suggestions = [
  "I want to become an AI Engineer.",
  "Suggest a roadmap for Data Science.",
  "What skills should I learn for Cybersecurity?",
  "How do I prepare for software engineering interviews?",
];

function extractReply(data: unknown): string {
  if (typeof data === "string") return data;
  if (data && typeof data === "object") {
    const d = data as Record<string, unknown>;
    for (const key of ["reply", "answer", "response", "message", "output", "text"]) {
      if (typeof d[key] === "string") return d[key] as string;
    }
    return JSON.stringify(data, null, 2);
  }
  return String(data);
}

function Chat() {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const u = getUser();
    if (!u) { navigate({ to: "/login" }); return; }
    setUserId(u.id);
  }, [navigate]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  const send = async (text: string) => {
    if (!text.trim() || loading) return;
    setMessages((m) => [...m, { role: "user", content: text }]);
    setInput("");
    setLoading(true);
    try {
      const res = await fetch(CHAT_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "career_chat", question: text, userId }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const raw = await res.text();
      let data: unknown = raw;
      try { data = JSON.parse(raw); } catch { /* keep string */ }
      const reply = extractReply(data);
      setMessages((m) => [...m, { role: "assistant", content: reply }]);
      // Persist to saved chats
      try {
        const key = "ach_saved_chats";
        const prev = JSON.parse(localStorage.getItem(key) || "[]");
        prev.unshift({ id: crypto.randomUUID(), question: text, reply, at: new Date().toISOString() });
        localStorage.setItem(key, JSON.stringify(prev.slice(0, 50)));
      } catch { /* ignore */ }
    } catch (e) {
      toast.error("Couldn't reach the AI. Please try again.");
      setMessages((m) => [...m, { role: "assistant", content: "Sorry, I couldn't process that right now." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageShell showBg={false}>
      <section className="mx-auto flex h-[calc(100vh-8rem)] max-w-4xl flex-col px-4 pt-6 pb-4">
        <div className="glass mb-4 flex items-center gap-3 rounded-2xl px-4 py-3">
          <span className="gradient-bg grid h-9 w-9 place-items-center rounded-xl text-white">
            <Sparkles className="h-4 w-4" />
          </span>
          <div>
            <div className="font-semibold">AI Career Assistant</div>
            <div className="text-xs text-muted-foreground">Ask anything about your career.</div>
          </div>
        </div>

        <div ref={scrollRef} className="flex-1 overflow-y-auto pb-4">
          {messages.length === 0 && (
            <div className="mt-8 text-center">
              <h2 className="text-2xl font-bold">How can I help you today?</h2>
              <p className="mt-2 text-sm text-muted-foreground">Try one of these:</p>
              <div className="mx-auto mt-6 grid max-w-2xl gap-2 sm:grid-cols-2">
                {suggestions.map((s) => (
                  <button
                    key={s}
                    onClick={() => send(s)}
                    className="glass rounded-xl p-3 text-left text-sm transition hover:-translate-y-0.5"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}
          <div className="space-y-4">
            {messages.map((m, i) => (
              <div key={i} className={m.role === "user" ? "flex justify-end" : "flex justify-start"}>
                <div
                  className={
                    m.role === "user"
                      ? "gradient-bg max-w-[85%] rounded-2xl rounded-tr-sm px-4 py-3 text-sm text-white shadow-lg"
                      : "glass max-w-[85%] whitespace-pre-wrap rounded-2xl rounded-tl-sm px-4 py-3 text-sm"
                  }
                >
                  {m.content}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="glass flex items-center gap-1 rounded-2xl rounded-tl-sm px-4 py-3">
                  <span className="typing-dot h-2 w-2 rounded-full bg-brand" />
                  <span className="typing-dot h-2 w-2 rounded-full bg-brand" />
                  <span className="typing-dot h-2 w-2 rounded-full bg-brand" />
                </div>
              </div>
            )}
          </div>
        </div>

        <form
          onSubmit={(e) => { e.preventDefault(); send(input); }}
          className="glass flex items-end gap-2 rounded-2xl p-2"
        >
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(input); } }}
            rows={1}
            placeholder="Ask about careers, skills, interviews..."
            className="max-h-40 flex-1 resize-none bg-transparent px-3 py-2 text-sm outline-none"
          />
          <Button type="submit" size="icon" disabled={loading || !input.trim()} className="gradient-bg text-white">
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </section>
    </PageShell>
  );
}
