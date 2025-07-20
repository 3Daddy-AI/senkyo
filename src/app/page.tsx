"use client";
import HeroSection from "../components/HeroSection";
import ModeSelect from "../components/ModeSelect";
import ScenarioWarmup from "../components/ScenarioWarmup";
import QuestionCard from "../components/QuestionCard";
import LiveMatchHUD from "../components/LiveMatchHUD";
import ResultsTop3 from "../components/ResultsTop3";
import useQuizStore from "../lib/quizStore";

export default function Home() {
  const { phase } = useQuizStore();

  return (
    <main className="flex flex-col items-center min-h-screen p-4 space-y-8 w-full">
      <HeroSection />
      {phase === 'intro' && <ModeSelect />}
      {phase === 'warmup' && <ScenarioWarmup />}
      {phase === 'quiz' && (
        <div className="flex flex-col md:flex-row md:space-x-6 w-full max-w-4xl">
          {/* 左カラム：設問と選択肢 */}
          <div className="md:w-1/2 mx-auto max-w-[640px]">
            <QuestionCard />
          </div>

          {/* 右カラム：進捗＆一致度ゲージ */}
          <div className="md:w-1/2 md:sticky md:top-4 mt-4 md:mt-0">
            <LiveMatchHUD />
          </div>
        </div>
      )}
      {phase === 'result' && <ResultsTop3 />}
    </main>
  );
}