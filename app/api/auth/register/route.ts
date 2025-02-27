import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const hashedPassword = bcrypt.hashSync(body.password, 8);

    const user = await prisma.user.create({
      data: { ...body, password: hashedPassword },
    });

    return NextResponse.json(user);
  } catch (error) {
    if (error instanceof Error) {
      console.log("Error: ", error.stack);
    }

    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred";

    return NextResponse.json({ message: errorMessage }, { status: 500 });
  }
}
