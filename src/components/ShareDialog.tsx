"use client";
import { Dialog } from "@headlessui/react";
import { useEffect } from "react";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function ShareDialog({ open, onClose }: Props) {
  useEffect(() => {
    if (!open) return;
    if (navigator.share) {
      navigator
        .share({
          title: "政治DNA診断 結果",
          text: "私の政治DNA診断結果をチェック！",
          url: window.location.href,
        })
        .then(() => onClose())
        .catch(() => {});
    }
  }, [open, onClose]);

  if (!open) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.href);
    alert("リンクをコピーしました！");
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} className="fixed inset-0 z-50 flex items-center justify-center">
      <Dialog.Overlay className="fixed inset-0 bg-black/40" />
      <div className="relative bg-white rounded-lg shadow-lg max-w-sm w-full p-6 z-50">
        <Dialog.Title className="text-lg font-semibold mb-2">結果をシェア</Dialog.Title>
        {navigator.share ? (
          <p className="text-sm mb-4">共有ダイアログを開いています…</p>
        ) : (
          <>
            <p className="text-sm mb-4">お使いのブラウザは Web Share API に対応していません。リンクをコピーしてシェアしてください。</p>
            <button
              onClick={handleCopy}
              className="w-full rounded-md bg-indigo-600 text-white py-2 hover:bg-indigo-700 transition"
            >
              リンクをコピー
            </button>
          </>
        )}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          ×
        </button>
      </div>
    </Dialog>
  );
}
