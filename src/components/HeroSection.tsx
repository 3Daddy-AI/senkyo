"use client";
import Image from 'next/image';

export default function HeroSection() {
  return (
    <section className="relative w-full overflow-hidden rounded-xl bg-gradient-to-b from-pink-100 via-rose-50 to-yellow-100 px-6 py-20 sm:py-28 shadow-md text-gray-800">
      <div className="relative z-10 flex flex-col items-center text-center gap-6 max-w-xl mx-auto">
        <Image priority src="/logo.svg" alt="政治DNA診断ロゴ" width={120} height={120} />
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight drop-shadow-sm">
          あなたの政治DNAを<br className="sm:hidden" /> 可愛い診断で解析
        </h1>
        <p className="text-base sm:text-lg leading-relaxed opacity-90 max-w-md">
          10 問前後に答えるだけで、あなたと政党の相性がリアルタイムにわかります。
          下へスクロールしてコースを選んでください。
        </p>
      </div>
      <div className="absolute inset-0 pointer-events-none">
        <svg width="100%" height="100%" className="opacity-20" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="dots" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
              <circle cx="6" cy="6" r="3" fill="#fbcfe8" />
              <circle cx="26" cy="26" r="3" fill="#fde68a" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dots)" />
        </svg>
      </div>
      {/* 背景の抽象グラフィック */}
      <div className="absolute inset-0 before:absolute before:inset-0 before:bg-[url('/grid.svg')] before:opacity-10"></div>
    </section>
  );
}
