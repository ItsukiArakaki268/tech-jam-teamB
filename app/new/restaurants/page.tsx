"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

// UIモック: ホットペッパーAPI検索 + 評判DBタグ表示の想定
export default function RestaurantSearchMock() {
  const [keyword, setKeyword] = useState("");
  const [category, setCategory] = useState("");
  const [area, setArea] = useState("");

  // ダミー結果（APIは未接続）
  const results = [
    {
      id: "r1",
      name: "居酒屋A 新都心店",
      category: "居酒屋",
      icon: "/vercel.svg",
      tags: ["提供早い", "コスパ◎", "手羽先"],
      reviewPreview:
        "20時台でも提供が早く、最初のドリンクは3分以内。名物の手羽先は回転が良く追加もすぐ、滞在45分で会計まで完了。",
    },
    {
      id: "r2",
      name: "居酒屋B 新都心店",
      category: "居酒屋",
      icon: "/file.svg",
      tags: ["韓国料理", "落ち着いた雰囲気", "予約可"],
      reviewPreview:
        "事前予約で入店待ちゼロ。チゲやサムギョプサルは5〜7分で提供、半個室で打ち合わせ前後でも落ち着いて利用できた。",
    },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold">お店を検索</h1>
      <form
        className="grid gap-3 grid-cols-1 md:grid-cols-[1fr_auto] items-center"
        onSubmit={(e) => {
          e.preventDefault();
          // TODO: API接続時にfetchを実装
        }}
      >
        <label className="grid gap-1">
          <span className="text-xs text-gray-600">キーワード</span>
          <input
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="例: 居酒屋 大人数"
            className="border rounded px-3 py-2 h-10 w-full"
          />
        </label>
        <button className="bg-black text-white rounded px-4 h-10 whitespace-nowrap">
          検索
        </button>
      </form>

      <section className="space-y-3">
        <h2 className="text-lg font-medium">検索結果</h2>
        <ul className="grid gap-3">
          {results.map((r) => (
            <li
              key={r.id}
              className="border rounded p-4 grid gap-3 md:grid-cols-[56px_1fr]"
            >
              <div className="size-14 rounded bg-gray-50 grid place-items-center">
                <Image src={r.icon} alt="icon" width={24} height={24} />
              </div>
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-semibold">{r.name}</span>
                  <span className="text-xs text-gray-600">{r.category}</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {r.tags.map((t) => (
                    <span
                      key={t}
                      className="text-xs bg-gray-100 rounded px-2 py-1"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <p className="text-sm text-gray-700 line-clamp-2">
                  {r.reviewPreview}
                </p>
                <div className="flex gap-2">
                  <Link href={`/review/${r.id}`} className="text-sm underline">
                    レビューを見る/書く
                  </Link>
                  <Link
                    href={`/event/${r.id}/result`}
                    className="text-sm underline"
                  >
                    この店で日程調整
                  </Link>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
