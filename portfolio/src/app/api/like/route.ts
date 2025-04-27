import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { base } from "@/utils/airtable";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ message: "Non autorisé" }, { status: 401 });
  }

  const { projectId } = await req.json();
  const userEmail = session.user?.email;

  if (!projectId || !userEmail) {
    return NextResponse.json({ message: "Données manquantes" }, { status: 400 });
  }

  try {
    const record = await base("Project").find(projectId);

    const currentLikes = record.fields.likes || 0;
    const currentLikedBy = record.fields.liked_by
      ? record.fields.liked_by.split(",")
      : [];

    if (currentLikedBy.includes(userEmail)) {
      return NextResponse.json({ message: "Vous avez déjà liké ce projet" }, { status: 400 });
    }

    await base("Project").update([
      {
        id: projectId,
        fields: {
          likes: currentLikes + 1,
          liked_by: [...currentLikedBy, userEmail].join(","),
        },
      },
    ]);

    return NextResponse.json({ message: "Like enregistré avec succès !" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Erreur serveur" }, { status: 500 });
  }
}
