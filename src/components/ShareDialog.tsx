"use client";

// Share dialog is currently disabled. Placeholder to satisfy imports.
export default function ShareDialog() {
  return null;
}
export default function ShareDialog({ open, onClose }: Props) {
  return null;
    if (!open) return;
    if (navigator.share) {
      navigator
        .share({
          title: "政治DNA診断 結果",
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <Dialog.Overlay className="fixed inset-0 bg-black/40" />
      <Dialog.Panel className="relative bg-white rounded-lg shadow-lg max-w-sm w-full p-6 z-50">
        <Dialog.Title className="text-lg font-semibold mb-2">結果をシェア</Dialog.Title>
        {navigator.share ? (
          <p className="text-sm">共有ダイアログを開いています…</p>
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
  );
}
