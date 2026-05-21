import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { categoryId, competitionId, winners } = body;

    if (!categoryId || !competitionId || !winners) {
      return Response.json(
        { error: "Missing fields" },
        { status: 400 }
      );
    }

    const result = await prisma.result.create({
      data: {
        categoryId: Number(categoryId),
        competitionId: Number(competitionId),
        winners: {
          create: winners.map((w: any) => ({
            name: w.name,
            position: w.position,
            teamId: Number(w.teamId),
          })),
        },
      },
      include: {
        winners: true,
      },
    });

    return Response.json({
      success: true,
      result,
    });
  } catch (err) {
    console.error(err);

    return Response.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}