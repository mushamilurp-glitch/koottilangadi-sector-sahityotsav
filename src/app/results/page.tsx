import Link from "next/link";
import { prisma } from "@/lib/prisma";

export const metadata = {
  title: "Results",
};

export default async function ResultsHome() {
  const categories = await prisma.category.findMany({
    orderBy: { name: "asc" },
  });

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">
        🎉 Live Results
      </h1>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {categories.map((c) => (
          <Link
            key={c.id}
            href={`/results/${c.id}`}
            className="p-4 border rounded-lg hover:bg-gray-100"
          >
            {c.name}
          </Link>
        ))}
      </div>
    </div>
  );
}