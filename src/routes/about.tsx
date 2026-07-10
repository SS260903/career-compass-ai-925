import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — AI Career Helper" },
      { name: "description", content: "About AI Career Helper — our mission to democratize career guidance with AI." },
    ],
  }),
  component: About,
});

function About() {
  return (
    <PageShell>
      <section className="mx-auto max-w-4xl px-6 pt-20 pb-24">
        <h1 className="text-5xl font-bold sm:text-6xl">About <span className="gradient-text">us</span></h1>
        <p className="mt-6 text-lg text-muted-foreground">
          AI Career Helper is on a mission to make world-class career guidance accessible to everyone.
          We combine cutting-edge AI with proven career frameworks to help you plan smarter, prepare faster,
          and land the role you deserve.
        </p>
        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          <div className="glass rounded-3xl p-6">
            <h3 className="text-xl font-semibold">Our Mission</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Empower every professional with personalized, actionable career intelligence.
            </p>
          </div>
          <div className="glass rounded-3xl p-6">
            <h3 className="text-xl font-semibold">Our Vision</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              A world where no one is limited by lack of guidance or feedback.
            </p>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
