import { NextResponse } from "next/server";
import { base } from "@/utils/airtable";
import {getCategoryByName} from "@/lib/api";

interface Category {
    id: string;
    name: string;
}
type Fields = { name: string };

export async function GET() {
    try {
        const airtableRecords = await base<Fields>("Category")
            .select({ view: "Grid view" })
            .all();
        const categories: Category[] = airtableRecords.map((r) => ({
            id: r.id,
            name: r.fields.name,
        }));
        return NextResponse.json(categories);
    } catch (err) {
        console.error("GET /api/category error:", err);
        return NextResponse.json(
            { message: "Impossible de récupérer les catégories." },
            { status: 500 }
        );
    }
}

export async function POST(req: Request) {
    const { name } = await req.json();
    if (!name) {
        return NextResponse.json(
            { message: "Le nom de la catégorie est requis." },
            { status: 400 }
        );
    }

    const existing = await getCategoryByName(name);
    if (existing) {
        return NextResponse.json(
            { message: "Cette catégorie existe déjà." },
            { status: 400 }
        );
    }

    try {
        const [created] = await base<Fields>("Category").create([
            { fields: { name } },
        ]);
        return NextResponse.json(
            { id: created.id, name: created.fields.name },
            { status: 201 }
        );
    } catch (err) {
        console.error("POST /api/category error:", err);
        return NextResponse.json(
            { message: "Impossible de créer la catégorie." },
            { status: 500 }
        );
    }
}
