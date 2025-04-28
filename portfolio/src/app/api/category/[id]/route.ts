import { NextResponse } from "next/server";
import { base } from "@/utils/airtable";
import {getCategoryByName} from "@/lib/api";

type Fields = { name: string };

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
    const { id } = params;
    const { name } = await req.json();
    if (!name) {
        return NextResponse.json(
            { message: "Le nom de la catégorie est requis." },
            { status: 400 }
        );
    }

    const existing = await getCategoryByName(name);
    if (existing && existing.id !== id) {
        return NextResponse.json(
            { message: "Cette catégorie existe déjà." },
            { status: 400 }
        );
    }

    try {
        const [updated] = await base<Fields>("Category").update([
            { id, fields: { name } },
        ]);
        return NextResponse.json(
            { id: updated.id, name: updated.fields.name },
            { status: 200 }
        );
    } catch (err) {
        console.error("PATCH /api/category/[id] error:", err);
        return NextResponse.json(
            { message: "Impossible de mettre à jour la catégorie." },
            { status: 500 }
        );
    }
}

export async function DELETE(_req: Request, { params }: { params: { id: string } }) {
    const { id } = params;
    try {
        await base("Category").destroy([id]);
        return NextResponse.json(
            { message: "Catégorie supprimée.", id },
            { status: 200 }
        );
    } catch (err) {
        console.error(`DELETE /api/category/${id} error:`, err);
        return NextResponse.json(
            { message: "Impossible de supprimer la catégorie." },
            { status: 500 }
        );
    }
}
