import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { PageShell } from "@/components/PageShell";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { signup } from "@/lib/auth";
import { toast } from "sonner";

export const Route = createFileRoute("/signup")({
  head: () => ({ meta: [{ title: "Sign Up — AI Career Helper" }] }),
  component: Signup,
});

function Signup() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirm) {
      toast.error("Passwords don't match");
      return;
    }
    signup(name, email);
    toast.success("Account created!");
    navigate({ to: "/dashboard" });
  };

  return (
    <PageShell>
      <section className="mx-auto flex max-w-md items-center px-6 pt-20 pb-24">
        <div className="glass w-full rounded-3xl p-8">
          <h1 className="text-3xl font-bold">Create your <span className="gradient-text">account</span></h1>
          <p className="mt-1 text-sm text-muted-foreground">Start your AI-guided career journey today.</p>
          <form className="mt-6 space-y-4" onSubmit={submit}>
            <div>
              <Label>Full Name</Label>
              <Input required value={name} onChange={(e) => setName(e.target.value)} className="mt-1" placeholder="Alex Doe" />
            </div>
            <div>
              <Label>Email</Label>
              <Input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1" placeholder="you@example.com" />
            </div>
            <div>
              <Label>Password</Label>
              <Input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className="mt-1" />
            </div>
            <div>
              <Label>Confirm Password</Label>
              <Input type="password" required value={confirm} onChange={(e) => setConfirm(e.target.value)} className="mt-1" />
            </div>
            <Button type="submit" className="gradient-bg w-full text-white">Create Account</Button>
          </form>
          <p className="mt-6 text-center text-sm text-muted-foreground">
            Have an account? <Link to="/login" className="font-medium text-primary hover:underline">Log in</Link>
          </p>
        </div>
      </section>
    </PageShell>
  );
}
