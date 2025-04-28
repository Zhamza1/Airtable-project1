import { base } from "@/utils/airtable";
import { NextResponse } from "next/server";

type Fields = {
  text: string;
  project: string[];
  admin: string[];
};

export async function GET() {
  try {
    const records = await base<Fields>("Comment")
      .select({ view: "Grid view" })
      .all();
    const comments = records.map((r) => ({
      id: r.id,
      text: r.fields.text,
      project: r.fields.project,
      admin: r.fields.admin,
    }));
    return NextResponse.json(comments);
  } catch (error) {
    console.error("GET /api/comment error:", error);
    return NextResponse.json(
      { message: "Impossible de récupérer les commentaires." },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const { text, project, admin } = await req.json();

    const missing: string[] = [];
    if (!text || typeof text !== "string") missing.push("text");
    if (!Array.isArray(project) || project.length === 0)
      missing.push("project");
    if (!Array.isArray(admin) || admin.length === 0) missing.push("admin");
    if (missing.length > 0) {
      return NextResponse.json(
        { message: `Champs manquants ou invalides: ${missing.join(", ")}` },
        { status: 400 }
      );
    }

    const [created] = await base<Fields>("Comment").create([
      {
        fields: {
          text,
          project,
          admin,
        },
      },
    ]);

    const comment = {
      id: created.id,
      text: created.fields.text,
      project: created.fields.project,
      admin: created.fields.admin,
    };

    return NextResponse.json(comment, { status: 201 });
  } catch (error) {
    console.error("POST /api/comment error:", error);
    return NextResponse.json(
      { message: "Impossible de créer le commentaire." },
      { status: 500 }
    );
  }
}
