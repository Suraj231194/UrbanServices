// @ts-nocheck
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? process.env.VITE_SUPABASE_URL;
const SUPABASE_PUBLISHABLE_KEY =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ?? process.env.VITE_SUPABASE_PUBLISHABLE_KEY;

export const isSupabaseConfigured = Boolean(SUPABASE_URL && SUPABASE_PUBLISHABLE_KEY);

const MOCK_USERS_KEY = "urbannest_mock_users";
const MOCK_SESSION_KEY = "urbannest_mock_session";

const authListeners = new Set<(event: string, session: unknown) => void>();

function readStorage<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function writeStorage<T>(key: string, value: T) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // ignore storage failures in fallback mode
  }
}

function getMockSession() {
  return readStorage(MOCK_SESSION_KEY, null);
}

function setMockSession(session: unknown) {
  writeStorage(MOCK_SESSION_KEY, session);
  const event = session ? "SIGNED_IN" : "SIGNED_OUT";
  authListeners.forEach((listener) => listener(event, session));
}

function getMockUsers() {
  return readStorage<Array<{ id: string; email: string; password: string; fullName?: string; phone?: string }>>(
    MOCK_USERS_KEY,
    [],
  );
}

function setMockUsers(users: Array<{ id: string; email: string; password: string; fullName?: string; phone?: string }>) {
  writeStorage(MOCK_USERS_KEY, users);
}

const mockSupabase = {
  auth: {
    async getSession() {
      return {
        data: { session: getMockSession() },
        error: null,
      };
    },

    async signInWithPassword({ email, password }: { email: string; password: string }) {
      const users = getMockUsers();
      const user = users.find(
        (entry) => entry.email.toLowerCase() === String(email).trim().toLowerCase() && entry.password === password,
      );

      if (!user) {
        return {
          data: { user: null, session: null },
          error: { message: "Invalid login credentials" },
        };
      }

      const session = {
        access_token: "mock-access-token",
        refresh_token: "mock-refresh-token",
        user: {
          id: user.id,
          email: user.email,
          user_metadata: {
            full_name: user.fullName ?? "",
            phone: user.phone ?? "",
          },
        },
      };

      setMockSession(session);

      return {
        data: { user: session.user, session },
        error: null,
      };
    },

    async signUp({
      email,
      password,
      options,
    }: {
      email: string;
      password: string;
      options?: { data?: { full_name?: string; phone?: string } };
    }) {
      const normalizedEmail = String(email).trim().toLowerCase();
      const users = getMockUsers();
      const existing = users.find((entry) => entry.email === normalizedEmail);

      if (existing) {
        return {
          data: { user: null, session: null },
          error: { message: "User already registered" },
        };
      }

      const user = {
        id: `mock-${Date.now()}`,
        email: normalizedEmail,
        password,
        fullName: options?.data?.full_name ?? "",
        phone: options?.data?.phone ?? "",
      };

      setMockUsers([...users, user]);

      return {
        data: {
          user: {
            id: user.id,
            email: user.email,
            user_metadata: {
              full_name: user.fullName,
              phone: user.phone,
            },
          },
          session: null,
        },
        error: null,
      };
    },

    async signOut() {
      setMockSession(null);
      return { error: null };
    },

    onAuthStateChange(callback: (event: string, session: unknown) => void) {
      authListeners.add(callback);
      callback("INITIAL_SESSION", getMockSession());

      return {
        data: {
          subscription: {
            unsubscribe() {
              authListeners.delete(callback);
            },
          },
        },
      };
    },
  },
};

export const supabase = isSupabaseConfigured
  ? createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
      auth: {
        storage: typeof window !== "undefined" ? window.localStorage : undefined,
        persistSession: true,
        autoRefreshToken: true,
      },
    })
  : mockSupabase;
