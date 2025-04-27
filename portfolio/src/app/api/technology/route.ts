import { NextResponse } from "next/server";
import { base } from "@/utils/airtable";

interface Technology {
    id: string;
    name: string;
}
type Fields = { name: string };

export async function GET() {
    try {
        const airtableRecords = await base<Fields>("Technologies")
            .select({ view: "Grid view" })
            .all();
        const technologies: Technology[] = airtableRecords.map((r) => ({
            id: r.id,
            name: r.fields.name,
        }));
        return NextResponse.json(technologies);
    } catch (err) {
        console.error("GET /api/technologies error:", err);
        return NextResponse.json(
            { message: "Impossible de récupérer les technologies." },
            { status: 500 }
        );
    }
}

export async function POST(req: Request) {
    const { name } = await req.json();
    if (!name) {
        return NextResponse.json(
            { message: "Le nom de la technologie est requis." },
            { status: 400 }
        );
    }
    try {
        const [created] = await base<Fields>("Technologies").create([
            { fields: { name } },
        ]);
        return NextResponse.json(
            { id: created.id, name: created.fields.name },
            { status: 201 }
        );
    } catch (err) {
        console.error("POST /api/technologies error:", err);
        return NextResponse.json(
            { message: "Impossible de créer la technologie." },
            { status: 500 }
        );
    }
}
