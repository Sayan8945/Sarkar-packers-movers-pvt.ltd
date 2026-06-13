import type { User } from "@/types/auth";

// ── Storage keys ──────────────────────────────────────────
const ADMIN_AUTH_KEY = "sarkar_admin_auth";
const ADMIN_USER_KEY = "sarkar_admin_user";
const USER_AUTH_KEY  = "sarkar_user_auth";
const USER_USER_KEY  = "sarkar_user_user";

// ── Mock data ─────────────────────────────────────────────
export const MOCK_ADMIN: User = {
  id: "1", name: "Admin User",   email: "admin@sarkarpackers.in", role: "admin",
};
export const MOCK_USER: User = {
  id: "2", name: "Rahul Sharma", email: "user@example.com",        role: "user",
};
export const MOCK_ADMIN_CREDENTIALS = { email: "admin@sarkarpackers.in", password: "Admin@123" };
export const MOCK_USER_CREDENTIALS  = { email: "user@example.com",        password: "User@123" };

// ── Cookie helpers ────────────────────────────────────────
function setCookie(name: string, value: string, days = 1) {
  const d = new Date();
  d.setTime(d.getTime() + days * 24 * 60 * 60 * 1000);
  // SameSite=Lax so the proxy (Edge runtime) can read it on navigation
  document.cookie = `${name}=${value}; path=/; expires=${d.toUTCString()}; SameSite=Lax`;
}
function deleteCookie(name: string) {
  document.cookie = `${name}=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT; SameSite=Lax`;
}

// ── Admin auth ────────────────────────────────────────────
export function adminLogin(email: string, password: string, remember = false): User | null {
  if (email === MOCK_ADMIN_CREDENTIALS.email && password === MOCK_ADMIN_CREDENTIALS.password) {
    const s = remember ? localStorage : sessionStorage;
    s.setItem(ADMIN_AUTH_KEY, "true");
    s.setItem(ADMIN_USER_KEY, JSON.stringify(MOCK_ADMIN));
    setCookie(ADMIN_AUTH_KEY, "true", remember ? 30 : 1);
    return MOCK_ADMIN;
  }
  return null;
}
export function adminLogout(): void {
  [localStorage, sessionStorage].forEach(s => {
    s.removeItem(ADMIN_AUTH_KEY);
    s.removeItem(ADMIN_USER_KEY);
  });
  deleteCookie(ADMIN_AUTH_KEY);
}
export function getAdminUser(): User | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(ADMIN_USER_KEY) || sessionStorage.getItem(ADMIN_USER_KEY);
    return raw ? (JSON.parse(raw) as User) : null;
  } catch { return null; }
}
export function isAdminAuthenticated(): boolean {
  if (typeof window === "undefined") return false;
  return localStorage.getItem(ADMIN_AUTH_KEY) === "true" || sessionStorage.getItem(ADMIN_AUTH_KEY) === "true";
}

// ── User auth ─────────────────────────────────────────────
export function userLogin(email: string, password: string, remember = false): User | null {
  if (email === MOCK_USER_CREDENTIALS.email && password === MOCK_USER_CREDENTIALS.password) {
    const s = remember ? localStorage : sessionStorage;
    s.setItem(USER_AUTH_KEY, "true");
    s.setItem(USER_USER_KEY, JSON.stringify(MOCK_USER));
    setCookie(USER_AUTH_KEY, "true", remember ? 30 : 1);
    return MOCK_USER;
  }
  return null;
}
export function userLogout(): void {
  [localStorage, sessionStorage].forEach(s => {
    s.removeItem(USER_AUTH_KEY);
    s.removeItem(USER_USER_KEY);
  });
  deleteCookie(USER_AUTH_KEY);
}
export function getUserUser(): User | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(USER_USER_KEY) || sessionStorage.getItem(USER_USER_KEY);
    return raw ? (JSON.parse(raw) as User) : null;
  } catch { return null; }
}
export function isUserAuthenticated(): boolean {
  if (typeof window === "undefined") return false;
  return localStorage.getItem(USER_AUTH_KEY) === "true" || sessionStorage.getItem(USER_AUTH_KEY) === "true";
}

// ── Legacy aliases (keeps existing admin portal working) ──
export const login          = adminLogin;
export const logout         = adminLogout;
export const getUser        = getAdminUser;
export const isAuthenticated = isAdminAuthenticated;
