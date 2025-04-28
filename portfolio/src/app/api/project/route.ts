import { AirtableImageProps, Project } from "@/types/project";
import { base } from "@/utils/airtable";
import { NextResponse } from "next/server";

type Fields = {
  name: string;
  description: string;
  technology: string[];
  link: string;
  visuals: AirtableImageProps[];
  class: string;
  creator: string;
  student: string;
  category: string;
  comments?: string[];
};

export async function GET() {
  try {
    const records = await base<Fields>("Project")
      .select({ view: "Grid view" })
      .all();
    const projects: (Project & { id: string })[] = records.map((r) => ({
      id: r.id,
      name: r.fields.name,
      description: r.fields.description,
      technology: r.fields.technology,
      link: r.fields.link,
      visuals: r.fields.visuals,
      class: r.fields.class,
      creator: r.fields.creator,
      student: r.fields.student,
      category: r.fields.category,
      comments: r.fields.comments,
    }));
    return NextResponse.json(projects);
  } catch (error) {
    console.error("GET /api/project error:", error);
    return NextResponse.json(
      { message: "Impossible de récupérer les projets." },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  const payload = await req.json();
  const required = [
    "name",
    "description",
    "technology",
    "link",
    "visuals",
    "class",
    "creator",
    "student",
    "category",
  ];
  const missing = required.filter((key) => !(key in payload));
  if (missing.length > 0) {
    return NextResponse.json(
      { message: `Champs manquants: ${missing.join(", ")}` },
      { status: 400 }
    );
  }

  try {
    const [created] = await base<Fields>("Project").create([
      { fields: payload },
    ]);

    const project: Project & { id: string } = {
      id: created.id,
      name: created.fields.name,
      description: created.fields.description,
      technology: created.fields.technology,
      link: created.fields.link,
      visuals: created.fields.visuals,
      class: created.fields.class,
      creator: created.fields.creator,
      student: created.fields.student,
      category: created.fields.category,
      comments: created.fields.comments,
    };

    return NextResponse.json(project, { status: 201 });
  } catch (error) {
    console.error("POST /api/project error:", error);
    return NextResponse.json(
      { message: "Impossible de créer le projet." },
      { status: 500 }
    );
  }
}
