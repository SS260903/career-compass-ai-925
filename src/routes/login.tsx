import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { PageShell } from "@/components/PageShell";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { signup } from "@/lib/auth";
import { toast } from "sonner";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "Login — AI Career Helper" }] }),
  component: Login,
});

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    const name = email.split("@")[0].replace(/[._-]/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
    signup(name, email);
    toast.success("Welcome back!");
    navigate({ to: "/dashboard" });
  };

  return (
    <PageShell>
      <section className="mx-auto flex max-w-md items-center px-6 pt-20 pb-24">
        <div className="glass w-full rounded-3xl p-8">
          <h1 className="text-3xl font-bold">Welcome <span className="gradient-text">back</span></h1>
          <p className="mt-1 text-sm text-muted-foreground">Log in to continue your journey.</p>
          <form className="mt-6 space-y-4" onSubmit={submit}>
            <div>
              <Label>Email</Label>
              <Input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1" placeholder="you@example.com" />
            </div>
            <div>
              <Label>Password</Label>
              <Input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className="mt-1" placeholder="••••••••" />
            </div>
            <Button type="submit" className="gradient-bg w-full text-white">Login</Button>
          </form>
          <p className="mt-6 text-center text-sm text-muted-foreground">
            No account? <Link to="/signup" className="font-medium text-primary hover:underline">Sign up</Link>
          </p>
        </div>
      </section>
    </PageShell>
  );
}
