"use client";
import useQuizStore from "../lib/quizStore";

const scenarios: { id: string; title: string; desc: string }[] = [
  {
    id: "students",
    title: "学生のあなた",
    desc: "学費や奨学金、将来の就職が気になる…",
  },
  {
    id: "workers",
    title: "社会人のあなた",
    desc: "給料、働き方改革、子育て支援などが気になる…",
  },
  {
    id: "parents",
    title: "子育て中のあなた",
    desc: "保育園や教育費、将来の社会保障が気になる…",
  },
  {
    id: "seniors",
    title: "シニアのあなた",
    desc: "年金や医療・介護、終活が気になる…",
  },
];

export default function ScenarioWarmup() {
  const setScenario = useQuizStore((s) => s.setScenario);
  const setPhase = useQuizStore((s) => s.setPhase);

  const handleSelect = (id: string) => {
    setScenario(id);
    setPhase("quiz");
  };

  return (
    <section className="flex flex-col items-center gap-6 py-10 w-full max-w-lg mx-auto">
      <h2 className="text-xl font-semibold text-center px-4">
        あなたに近いシーンを<br className="sm:hidden" /> 選んでみましょう
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full px-4">
        {scenarios.map((s) => (
          <button
            key={s.id}
            onClick={() => handleSelect(s.id)}
            className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-800/70 p-4 shadow hover:shadow-md hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition text-left"
          >
            <h3 className="font-medium mb-1 text-gray-800 dark:text-gray-100">
              {s.title}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-snug">
              {s.desc}
            </p>
          </button>
        ))}
      </div>
    </section>
  );
}
