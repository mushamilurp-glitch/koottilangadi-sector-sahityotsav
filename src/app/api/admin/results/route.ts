import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const body = await req.json();

  const { categoryId, competitionId, winners, posterUrl } = body;

  const result = await prisma.result.create({
    data: {
      categoryId,
      competitionId,
      posterUrl,
      winners: {
        create: winners.map((w: any) => ({
          name: w.name,
          position: w.position,
          teamId: w.teamId,
        })),
      },
    },
    include: {
      winners: true,
    },
  });

  return NextResponse.json(result);
}