"use client";
import { useParams } from "next/navigation";
import { useState } from "react";

// UIモック: レビュー入力（タグ + テキスト）
export default function ReviewPage() {
  const params = useParams<{ restaurantId: string }>();
  const [tags, setTags] = useState<string[]>([]);
  const [text, setText] = useState("");

  const tagOptions = [
    "提供早い",
    "コスパ◎",
    "静か",
    "会食向け",
    "テイクアウト",
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold">レビューを書く</h1>
      <p className="text-sm text-gray-600">店舗ID: {params.restaurantId}</p>

      <section className="space-y-3">
        <h2 className="font-medium">店名を入力</h2>
        <label className="grid gap-1">
          <input
            placeholder="例: 居酒屋C"
            className="border rounded px-3 py-2"
          />
        </label>
        <h2 className="font-medium">タグを選択</h2>
        <div className="flex flex-wrap gap-2">
          {tagOptions.map((t) => {
            const active = tags.includes(t);
            return (
              <button
                type="button"
                key={t}
                onClick={() =>
                  setTags((prev) =>
                    prev.includes(t)
                      ? prev.filter((p) => p !== t)
                      : [...prev, t]
                  )
                }
                className={`text-sm rounded px-3 py-1 border ${
                  active ? "bg-black text-white" : "bg-white"
                }`}
              >
                {t}
              </button>
            );
          })}
        </div>
      </section>

      <section className="space-y-2">
        <h2 className="font-medium">レビュー本文</h2>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full border rounded p-3 h-40"
          placeholder="提供の早さ、混雑具合、味、立地など、外食時間の短縮に役立つ情報を記載してください。"
        />
      </section>

      <div className="flex gap-2">
        <button className="border rounded px-4 py-2">下書き保存</button>
        <button className="bg-black text-white border rounded px-4 py-2">
          投稿
        </button>
      </div>
    </div>
  );
}
