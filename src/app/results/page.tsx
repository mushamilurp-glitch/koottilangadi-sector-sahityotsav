import { prisma } from "@/lib/prisma";
import ResultsExplorer from "@/components/ResultsExplorer";

export const metadata = {
  title: "Results",
};

export default async function ResultsHome() {
  const categories = await prisma.category.findMany({
    include: {
      competitions: {
        orderBy: {
          name: "asc",
        },
      },
    },
    orderBy: {
      name: "asc",
    },
  });

  const latestResultsRaw = await prisma.result.findMany({
    where: {
      published: true,
    },
    include: {
      competition: true,
      category: true,
      winners: {
        include: {
          team: true,
        },
        orderBy: {
          position: "asc",
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 4,
  });

  const latestResults = latestResultsRaw.map((result) => ({
    ...result,
    createdAt: result.createdAt.toISOString(),
  }));

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-8">
      <header className="space-y-3">
        <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Live results</p>
        <h1 className="text-4xl font-semibold tracking-tight text-slate-900">
          🎉 Explore competition results
        </h1>
        <p className="max-w-2xl text-sm leading-7 text-slate-600">
          Select a category and then choose the competition to view the published winners. The latest updated results are shown below for quick access.
        </p>
      </header>

      <ResultsExplorer categories={categories} latestResults={latestResults} />
    </div>
  );
}
