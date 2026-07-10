import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { MessageSquare, Upload, Route as RouteIcon, History, Bookmark, User, ArrowRight } from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { getUser } from "@/lib/auth";

export const Route = createFileRoute("/dashboard")({
  head: () => ({ meta: [{ title: "Dashboard — AI Career Helper" }] }),
  component: Dashboard,
});

const cards = [
  { to: "/chat", icon: MessageSquare, title: "Ask AI", desc: "Chat with your career mentor." },
  { to: "/resume", icon: Upload, title: "Upload Resume", desc: "Get instant AI analysis." },
  { to: "/roadmap", icon: RouteIcon, title: "Career Roadmap", desc: "Generate a personal plan." },
  { to: "/history", icon: History, title: "Resume History", desc: "Review past analyses." },
  { to: "/saved-chats", icon: Bookmark, title: "Saved Chats", desc: "Revisit conversations." },
  { to: "/profile", icon: User, title: "Profile", desc: "Manage your account." },
] as const;

function Dashboard() {
  const navigate = useNavigate();
  const [name, setName] = useState("there");

  useEffect(() => {
    const u = getUser();
    if (!u) { navigate({ to: "/login" }); return; }
    setName(u.name || "there");
  }, [navigate]);

  return (
    <PageShell>
      <section className="mx-auto max-w-7xl px-6 pt-16 pb-20">
        <h1 className="text-4xl font-bold sm:text-5xl">
          Welcome back, <span className="gradient-text">{name}</span>
        </h1>
        <p className="mt-2 text-muted-foreground">What would you like to do today?</p>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((c) => (
            <Link
              key={c.to}
              to={c.to}
              className="glass group relative overflow-hidden rounded-3xl p-6 transition-all hover:-translate-y-1 hover:shadow-2xl"
            >
              <div className="gradient-bg mb-4 grid h-12 w-12 place-items-center rounded-2xl text-white transition-transform group-hover:scale-110">
                <c.icon className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold">{c.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{c.desc}</p>
              <ArrowRight className="absolute right-6 top-6 h-4 w-4 text-muted-foreground opacity-0 transition group-hover:opacity-100" />
            </Link>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
