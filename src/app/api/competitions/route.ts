import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const categoryId = searchParams.get("categoryId");

  const competitions = await prisma.competition.findMany({
    where: categoryId
      ? { categoryId: Number(categoryId) }
      : undefined,
    orderBy: { name: "asc" },
  });

  return Response.json(competitions);
}