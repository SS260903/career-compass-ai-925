import { Link } from "@tanstack/react-router";
import { Github, Linkedin, LifeBuoy, Sparkles } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border/60">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-2 font-display text-lg font-bold">
              <span className="gradient-bg grid h-8 w-8 place-items-center rounded-xl text-white">
                <Sparkles className="h-4 w-4" />
              </span>
              <span className="gradient-text">AI Career Helper</span>
            </div>
            <p className="mt-3 text-sm text-muted-foreground">
              AI-powered career guidance, resume analysis, and personalized roadmaps.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold">Product</h4>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li><Link to="/features" className="hover:text-foreground">Features</Link></li>
              <li><Link to="/about" className="hover:text-foreground">About</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold">Connect</h4>
            <div className="mt-3 flex gap-3 text-muted-foreground">
              <a
                href="https://github.com/SS260903/career-compass-ai-925"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="hover:text-foreground"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="https://www.linkedin.com/in/ashwani-ojha-7055a03a1/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="hover:text-foreground"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" aria-label="Support" className="hover:text-foreground"><LifeBuoy className="h-5 w-5" /></a>
            </div>
          </div>
        </div>
        <div className="mt-10 border-t border-border/60 pt-6 text-center text-xs text-muted-foreground">
          © 2026 AI Career Helper. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}
