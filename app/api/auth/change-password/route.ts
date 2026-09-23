import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getSession, verifyPassword, hashPassword, generateSalt } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }

    const { currentPassword, newPassword } = await req.json();

    if (!currentPassword || !newPassword) {
      return NextResponse.json(
        { error: "Veuillez fournir le mot de passe actuel et le nouveau." },
        { status: 400 }
      );
    }

    if (newPassword.length < 6) {
      return NextResponse.json(
        { error: "Le mot de passe doit comporter au moins 6 caractères." },
        { status: 400 }
      );
    }

    const admin = await prisma.admin.findUnique({
      where: { id: session.id },
    });

    if (!admin) {
      return NextResponse.json({ error: "Compte introuvable" }, { status: 404 });
    }

    const isValid = verifyPassword(currentPassword, admin.salt, admin.passwordHash);
    if (!isValid) {
      return NextResponse.json(
        { error: "Le mot de passe actuel est incorrect." },
        { status: 400 }
      );
    }

    const newSalt = generateSalt();
    const newHash = hashPassword(newPassword, newSalt);

    await prisma.admin.update({
      where: { id: session.id },
      data: {
        passwordHash: newHash,
        salt: newSalt,
      },
    });

    return NextResponse.json({ success: true, message: "Mot de passe mis à jour avec succès." });
  } catch (error) {
    console.error("Change password error:", error);
    return NextResponse.json(
      { error: "Erreur serveur lors du changement de mot de passe." },
      { status: 500 }
    );
  }
}
