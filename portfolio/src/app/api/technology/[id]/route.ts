import { NextResponse } from "next/server";
import { base } from "@/utils/airtable";
import {getTechnologyByName} from "@/lib/api";

type Fields = { name: string };

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
    const { id } = params;
    const { name } = await req.json();
    if (!name) {
        return NextResponse.json(
            { message: "Le nom de la technologie est requis." },
            { status: 400 }
        );
    }

    const existing = await getTechnologyByName(name);
    if (existing && existing.id !== id) {
        return NextResponse.json(
            { message: "Cette technologie existe déjà." },
            { status: 400 }
        );
    }

    try {
        const [updated] = await base<Fields>("Technologies").update([
            { id, fields: { name } },
        ]);
        return NextResponse.json(
            { id: updated.id, name: updated.fields.name },
            { status: 200 }
        );
    } catch (err) {
        console.error("PATCH /api/technology/[id] error:", err);
        return NextResponse.json(
            { message: "Impossible de mettre à jour la technologie." },
            { status: 500 }
        );
    }
}

export async function DELETE(_req: Request, { params }: { params: { id: string } }) {
    const { id } = params;
    try {
        await base("Technologies").destroy([id]);
        return NextResponse.json(
            { message: "Technologie supprimée.", id },
            { status: 200 }
        );
    } catch (err) {
        console.error(`DELETE /api/technology/${id} error:`, err);
        return NextResponse.json(
            { message: "Impossible de supprimer la technologie." },
            { status: 500 }
        );
    }
}
