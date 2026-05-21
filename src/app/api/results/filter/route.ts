import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const category = searchParams.get("category");
  const competition = searchParams.get("competition");

  const results = await prisma.result.findMany({
    where: {
      category: category
        ? { name: category }
        : undefined,
      competition: competition
        ? { name: competition }
        : undefined,
    },
    include: {
      winners: { include: { team: true } },
      category: true,
      competition: true,
    },
  });

  return NextResponse.json(results);
}