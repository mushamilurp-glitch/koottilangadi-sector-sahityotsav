"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

type Competition = {
  id: number;
  name: string;
};

type Category = {
  id: number;
  name: string;
  competitions: Competition[];
};

type Winner = {
  id: number;
  name: string;
  position: string;
  team: {
    id: number;
    name: string;
  };
};

type ResultCard = {
  id: number;
  createdAt: string;
  category: { id: number; name: string };
  competition: { id: number; name: string };
  winners: Winner[];
};

type ResultsExplorerProps = {
  categories: Category[];
  latestResults: ResultCard[];
};

function formatResultDate(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export default function ResultsExplorer({ categories, latestResults }: ResultsExplorerProps) {
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>("");
  const [selectedCompetitionId, setSelectedCompetitionId] = useState<string>("");

  const selectedCategory = useMemo(
    () => categories.find((category) => category.id.toString() === selectedCategoryId),
    [categories, selectedCategoryId]
  );

  const competitionOptions = selectedCategory?.competitions ?? [];

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategoryId(categoryId);
    setSelectedCompetitionId("");
  };

  return (
    <div className="space-y-8">
      <section className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-6">
          <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Results Explorer</p>
          <h1 className="mt-2 text-3xl font-semibold text-slate-900">Find competition winners</h1>
          <p className="mt-2 text-sm text-slate-600">
            Select a category first, then choose the competition to view the latest published result.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <label className="space-y-2">
            <span className="text-sm font-medium text-slate-700">Category</span>
            <select
              value={selectedCategoryId}
              onChange={(event) => handleCategoryChange(event.target.value)}
              className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-slate-500"
            >
              <option className="text-slate-900" value="">Choose a category</option>
              {categories.map((category) => (
                <option className="text-slate-900" key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </label>

          <label className="space-y-2">
            <span className="text-sm font-medium text-slate-700">Competition</span>
            <select
              value={selectedCompetitionId}
              onChange={(event) => setSelectedCompetitionId(event.target.value)}
              disabled={!selectedCategoryId}
              className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-slate-500 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <option className="text-slate-900" value="">Choose a competition</option>
              {competitionOptions.map((competition) => (
                <option className="text-slate-900" key={competition.id} value={competition.id}>
                  {competition.name}
                </option>
              ))}
            </select>
          </label>
        </div>

        {selectedCategory && selectedCompetitionId ? (
          <div className="mt-6 rounded-3xl border border-slate-200 bg-slate-50 p-5">
            <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Ready to view</p>
            <h2 className="mt-2 text-xl font-semibold text-slate-900">
              {selectedCategory.name} — {competitionOptions.find((item) => item.id.toString() === selectedCompetitionId)?.name}
            </h2>
            <p className="mt-3 text-sm text-slate-600">
              Click below to open the published winners for this competition.
            </p>
            <Link
              href={`/results/${selectedCategory.id}/${selectedCompetitionId}`}
              className="mt-4 inline-flex rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-700"
            >
              View Result
            </Link>
          </div>
        ) : (
          <div className="mt-6 rounded-3xl border border-slate-200 bg-slate-50 p-5 text-slate-600">
            Select a category and competition to see the published result.
          </div>
        )}
      </section>

      <section className="space-y-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Latest updates</p>
            <h2 className="mt-2 text-2xl font-semibold text-slate-900">Recently published results</h2>
          </div>
          <p className="max-w-xl text-sm text-slate-600">
            The most recently published competition results appear here as quick-access cards.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {latestResults.length > 0 ? (
            latestResults.map((result) => (
              <Link
                key={result.id}
                href={`/results/${result.category.id}/${result.competition.id}`}
                className="rounded-[32px] border border-slate-200 bg-white p-5 text-left transition hover:-translate-y-0.5 hover:shadow-lg"
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-slate-600">
                    {result.category.name}
                  </span>
                  <span className="text-xs text-slate-500">{formatResultDate(result.createdAt)}</span>
                </div>
                <h3 className="mt-4 text-xl font-semibold text-slate-900">{result.competition.name}</h3>
                <p className="mt-2 text-sm text-slate-600">Top winners for this competition are listed below.</p>
                <div className="mt-4 space-y-3">
                  {result.winners.slice(0, 3).map((winner) => (
                    <div key={winner.id} className="rounded-3xl bg-slate-50 p-4">
                      <p className="font-semibold text-slate-900">{winner.name}</p>
                      <p className="text-sm text-slate-500">
                        {winner.team.name} · {winner.position === "1" ? "🥇 1st" : winner.position === "2" ? "🥈 2nd" : winner.position === "3" ? "🥉 3rd" : `${winner.position}`}
                      </p>
                    </div>
                  ))}
                </div>
              </Link>
            ))
          ) : (
            <div className="rounded-[32px] border border-slate-200 bg-slate-50 p-6 text-slate-600">
              No recent results are available yet.
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
