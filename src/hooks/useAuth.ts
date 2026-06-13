"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  adminLogin, adminLogout, getAdminUser, isAdminAuthenticated,
  userLogin, userLogout, getUserUser, isUserAuthenticated,
} from "@/lib/auth";
import type { User } from "@/types/auth";

export function useAdminAuth() {
  const [user, setUser]     = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => { setUser(getAdminUser()); setLoading(false); }, []);

  const signIn = useCallback((email: string, password: string, remember = false) => {
    const r = adminLogin(email, password, remember);
    if (r) setUser(r);
    return !!r;
  }, []);

  const signOut = useCallback(() => {
    adminLogout(); setUser(null); router.push("/admin-login");
  }, [router]);

  return { user, loading, isAuthenticated: isAdminAuthenticated(), signIn, signOut };
}

export function useUserAuth() {
  const [user, setUser]     = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => { setUser(getUserUser()); setLoading(false); }, []);

  const signIn = useCallback((email: string, password: string, remember = false) => {
    const r = userLogin(email, password, remember);
    if (r) setUser(r);
    return !!r;
  }, []);

  const signOut = useCallback(() => {
    userLogout(); setUser(null); router.push("/");
  }, [router]);

  return { user, loading, isAuthenticated: isUserAuthenticated(), signIn, signOut };
}

// Legacy alias — keeps existing admin portal components working
export const useAuth = useAdminAuth;
