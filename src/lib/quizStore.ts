import { create } from 'zustand';

// ----- Types ------------------------------------------------------------
export type Mode = 'quick' | 'deep';
export type ResponseValue = -2 | -1 | 0 | 1 | 2 | null;
export type WeightValue = 0 | 1 | 2;

export interface Question {
  id: string;
  text: string;
  category: string;
  weight?: WeightValue;
}

export interface PartyPosition {
  partyId: string;
  positions: Record<string, -2 | -1 | 0 | 1 | 2>;
}

export type Phase = 'intro' | 'warmup' | 'quiz' | 'result';

export interface QuizState {
  // core
  mode: Mode;
  phase: Phase;
  scenario: string | null;
  currentIndex: number;
  questions: Question[];
  responses: Record<string, ResponseValue>;
  weights: Record<string, WeightValue>;
  scores: Record<string, number>;
  confidence: number; // 0–1

  // actions
  setMode: (mode: Mode) => void;
  setPhase: (phase: Phase) => void;
  setScenario: (s: string) => void;
  setQuestions: (qs: Question[]) => void;
  setResponse: (questionId: string, value: ResponseValue) => void;
  nextQuestion: () => void;
  prevQuestion: () => void;
  reset: () => void;
}

// ----- Data -------------------------------------------------------------
import questionsData from '../../data/questions.json' assert { type: 'json' };
import positionsData from '../../data/positions.json' assert { type: 'json' };
import partiesData from '../../data/parties.json' assert { type: 'json' };

const questions: Question[] = questionsData as unknown as Question[];
const positions: PartyPosition[] = positionsData as unknown as PartyPosition[];

// Map partyIds for quick reference
const partyIds = partiesData.map((p: any) => p.id) as string[];

// ----- Utility: score calculation --------------------------------------
export function computeScores(
  responses: Record<string, ResponseValue>,
  weights: Record<string, WeightValue> = {}
): { scores: Record<string, number>; confidence: number } {
  const scores: Record<string, number> = {};
  partyIds.forEach((id) => (scores[id] = 0));

  let answeredWeight = 0;
  let totalWeight = 0;

  for (const q of questions) {
    const w: WeightValue = weights[q.id] ?? (q.weight ?? 1);
    totalWeight += w;

    const userVal = responses[q.id];
    if (userVal === null || userVal === undefined) continue;

    answeredWeight += w;

    // For each party compute distance (smaller is better)
    for (const party of positions) {
      const partyVal = party.positions[q.id];
      if (partyVal === undefined) continue;
      const diff = Math.abs(userVal - partyVal);
      // Max diff is 4. Convert to similarity score (higher better)
      const similarity = (4 - diff) * w; // range 0..8 when w=2
      scores[party.partyId] += similarity;
    }
  }

  // Normalize to 0..100
  const maxPossiblePerQ = 4 * 2; // diff 0 with weight 2 maps to 8
  const maxTotal = totalWeight * 4; // each weight unit gives 4 points max
  for (const id of partyIds) {
    scores[id] = totalWeight === 0 ? 0 : Math.round((scores[id] / maxTotal) * 100);
  }

  const confidence = totalWeight === 0 ? 0 : answeredWeight / totalWeight;
  return { scores, confidence };
}

// ----- Store ------------------------------------------------------------
export const useQuizStore = create<QuizState>((set, get) => ({
  mode: 'quick',
  phase: 'intro',
  scenario: null,
  currentIndex: 0,
  questions,
  responses: {},
  weights: {},
  scores: {},
  confidence: 0,

  setMode: (mode) => set({ mode }),

  setPhase: (phase) => set({ phase }),
  setScenario: (s) => set({ scenario: s }),

  setQuestions: (qs) => set({ questions: qs, currentIndex: 0 }),

  setResponse: (questionId, value) => {
    const newResponses = { ...get().responses, [questionId]: value };
    const newWeights = {
      ...get().weights,
      [questionId]: questions.find((q) => q.id === questionId)?.weight ?? 1,
    };
    const { scores, confidence } = computeScores(newResponses, newWeights);
    set({ responses: newResponses, weights: newWeights, scores, confidence });
  },

  nextQuestion: () => {
    const idx = get().currentIndex + 1;
    set({ currentIndex: Math.min(idx, get().questions.length - 1) });
  },

  prevQuestion: () => {
    const idx = get().currentIndex - 1;
    set({ currentIndex: Math.max(idx, 0) });
  },

  reset: () => set({
    mode: 'quick',
    phase: 'intro',
    scenario: null,
    currentIndex: 0,
    responses: {},
    weights: {},
    scores: {},
    confidence: 0,
  }),
}));

export default useQuizStore;
