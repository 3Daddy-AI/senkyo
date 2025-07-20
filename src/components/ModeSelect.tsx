"use client";
import useQuizStore from "../lib/quizStore";

export default function ModeSelect() {
  const setMode = useQuizStore((s) => s.setMode);
  const setPhase = useQuizStore((s) => s.setPhase);

  return (
    <section id="mode-select" className="flex flex-col items-center gap-6 py-8 w-full max-w-sm mx-auto">
      <h2 className="text-xl font-semibold">診断コースをお選びください</h2>
      <div className="flex flex-col gap-4 w-full">
        <button
          className="w-full rounded-lg bg-blue-600 text-white py-3 px-4 text-center shadow hover:bg-blue-700 transition-colors"
          onClick={() => { setMode("quick"); setPhase("warmup"); }}
        >
          簡単診断コース（約10問）
        </button>
        <button
          className="w-full rounded-lg bg-green-600 text-white py-3 px-4 text-center shadow hover:bg-green-700 transition-colors"
          onClick={() => { setMode("deep"); setPhase("warmup"); }}
        >
          しっかり診断コース（全設問）
        </button>
      </div>
    </section>
  );
}
