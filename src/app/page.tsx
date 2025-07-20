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
        <>
          <QuestionCard />
          <LiveMatchHUD />
        </>
      )}
      {phase === 'result' && <ResultsTop3 />}
    </main>
  );
}