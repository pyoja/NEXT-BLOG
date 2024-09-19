// app/api/login/route.ts
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  const { id, password } = await request.json();

  try {
    const user = await prisma.tbl_user.findUnique({
      where: { id },
    });

    if (!user) {
      return NextResponse.json(
        { error: "사용자가 존재하지 않습니다." },
        { status: 401 }
      );
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json(
        { error: "비밀번호가 일치하지 않습니다." },
        { status: 401 }
      );
    }

    return NextResponse.json({ message: "로그인 성공" }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "로그인 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
