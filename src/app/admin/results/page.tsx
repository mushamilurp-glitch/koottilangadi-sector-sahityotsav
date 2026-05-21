"use client";

import { useEffect, useState } from "react";

export default function AddResultPage() {
  const [categories, setCategories] = useState([]);
  const [competitions, setCompetitions] = useState([]);
  const [teams, setTeams] = useState([]);

  const [categoryId, setCategoryId] = useState("");
  const [competitionId, setCompetitionId] = useState("");

  const [winners, setWinners] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/categories").then(res => res.json()).then(setCategories);
    fetch("/api/teams").then(res => res.json()).then(setTeams);
  }, []);

  useEffect(() => {
    if (categoryId) {
      fetch(`/api/competitions?categoryId=${categoryId}`)
        .then(res => res.json())
        .then(setCompetitions);
    }
  }, [categoryId]);

  const addWinner = () => {
    setWinners([...winners, { name: "", position: "", teamId: "" }]);
  };

  const updateWinner = (index: number, field: string, value: string) => {
    const updated = [...winners];
    updated[index][field] = value;
    setWinners(updated);
  };

  const submit = async () => {
    await fetch("/api/admin/results", {
      method: "POST",
      body: JSON.stringify({
        categoryId,
        competitionId,
        winners,
      }),
    });

    alert("Result added!");
  };

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Add Result</h1>

      {/* CATEGORY */}
      <select
        onChange={(e) => setCategoryId(e.target.value)}
        className="border p-2"
      >
        <option>Select Category</option>
        {categories.map((c: any) => (
          <option key={c.id} value={c.id}>
            {c.name}
          </option>
        ))}
      </select>

      {/* COMPETITION */}
      <select
        onChange={(e) => setCompetitionId(e.target.value)}
        className="border p-2 ml-2"
      >
        <option>Select Competition</option>
        {competitions.map((c: any) => (
          <option key={c.id} value={c.id}>
            {c.name}
          </option>
        ))}
      </select>

      {/* WINNERS */}
      <div className="mt-4">
        <button onClick={addWinner} className="bg-blue-500 text-white px-3 py-1">
          + Add Winner
        </button>

        {winners.map((w, i) => (
          <div key={i} className="flex gap-2 mt-2">
            <input
              placeholder="Name"
              className="border p-1"
              onChange={(e) => updateWinner(i, "name", e.target.value)}
            />

            <input
              placeholder="Position (1/2/3)"
              className="border p-1"
              onChange={(e) => updateWinner(i, "position", e.target.value)}
            />

            <select
              className="border p-1"
              onChange={(e) => updateWinner(i, "teamId", e.target.value)}
            >
              <option>Select Team</option>
              {teams.map((t: any) => (
                <option key={t.id} value={t.id}>
                  {t.name}
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>

      {/* SUBMIT */}
      <button
        onClick={submit}
        className="mt-4 bg-green-600 text-white px-4 py-2"
      >
        Submit Result
      </button>
    </div>
  );
}