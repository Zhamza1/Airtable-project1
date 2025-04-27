import { NextResponse } from "next/server";
import { base } from "@/utils/airtable";

type Fields = {
    firstName: string;
    lastName: string;
    email: string;
    promotion: string;
};

interface Student extends Fields {
    id: string;
}

export async function GET() {
    try {
        const records = await base<Fields>("Student")
            .select({ view: "Grid view" })
            .all();

        const students: Student[] = records.map((r) => ({
            id: r.id,
            ...r.fields,
        }));

        console.log(students);
        return NextResponse.json(students);
    } catch (err) {
        console.error("GET /api/students error:", err);
        return NextResponse.json(
            { message: "Impossible de récupérer les étudiants" },
            { status: 500 }
        );
    }
}

export async function POST(req: Request) {
    const { firstName, lastName, email, promotion } =
        (await req.json()) as Fields;

    try {
        const [created] = await base<Fields>("Student").create([
            { fields: { firstName, lastName, email, promotion } },
        ]);

        return NextResponse.json(
            { id: created.id, ...created.fields },
            { status: 201 }
        );
    } catch (err: any) {
        console.error("Airtable create error:", err);
        return NextResponse.json(
            { message: err.message || "Erreur non identifiée" },
            { status: 500 }
        );
    }
}
