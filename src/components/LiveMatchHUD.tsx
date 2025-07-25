"use client";
import useQuizStore from "../lib/quizStore";
import partiesData from "../../data/parties.json" assert { type: "json" };

interface PartyInfo {
  id: string;
  name: string;
  color: string;
}

const parties: PartyInfo[] = partiesData as PartyInfo[];

export default function LiveMatchHUD() {
  const { scores, questions, responses } = useQuizStore();

  const answered = Object.keys(responses).length;
  const progress = answered / questions.length;

  const sorted = parties
    .map((p) => [p.id, scores[p.id] ?? 0] as [string, number])
    .sort((a, b) => b[1] - a[1]);

  const getParty = (id: string) => parties.find((p) => p.id === id);

  return (
    <aside className="w-full rounded-lg bg-white/90 backdrop-blur border border-gray-200 shadow p-4">
      <div className="mb-2 text-xs text-gray-600 text-center">
        進捗 {answered}/{questions.length} ({Math.round(progress * 100)}%)
      </div>
      <div className="space-y-2">
        {sorted.map(([id, score]) => {
          const party = getParty(id);
          if (!party) return null;
          return (
            <div key={id} className="flex items-center gap-2">
              <span className="inline-block w-14 text-xs font-semibold" style={{ color: party.color }}>
                {party.name}
              </span>
              <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full transition-all duration-500"
                  style={{ width: `${score}%`, backgroundColor: party.color }}
                />
              </div>
              <span className="w-10 text-xs text-right">{score}%</span>
            </div>
          );
        })}
      </div>
    </aside>
  );
}
