import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — AI Career Helper" },
      { name: "description", content: "Get in touch with the AI Career Helper team." },
    ],
  }),
  component: Contact,
});

function Contact() {
  return (
    <PageShell>
      <section className="mx-auto max-w-2xl px-6 pt-20 pb-24">
        <h1 className="text-5xl font-bold sm:text-6xl">Get in <span className="gradient-text">touch</span></h1>
        <p className="mt-4 text-muted-foreground">We'd love to hear from you. Drop us a message below.</p>
        <form
          onSubmit={(e) => { e.preventDefault(); toast.success("Message sent! We'll get back to you soon."); }}
          className="glass mt-10 space-y-4 rounded-3xl p-8"
        >
          <div>
            <Label>Name</Label>
            <Input required placeholder="Your name" className="mt-1" />
          </div>
          <div>
            <Label>Email</Label>
            <Input required type="email" placeholder="you@example.com" className="mt-1" />
          </div>
          <div>
            <Label>Message</Label>
            <Textarea required placeholder="How can we help?" rows={5} className="mt-1" />
          </div>
          <Button type="submit" className="gradient-bg w-full text-white">Send Message</Button>
        </form>
      </section>
    </PageShell>
  );
}
