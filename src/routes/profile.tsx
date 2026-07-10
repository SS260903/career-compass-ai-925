import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Mail, User as UserIcon, Target } from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getUser, setUser, type User } from "@/lib/auth";
import { toast } from "sonner";

export const Route = createFileRoute("/profile")({
  head: () => ({ meta: [{ title: "Profile — AI Career Helper" }] }),
  component: Profile,
});

function Profile() {
  const navigate = useNavigate();
  const [u, setU] = useState<User | null>(null);
  const [edit, setEdit] = useState(false);
  const [resumes, setResumes] = useState(0);
  const [chats, setChats] = useState(0);

  useEffect(() => {
    const user = getUser();
    if (!user) { navigate({ to: "/login" }); return; }
    setU(user);
    try {
      setResumes(JSON.parse(localStorage.getItem("ach_resumes") || "[]").length);
      setChats(JSON.parse(localStorage.getItem("ach_saved_chats") || "[]").length);
    } catch { /* ignore */ }
  }, [navigate]);

  const save = () => {
    if (!u) return;
    setUser(u);
    setEdit(false);
    toast.success("Profile updated");
  };

  if (!u) return null;

  return (
    <PageShell>
      <section className="mx-auto max-w-3xl px-6 pt-16 pb-24">
        <h1 className="text-4xl font-bold sm:text-5xl">Your <span className="gradient-text">profile</span></h1>

        <div className="glass mt-8 rounded-3xl p-8">
          <div className="flex items-center gap-4">
            <div className="gradient-bg grid h-16 w-16 shrink-0 place-items-center rounded-2xl text-2xl font-bold text-white">
              {u.name.charAt(0).toUpperCase()}
            </div>
            <div className="min-w-0 flex-1">
              <div className="truncate text-2xl font-bold">{u.name}</div>
              <div className="truncate text-sm text-muted-foreground">{u.email}</div>
            </div>
            {!edit && <Button variant="outline" onClick={() => setEdit(true)}>Edit Profile</Button>}
          </div>

          {edit ? (
            <div className="mt-6 space-y-4">
              <div>
                <Label>Name</Label>
                <Input value={u.name} onChange={(e) => setU({ ...u, name: e.target.value })} className="mt-1" />
              </div>
              <div>
                <Label>Email</Label>
                <Input value={u.email} onChange={(e) => setU({ ...u, email: e.target.value })} className="mt-1" />
              </div>
              <div>
                <Label>Career Goal</Label>
                <Input value={u.goal ?? ""} onChange={(e) => setU({ ...u, goal: e.target.value })} placeholder="e.g. AI Engineer" className="mt-1" />
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setEdit(false)}>Cancel</Button>
                <Button className="gradient-bg text-white" onClick={save}>Save</Button>
              </div>
            </div>
          ) : (
            <div className="mt-6 grid gap-3 text-sm">
              <Row icon={UserIcon} label="Name" value={u.name} />
              <Row icon={Mail} label="Email" value={u.email} />
              <Row icon={Target} label="Career Goal" value={u.goal || "Not set"} />
            </div>
          )}
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div className="glass rounded-2xl p-6">
            <div className="text-sm text-muted-foreground">Uploaded Resumes</div>
            <div className="mt-1 text-3xl font-bold gradient-text">{resumes}</div>
          </div>
          <div className="glass rounded-2xl p-6">
            <div className="text-sm text-muted-foreground">Saved Chats</div>
            <div className="mt-1 text-3xl font-bold gradient-text">{chats}</div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}

function Row({ icon: Icon, label, value }: { icon: typeof Mail; label: string; value: string }) {
  return (
    <div className="flex items-center gap-3 rounded-xl bg-secondary/50 px-4 py-3">
      <Icon className="h-4 w-4 text-brand" />
      <div className="min-w-0 flex-1">
        <div className="text-xs text-muted-foreground">{label}</div>
        <div className="truncate font-medium">{value}</div>
      </div>
    </div>
  );
}
