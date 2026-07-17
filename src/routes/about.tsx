import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";
import { Code2, Server, Palette, Cpu, Layout, Workflow, PenTool } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "Meet Team Neuronex — AI Career Helper" },
      { name: "description", content: "Meet the multidisciplinary team behind AI Career Helper — developers, workflow engineers, and designers building intelligent AI solutions." },
    ],
  }),
  component: About,
});

const team = [
  {
    name: "Ashwani Ojha",
    role: "Team Lead • Frontend Developer",
    desc: "Led the project, developed responsive frontend interfaces, and coordinated the team.",
    icons: [Code2, Layout],
  },
  {
    name: "Suryansh Srivastava",
    role: "Backend Developer • Workflow Engineer",
    desc: "Built backend services, AI workflows, and API integrations using n8n.",
    icons: [Server, Workflow],
  },
  {
    name: "Jayesh Singh",
    role: "UI/UX Designer • Visual Designer",
    desc: "Designed intuitive interfaces and project presentation assets.",
    icons: [Palette],
  },
  {
    name: "Samaksh Soni",
    role: "UI/UX Designer • Embedded Systems Enthusiast",
    desc: "Designed user experiences, developed the Lean Canvas, and contributed technical insights.",
    icons: [Palette, Cpu],
  },
  {
    name: "Himanshu Dev Patel",
    role: "UI/UX Designer • Frontend Support",
    desc: "Designed user-friendly interfaces and improved responsive layouts and usability.",
    icons: [Palette, Code2],
  },
];

function About() {
  return (
    <PageShell>
      <section className="mx-auto max-w-6xl px-6 pt-20 pb-24">
        <div className="mb-14 text-center">
          <h1 className="text-5xl font-bold sm:text-6xl">
            Meet <span className="gradient-text">Team Neuronex</span>
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-lg text-muted-foreground">
            Team Neuronex is a multidisciplinary team of developers, workflow engineers, and designers
            committed to building intelligent, scalable, and user-friendly AI solutions through innovation
            and collaboration.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {team.map((member) => (
            <div
              key={member.name}
              className="glass group relative overflow-hidden rounded-3xl p-7 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:border-brand/30"
            >
              <div className="absolute inset-x-0 top-0 h-1 gradient-bg opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

              <div className="mb-5 flex items-center gap-3">
                {member.icons.map((Icon, i) => (
                  <div
                    key={i}
                    className="grid h-10 w-10 place-items-center rounded-xl bg-secondary text-brand transition-transform duration-300 group-hover:scale-110"
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                ))}
              </div>

              <h3 className="text-xl font-semibold">{member.name}</h3>
              <p className="mt-1 text-sm font-medium text-brand">{member.role}</p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{member.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
