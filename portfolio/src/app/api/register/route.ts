import { getUserByEmail, registerAdmin } from "@/lib/api";
import bcrypt from "bcrypt";
import { NextApiResponse } from "next";
import { NextResponse } from "next/server";

export async function POST(req: Request, res: NextApiResponse) {
  const { email, name, password } = await req.json();

  if (!email || !name || !password) {
    return new NextResponse(
      JSON.stringify("Veuillez remplir tout les champs requis !"),
      {
        status: 400,
      }
    );
  }

  const user = await getUserByEmail(email);
  if (user) {
    return new NextResponse(JSON.stringify("Cet e-mail existe déjà"), {
      status: 400,
    });
  }

  try {
    const passwordHash = await bcrypt.hash(password, 10);
    const newUser = {
      email,
      name,
      password: passwordHash,
    };
    const createdUser = await registerAdmin(newUser);
    return new NextResponse(JSON.stringify("Inscritpion réussi !"), {
      status: 201,
    });
  } catch (error) {
    console.error("Error creating user:", error);
    return new NextResponse(JSON.stringify("Failed to create user"), {
      status: 500,
    });
  }
}
