// Simple client-side auth stub using localStorage.
export type User = { id: string; name: string; email: string; goal?: string };

const KEY = "ach_user";

export function getUser(): User | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as User) : null;
  } catch {
    return null;
  }
}

export function setUser(user: User) {
  localStorage.setItem(KEY, JSON.stringify(user));
}

export function clearUser() {
  localStorage.removeItem(KEY);
}

export function signup(name: string, email: string): User {
  const user: User = { id: crypto.randomUUID(), name, email };
  setUser(user);
  return user;
}
