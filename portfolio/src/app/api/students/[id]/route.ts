import { NextResponse } from "next/server";
import { base } from "@/utils/airtable";
import {getStudentByEmail} from "@/lib/api";

type Fields = {
    firstName: string;
    lastName: string;
    email: string;
    promotion: string;
};

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
    const { id } = params;
    const { firstName, lastName, email, promotion } = await req.json() as Fields;

    if (!firstName || !lastName || !email || !promotion) {
        return NextResponse.json(
            { message: "Tous les champs sont requis." },
            { status: 400 }
        );
    }

    const existing = await getStudentByEmail(email);
    if (existing && existing.id !== id) {
        return NextResponse.json(
            { message: "Cet email est déjà utilisé par un autre étudiant." },
            { status: 400 }
        );
    }

    try {
        const [updated] = await base<Fields>("Student").update([
            { id, fields: { firstName, lastName, email, promotion } },
        ]);
        return NextResponse.json(
            { id: updated.id, ...updated.fields },
            { status: 200 }
        );
    } catch (err) {
        console.error("PATCH /api/students/[id] error:", err);
        return NextResponse.json(
            { message: "Impossible de mettre à jour l'étudiant." },
            { status: 500 }
        );
    }
}

export async function DELETE(_req: Request, { params }: { params: { id: string } }) {
    const { id } = params;
    try {
        await base("Student").destroy([id]);
        return NextResponse.json(
            { message: "Étudiant supprimé", id },
            { status: 200 }
        );
    } catch (err) {
        console.error(`DELETE /api/students/${id} error:`, err);
        return NextResponse.json(
            { message: "Impossible de supprimer l'étudiant" },
            { status: 500 }
        );
    }
}
