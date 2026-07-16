export function AnimatedBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div className="animate-blob absolute -top-20 -left-20 h-96 w-96 rounded-full bg-brand/30 blur-3xl" />
      <div
        className="animate-blob absolute top-40 -right-20 h-[28rem] w-[28rem] rounded-full bg-brand-purple/30 blur-3xl"
        style={{ animationDelay: "4s" }}
      />
      <div
        className="animate-blob absolute bottom-0 left-1/3 h-80 w-80 rounded-full bg-primary/20 blur-3xl"
        style={{ animationDelay: "8s" }}
      />
    </div>
  );
}
