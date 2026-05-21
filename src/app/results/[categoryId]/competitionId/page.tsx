import { prisma } from "@/lib/prisma";

export async function generateMetadata({ params }: { params: { categoryId: string; competitionId: string } }) {
  const result = await prisma.result.findFirst({
    where: {
      categoryId: Number(params.categoryId),
      competitionId: Number(params.competitionId),
    },
    include: {
      competition: true,
    },
  });

  return {
    title: result ? result.competition.name : "Results",
  };
}

export default async function ResultPage({
  params,
}: {
  params: { categoryId: string; competitionId: string };
}) {
  const result = await prisma.result.findFirst({
    where: {
      categoryId: Number(params.categoryId),
      competitionId: Number(params.competitionId),
    },
    include: {
      winners: {
        include: {
          team: true,
        },
        orderBy: {
          position: "asc",
        },
      },
      competition: true,
      category: true,
    },
  });

  if (!result) {
    return (
      <div className="p-6">
        <h1 className="text-xl font-bold">No Result Published</h1>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold text-center mb-2">
        🏆 {result.competition.name}
      </h1>

      <p className="text-center text-gray-600 mb-6">
        {result.category.name}
      </p>

      <div className="space-y-4">
        {result.winners.map((w) => (
          <div
            key={w.id}
            className="p-4 border rounded flex justify-between"
          >
            <div>
              <p className="font-semibold">{w.name}</p>
              <p className="text-sm text-gray-500">
                {w.team.name}
              </p>
            </div>

            <div className="font-bold">
              {w.position === "1"
                ? "🥇 1st"
                : w.position === "2"
                ? "🥈 2nd"
                : w.position === "3"
                ? "🥉 3rd"
                : `${w.position}`}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}