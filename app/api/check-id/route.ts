import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  const { id } = await request.json();

  try {
    const existingUser = await prisma.tbl_user.findUnique({
      where: { id },
    });
    return NextResponse.json({ exists: !!existingUser });
  } catch (error) {
    return NextResponse.json(
      { error: "Error checking username" },
      { status: 500 }
    );
  }
}
