"use server";

import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const adminCookieName = "portfolio-admin-session";
const sessionLifetimeSeconds = 60 * 60 * 8;

type LoginState = {
  error: string | null;
};

function getSessionToken() {
  const password = process.env.ADMIN_PASSWORD;
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!password || !secret) return null;

  const expiresAt = Math.floor(Date.now() / 1000) + sessionLifetimeSeconds;
  const payload = `${expiresAt}`;
  const signature = createHmac("sha256", secret).update(payload).digest("hex");
  return `${payload}.${signature}`;
}

function isValidSession(value: string | undefined) {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret || !value) return false;

  const [expiresAt, signature] = value.split(".");
  if (!expiresAt || !signature || Number(expiresAt) < Math.floor(Date.now() / 1000)) return false;

  const expected = createHmac("sha256", secret).update(expiresAt).digest("hex");
  const actualBuffer = Buffer.from(signature, "hex");
  const expectedBuffer = Buffer.from(expected, "hex");

  return actualBuffer.length === expectedBuffer.length && timingSafeEqual(actualBuffer, expectedBuffer);
}

export async function loginAdmin(_: LoginState, formData: FormData): Promise<LoginState> {
  const password = process.env.ADMIN_PASSWORD;
  const submittedPassword = formData.get("password");

  if (!password || !process.env.ADMIN_SESSION_SECRET) {
    return { error: "Admin access is not configured. Add ADMIN_PASSWORD and ADMIN_SESSION_SECRET." };
  }

  if (typeof submittedPassword !== "string" || submittedPassword !== password) {
    return { error: "That password is not correct." };
  }

  const token = getSessionToken();
  if (!token) return { error: "Admin access is not configured." };

  const cookieStore = await cookies();
  cookieStore.set(adminCookieName, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: sessionLifetimeSeconds,
    path: "/admin",
  });

  redirect("/admin");
}

export async function logoutAdmin() {
  const cookieStore = await cookies();
  cookieStore.delete(adminCookieName);
  redirect("/admin/login");
}

export async function hasAdminSession() {
  const cookieStore = await cookies();
  return isValidSession(cookieStore.get(adminCookieName)?.value);
}
