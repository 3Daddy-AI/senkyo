"use client";
import { useState } from "react";
import useQuizStore from "../lib/quizStore";

import partiesData from "../../data/parties.json" assert { type: "json" };

interface Party {
  id: string;
  name: string;
  abbrev: string;
  color: string;
}

const parties: Party[] = partiesData as Party[];

export default function ResultsTop3() {
  const handleShare = () => {
    if (typeof navigator.share === "function") {
      navigator.share({
        title: "政治DNA診断 結果",
        text: "私の政治DNA診断結果をチェック！",
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("リンクをコピーしました！");
    }
  };
  const { scores, confidence, reset } = useQuizStore();

  const top = Object.entries(scores)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3);

  const getParty = (id: string) => parties.find((p) => p.id === id);

  return (
    <section className="w-full max-w-md mx-auto px-4 py-10 flex flex-col items-center gap-6">
      <h2 className="text-2xl font-bold">診断結果</h2>

      <div className="w-full flex flex-col gap-4">
        {top.map(([id, score], idx) => {
          const party = getParty(id);
          if (!party) return null;
          return (
            <div
              key={id}
              className="flex items-center gap-4 p-4 rounded-lg shadow border border-gray-200 bg-white"
            >
              <div
                className="w-10 h-10 rounded-full shrink-0"
                style={{ backgroundColor: party.color }}
              />
              <div className="flex-1">
                <p className="font-semibold">
                  {idx + 1}. {party.name}
                </p>
                <p className="text-sm text-gray-600">一致率 {score}%</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="text-sm text-gray-600">診断信頼度: {(confidence * 100).toFixed(0)}%</div>

      <div className="flex gap-4">
        <button
          onClick={handleShare}
          className="rounded-full bg-pink-500 text-white px-6 py-2 hover:bg-pink-600 transition"
        >
          結果をシェア
        </button>
        <button
          onClick={reset}
          className="rounded-full bg-indigo-600 text-white px-6 py-2 hover:bg-indigo-700 transition"
        >
          もう一度診断する
        </button>
      </div>
    </section>
  );
}
