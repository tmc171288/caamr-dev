import { deleteCookie, getCookies, setCookie } from "$std/http/cookie.ts";

const SESSION_COOKIE_NAME = "admin_session";
const SESSION_TOKEN = crypto.randomUUID();

export function getAdminPassword(): string {
  return Deno.env.get("ADMIN_PASSWORD") || "cam987806@1712";
}

export function verifyPassword(password: string): boolean {
  return password === getAdminPassword();
}

export function createSession(headers: Headers): string {
  const token = crypto.randomUUID();
  setCookie(headers, {
    name: SESSION_COOKIE_NAME,
    value: token,
    path: "/",
    httpOnly: true,
    secure: false,
    sameSite: "Lax",
    maxAge: 60 * 60 * 24,
  });
  return token;
}

export function deleteSession(headers: Headers): void {
  deleteCookie(headers, SESSION_COOKIE_NAME, { path: "/" });
}

const activeSessions = new Set<string>();

export function addSession(token: string): void {
  activeSessions.add(token);
}

export function removeSession(token: string): void {
  activeSessions.delete(token);
}

export function isValidSession(req: Request): boolean {
  const cookies = getCookies(req.headers);
  const token = cookies[SESSION_COOKIE_NAME];
  return token ? activeSessions.has(token) : false;
}

export function getSessionToken(req: Request): string | undefined {
  const cookies = getCookies(req.headers);
  return cookies[SESSION_COOKIE_NAME];
}
