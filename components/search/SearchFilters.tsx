"use client";

import { useMemo } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import type { Area, BudgetRange, Genre, SearchParams } from "@/lib/types";

type Props = {
  value: SearchParams;
  onChange: (next: SearchParams) => void;
  onSubmit?: () => void;
};

export function SearchFilters({ value, onChange, onSubmit }: Props) {
  const budgets: BudgetRange[] = useMemo(
    () => [
      "指定なし",
      "~3000",
      "3000-5000",
      "5000-8000",
      "8000-12000",
      "12000~",
    ],
    []
  );
  const genres: (Genre | "指定なし")[] = useMemo(
    () => [
      "指定なし",
      "居酒屋",
      "和食",
      "洋食",
      "イタリアン・フレンチ",
      "中華",
      "アジア・エスニック",
      "焼肉・ホルモン",
      "バー・カクテル",
      "カフェ・スイーツ",
      "その他",
    ],
    []
  );
  const areas: (Area | "指定なし")[] = useMemo(
    () => [
      "指定なし",
      "東京",
      "神奈川",
      "千葉",
      "埼玉",
      "大阪",
      "福岡",
      "その他",
    ],
    []
  );

  return (
    <form
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3 items-end"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit?.();
      }}
    >
      <div className="lg:col-span-2">
        <label className="block text-sm font-medium mb-1">キーワード</label>
        <Input
          placeholder="店名・タグ・エリアなど"
          value={value.keyword ?? ""}
          onChange={(e) => onChange({ ...value, keyword: e.target.value })}
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">人数</label>
        <Input
          type="number"
          min={1}
          placeholder="例: 6"
          value={value.people ?? ""}
          onChange={(e) =>
            onChange({
              ...value,
              people: e.target.value ? Number(e.target.value) : undefined,
            })
          }
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">予算</label>
        <Select
          value={value.budget ?? "指定なし"}
          onValueChange={(v: string) =>
            onChange({ ...value, budget: v as BudgetRange })
          }
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="指定なし" />
          </SelectTrigger>
          <SelectContent>
            {budgets.map((b) => (
              <SelectItem key={b} value={b}>
                {b}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">ジャンル</label>
        <Select
          value={value.genre ?? "指定なし"}
          onValueChange={(v: string) =>
            onChange({ ...value, genre: v as Genre | "指定なし" })
          }
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="指定なし" />
          </SelectTrigger>
          <SelectContent>
            {genres.map((g) => (
              <SelectItem key={g} value={g}>
                {g}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">エリア</label>
        <Select
          value={value.area ?? "指定なし"}
          onValueChange={(v: string) =>
            onChange({ ...value, area: v as Area | "指定なし" })
          }
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="指定なし" />
          </SelectTrigger>
          <SelectContent>
            {areas.map((a) => (
              <SelectItem key={a} value={a}>
                {a}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex gap-2">
        <Button type="submit" className="w-full">
          検索
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => onChange({})}
          className="w-full"
        >
          クリア
        </Button>
      </div>
    </form>
  );
}
