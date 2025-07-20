"use client";
import useQuizStore from "../lib/quizStore";

export default function StairProgress() {
  const { questions, responses } = useQuizStore();
  const total = questions.length;
  const answered = Object.keys(responses).length;

  const translatePercent = total > 0 ? ((total - answered) / total) * 100 : 0;

  return (
    <div className="fixed bottom-20 right-6 flex flex-col items-center pointer-events-none h-40">
      {/* climber icon */}
      <div
        className="text-xl mb-1 transition-transform duration-500"
        style={{ transform: `translateY(-${translatePercent}%)` }}
      >
        🧍‍♂️
      </div>

      {/* vertical steps */}
      <div className="flex flex-col-reverse w-8 h-full">
        {Array.from({ length: total }).map((_, i) => (
          <div
            key={i}
            className="flex-1 border-l border-t first:border-t-0 border-rose-300 bg-rose-50 transition-opacity"
            style={{ opacity: i < answered ? 0.9 : 0.3 }}
          />
        ))}
      </div>
    </div>
  );
}
