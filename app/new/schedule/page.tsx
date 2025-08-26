"use client";
import { useMemo, useState } from "react";

// UIモック: 調整さんCSVを受け取り、特定ユーザー優先で集計
// CSV 例: 日付,ユーザー名,可否
// 2025-09-01,田中,◯
// 2025-09-01,佐藤,△
// 2025-09-02,田中,×

type Availability = "◯" | "△" | "×";

type Row = {
  date: string;
  user: string;
  mark: Availability;
};

const weight: Record<Availability, number> = { "◯": 2, "△": 1, "×": 0 };

export default function ScheduleMock() {
  const [csvText, setCsvText] = useState("");
  const [priorityUsers, setPriorityUsers] = useState<string[]>(["田中"]);

  const rows = useMemo<Row[]>(() => {
    return csvText
      .split(/\n+/)
      .map((line) => line.trim())
      .filter(Boolean)
      .filter((l) => !/^日付|date/i.test(l))
      .map((l) => {
        const [date, user, mark] = l.split(/,|\t/).map((s) => s?.trim());
        return { date, user, mark } as Row;
      })
      .filter(
        (r) =>
          r.date &&
          r.user &&
          (r.mark === "◯" || r.mark === "△" || r.mark === "×")
      );
  }, [csvText]);

  const summary = useMemo(() => {
    const byDate: Record<string, number> = {};
    for (const r of rows) {
      const w = weight[r.mark] * (priorityUsers.includes(r.user) ? 2 : 1);
      byDate[r.date] = (byDate[r.date] || 0) + w;
    }
    return Object.entries(byDate)
      .sort((a, b) => b[1] - a[1])
      .map(([date, score]) => ({ date, score }));
  }, [rows, priorityUsers]);

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold">日程調整（CSV優先度反映）</h1>
      <div className="grid gap-4 md:grid-cols-2">
        <label className="grid gap-2">
          <span className="text-xs text-gray-600">CSVを貼り付け</span>
          <textarea
            value={csvText}
            onChange={(e) => setCsvText(e.target.value)}
            placeholder={`日付,ユーザー名,可否\n2025-09-01,田中,◯\n2025-09-01,佐藤,△`}
            className="border rounded p-3 h-48 font-mono text-sm"
          />
        </label>
        <label className="grid gap-2">
          <span className="text-xs text-gray-600">
            優先ユーザー（カンマ区切り）
          </span>
          <input
            value={priorityUsers.join(",")}
            onChange={(e) =>
              setPriorityUsers(
                e.target.value
                  .split(",")
                  .map((s) => s.trim())
                  .filter(Boolean)
              )
            }
            className="border rounded px-3 py-2"
            placeholder="例: 田中, 鈴木"
          />
        </label>
      </div>

      <section className="space-y-3">
        <h2 className="text-lg font-medium">おすすめ日程（優先度順）</h2>
        {summary.length === 0 ? (
          <p className="text-sm text-gray-600">
            CSVを入力すると結果が表示されます。
          </p>
        ) : (
          <ul className="grid gap-2">
            {summary.map((s) => (
              <li
                key={s.date}
                className="border rounded p-3 flex items-center justify-between"
              >
                <span>{s.date}</span>
                <span className="text-xs text-gray-600">スコア: {s.score}</span>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
