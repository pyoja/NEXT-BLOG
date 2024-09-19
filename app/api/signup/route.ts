// app/api/signup/route.ts
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  const { id, name, password } = await request.json();

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.tbl_user.create({
      data: {
        id,
        name,
        password: hashedPassword,
      },
    });
    return NextResponse.json(
      { message: "User created successfully" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ error: "Error creating user" }, { status: 500 });
  }
}
