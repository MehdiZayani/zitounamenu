import crypto from "crypto";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import prisma from "./prisma";

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "zitouna_super_secret_jwt_key_2025_981273918237"
);

export const SESSION_COOKIE_NAME = "admin_session";

// Hash a password with salt using scrypt
export function hashPassword(password: string, salt: string): string {
  return crypto.scryptSync(password, salt, 64).toString("hex");
}

export function generateSalt(): string {
  return crypto.randomBytes(16).toString("hex");
}

export function verifyPassword(password: string, salt: string, hash: string): boolean {
  const calculatedHash = hashPassword(password, salt);
  return crypto.timingSafeEqual(Buffer.from(calculatedHash, "hex"), Buffer.from(hash, "hex"));
}

// Generate JWT token
export async function signAdminToken(payload: { id: string; username: string }) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(JWT_SECRET);
}

// Verify JWT token
export async function verifyAdminToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return payload as { id: string; username: string };
  } catch {
    return null;
  }
}

// Ensure default admin exists
export async function ensureDefaultAdmin() {
  const adminCount = await prisma.admin.count();
  if (adminCount === 0) {
    const defaultUsername = process.env.ADMIN_USERNAME || "admin";
    const defaultPassword = process.env.ADMIN_PASSWORD || "zitouna_admin_2025";
    const salt = generateSalt();
    const passwordHash = hashPassword(defaultPassword, salt);

    await prisma.admin.create({
      data: {
        username: defaultUsername,
        passwordHash,
        salt,
      },
    });
    console.log(`Default admin created with username: ${defaultUsername}`);
  }
}

// Get authenticated session in server context (Next.js App Router)
export async function getSession() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;
    if (!token) return null;

    const payload = await verifyAdminToken(token);
    if (!payload?.id) return null;

    const admin = await prisma.admin.findUnique({
      where: { id: payload.id },
      select: { id: true, username: true },
    });

    return admin;
  } catch {
    return null;
  }
}
