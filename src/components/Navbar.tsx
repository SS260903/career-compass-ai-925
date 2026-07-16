import { Link, useRouter } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X, Sparkles, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getUser, clearUser, type User } from "@/lib/auth";

const links = [
  { to: "/", label: "Home" },
  { to: "/features", label: "Features" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [user, setUserState] = useState<User | null>(null);
  const [dark, setDark] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setUserState(getUser());
    const isDark = localStorage.getItem("theme") === "dark";
    setDark(isDark);
    document.documentElement.classList.toggle("dark", isDark);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toggleDark = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
  };

  const logout = () => {
    clearUser();
    setUserState(null);
    router.navigate({ to: "/" });
  };

  return (
    <header className="sticky top-0 z-50 w-full">
      <div className="mx-auto mt-3 max-w-7xl px-4">
        <nav
          className={`glass flex items-center justify-between rounded-2xl px-4 py-3 transition-all duration-500 sm:px-6 ${
            scrolled ? "nav-scrolled" : ""
          }`}
        >
          <Link to="/" className="flex items-center gap-2 font-display text-lg font-bold">
            <span className="gradient-bg logo-float grid h-8 w-8 place-items-center rounded-xl text-white shadow-lg">
              <Sparkles className="h-4 w-4" />
            </span>
            <span className="gradient-text">AI Career Helper</span>
          </Link>


          <div className="hidden items-center gap-1 md:flex">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className="nav-link rounded-lg px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                activeProps={{ className: "text-foreground is-active" }}
                activeOptions={{ exact: true }}
              >
                {l.label}
              </Link>
            ))}
          </div>


          <div className="hidden items-center gap-2 md:flex">
            <button
              onClick={toggleDark}
              aria-label="Toggle theme"
              className="grid h-9 w-9 place-items-center rounded-lg text-muted-foreground hover:bg-secondary"
            >
              {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
            {user ? (
              <>
                <Link to="/dashboard">
                  <Button variant="ghost" size="sm">Dashboard</Button>
                </Link>
                <Button size="sm" variant="outline" onClick={logout}>Log out</Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="ghost" size="sm">Login</Button>
                </Link>
                <Link to="/signup">
                  <Button size="sm" className="gradient-bg text-white hover:opacity-90">Sign Up</Button>
                </Link>
              </>
            )}
          </div>

          <button
            className="md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </nav>

        {open && (
          <div className="glass mt-2 rounded-2xl p-4 md:hidden">
            <div className="flex flex-col gap-1">
              {links.map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-2 text-sm font-medium hover:bg-secondary"
                >
                  {l.label}
                </Link>
              ))}
              <div className="mt-2 flex gap-2">
                {user ? (
                  <>
                    <Link to="/dashboard" className="flex-1" onClick={() => setOpen(false)}>
                      <Button className="w-full" variant="outline">Dashboard</Button>
                    </Link>
                    <Button className="flex-1" onClick={logout}>Log out</Button>
                  </>
                ) : (
                  <>
                    <Link to="/login" className="flex-1" onClick={() => setOpen(false)}>
                      <Button className="w-full" variant="outline">Login</Button>
                    </Link>
                    <Link to="/signup" className="flex-1" onClick={() => setOpen(false)}>
                      <Button className="gradient-bg w-full text-white">Sign Up</Button>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
