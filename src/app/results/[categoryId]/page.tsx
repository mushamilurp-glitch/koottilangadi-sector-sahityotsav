import Link from "next/link";
import { prisma } from "@/lib/prisma";

export async function generateMetadata({ params }: { params: { categoryId: string } }) {
  const category = await prisma.category.findUnique({
    where: { id: Number(params.categoryId) },
  });

  return {
    title: category ? `${category.name} Results` : "Results",
  };
}

export default async function CategoryPage({
  params,
}: {
  params: { categoryId: string };
}) {
  const category = await prisma.category.findUnique({
    where: { id: Number(params.categoryId) },
    include: {
      competitions: true,
    },
  });

  if (!category) {
    return <div>Category not found</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">
        {category.name} Competitions
      </h1>

      <div className="grid gap-3">
        {category.competitions.map((comp) => (
          <Link
            key={comp.id}
            href={`/results/${category.id}/${comp.id}`}
            className="p-3 border rounded hover:bg-gray-100"
          >
            {comp.name}
          </Link>
        ))}
      </div>
    </div>
  );
}