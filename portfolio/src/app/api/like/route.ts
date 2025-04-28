import { NextResponse } from "next/server";
import { base } from "@/utils/airtable";

export async function POST(req: Request) {
  const { projectId } = await req.json();
  if (!projectId) {
    return NextResponse.json(
        { message: "projectId manquant" },
        { status: 400 }
    );
  }

  try {
    const record = await base("Project").find(projectId);

    const currentLikes =
        typeof record.fields.likes === "number" ? record.fields.likes : 0;

    // Incrémente
    const [updated] = await base("Project").update([
      {
        id: projectId,
        fields: {
          likes: currentLikes + 1,
        },
      },
    ]);

    return NextResponse.json(
        {
          message: "Like pris en compte",
          likes: updated.fields.likes,
        },
        { status: 200 }
    );
  } catch (err) {
    console.error("POST /api/like error:", err);
    return NextResponse.json(
        { message: "Erreur serveur" },
        { status: 500 }
    );
  }
}
