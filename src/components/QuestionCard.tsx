"use client";
import { useEffect } from "react";
import useQuizStore, { ResponseValue } from "../lib/quizStore";

const scale: { value: ResponseValue; label: string }[] = [
  { value: -2, label: "強く反対" },
  { value: -1, label: "やや反対" },
  { value: 0, label: "どちらでもない" },
  { value: 1, label: "やや賛成" },
  { value: 2, label: "強く賛成" },
];

export default function QuestionCard() {
  const {
    questions,
    currentIndex,
    responses,
    setResponse,
    nextQuestion,
    setPhase,
  } = useQuizStore();

  const q = questions[currentIndex];
  const selected = responses[q.id] ?? null;

  const handleSelect = (v: ResponseValue) => {
    setResponse(q.id, v);
  };

  useEffect(() => {
    // if user has answered last question, move to result after slight delay
    if (currentIndex === questions.length - 1 && selected !== null) {
      const t = setTimeout(() => setPhase("result"), 300);
      return () => clearTimeout(t);
    }
  }, [currentIndex, selected, questions.length, setPhase]);

  return (
    <div className="w-full max-w-xl mx-auto p-4 flex flex-col gap-6">
      <h2 className="text-lg font-medium">
        {currentIndex + 1}/{questions.length}
      </h2>
      <p className="text-xl font-semibold leading-relaxed">
        {q.text}
      </p>

      <div className="flex flex-col gap-3">
        {scale.map((s) => (
          <button
            key={s.value}
            onClick={() => {
              handleSelect(s.value);
              nextQuestion();
            }}
            className={`rounded-md border py-2 px-4 text-left transition text-sm sm:text-base ${
              selected === s.value
                ? "bg-indigo-600 text-white border-indigo-600"
                : "bg-white hover:bg-gray-50 border-gray-200"
            }`}
          >
            {s.label}
          </button>
        ))}
        <button
          onClick={() => {
            handleSelect(null);
            nextQuestion();
          }}
          className="rounded-md border border-dashed py-2 px-4 text-sm text-gray-500 hover:bg-gray-50"
        >
          スキップ / わからない
        </button>
      </div>
    </div>
  );
}
