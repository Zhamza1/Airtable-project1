import { base } from "@/utils/airtable";
import { NextResponse } from "next/server";

export async function DELETE(
  _req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  try {
    await base("Project").destroy([id]);
    return NextResponse.json(
      { message: "Catégorie supprimée.", id },
      { status: 200 }
    );
  } catch (err) {
    console.error(`DELETE /api/category/${id} error:`, err);
    return NextResponse.json(
      { message: "Impossible de supprimer le projet." },
      { status: 500 }
    );
  }
}
