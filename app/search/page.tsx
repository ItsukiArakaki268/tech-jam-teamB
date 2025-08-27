"use client";

import { useMemo, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SearchFilters } from "@/components/search/SearchFilters";
import { SearchResults } from "@/components/search/SearchResults";
import type { HotPepperShop, SearchParams } from "@/lib/types";
import { mockReviews, mockShops } from "@/lib/mockData";

function applyFilters(shops: HotPepperShop[], params: SearchParams) {
  return shops.filter((s) => {
    if (params.keyword) {
      const kw = params.keyword.toLowerCase();
      const hay = `${s.name} ${s.genre} ${s.area} ${s.address} ${
        s.catchCopy ?? ""
      }`.toLowerCase();
      if (!hay.includes(kw)) return false;
    }
    if (params.genre && params.genre !== "指定なし" && s.genre !== params.genre)
      return false;
    if (params.area && params.area !== "指定なし" && s.area !== params.area)
      return false;
    if (
      params.budget &&
      params.budget !== "指定なし" &&
      s.budget !== params.budget
    )
      return false;
    if (params.people && s.capacity && s.capacity < params.people) return false;
    return true;
  });
}

export default function SearchPage() {
  const [params, setParams] = useState<SearchParams>({});
  const filtered = useMemo(() => applyFilters(mockShops, params), [params]);

  return (
    <div className="mx-auto max-w-6xl p-6 space-y-6">
      <h1 className="text-2xl font-semibold">お店を検索</h1>

      <SearchFilters value={params} onChange={setParams} />

      <Tabs defaultValue="hotpepper" className="mt-2">
        <TabsList>
          <TabsTrigger value="hotpepper">ホットペッパー</TabsTrigger>
          <TabsTrigger value="internal">社内レビュー</TabsTrigger>
        </TabsList>

        <TabsContent value="hotpepper" className="mt-4">
          <SearchResults
            shops={filtered}
            params={params}
            onGo={(id) => console.log("go!", id)}
          />
        </TabsContent>

        <TabsContent value="internal" className="mt-4">
          {/* 社内レビューは今は要件上、タイトル/社員名/タグ/内容を一覧化。後続で詳細へリンク */}
          {mockReviews.length === 0 ? (
            <p className="text-muted-foreground">レビューがありません。</p>
          ) : (
            <ul className="space-y-4">
              {mockReviews.map((r) => (
                <li key={r.id} className="border rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="font-medium">{r.title}</div>
                    <span className="text-xs text-muted-foreground">
                      {r.employeeName}{" "}
                      {r.isGourmetMeister ? "・グルメマイスター" : ""}
                    </span>
                  </div>
                  <div className="text-sm mb-2">{r.content}</div>
                  <div className="flex gap-2 flex-wrap">
                    {r.tags.map((t) => (
                      <span
                        key={t}
                        className="text-xs bg-secondary text-secondary-foreground rounded px-2 py-0.5"
                      >
                        #{t}
                      </span>
                    ))}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
