import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { verifyPassword, signAdminToken, SESSION_COOKIE_NAME, ensureDefaultAdmin } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    await ensureDefaultAdmin();

    const body = await req.json();
    const { username, password } = body;

    if (!username || !password) {
      return NextResponse.json(
        { error: "Nom d'utilisateur et mot de passe requis." },
        { status: 400 }
      );
    }

    const admin = await prisma.admin.findUnique({
      where: { username: username.trim() },
    });

    if (!admin) {
      return NextResponse.json(
        { error: "Identifiants invalides." },
        { status: 401 }
      );
    }

    const isValid = verifyPassword(password, admin.salt, admin.passwordHash);
    if (!isValid) {
      return NextResponse.json(
        { error: "Identifiants invalides." },
        { status: 401 }
      );
    }

    const token = await signAdminToken({ id: admin.id, username: admin.username });

    const response = NextResponse.json({
      success: true,
      user: { id: admin.id, username: admin.username },
    });

    response.cookies.set({
      name: SESSION_COOKIE_NAME,
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "Erreur serveur lors de la connexion." },
      { status: 500 }
    );
  }
}
