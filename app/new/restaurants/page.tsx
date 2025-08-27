"use client";

import { useMemo, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SearchFilters } from "@/components/search/SearchFilters";
import { SearchResults } from "@/components/search/SearchResults";
import type { HotPepperShop, SearchParams } from "@/lib/types";
import { mockReviews, mockShops } from "@/lib/mockData";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";

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

export default function RestaurantsSearchPage() {
  const [params, setParams] = useState<SearchParams>({});
  const filtered = useMemo(() => applyFilters(mockShops, params), [params]);

  return (
    <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar */}
        <aside className="w-full lg:w-1/4 lg:max-w-xs flex-shrink-0">
          <Card className="p-6 sticky top-24">
            <h2 className="text-lg font-semibold mb-6">絞り込み条件</h2>
            <div className="space-y-6">
              <SearchFilters value={params} onChange={setParams} />

              {/* 詳細条件（ダミー） */}
              <div>
                <h3 className="text-sm font-semibold mb-3">詳細条件</h3>
                <div className="space-y-3 text-sm text-muted-foreground">
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="size-4" />オンライン予約可
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="size-4" />個室あり
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="size-4" />座敷あり
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="size-4" />カウンター席あり
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="size-4" />カード払いOK
                  </label>
                </div>
              </div>
            </div>
          </Card>
        </aside>

        {/* Main content */}
        <main className="w-full lg:flex-1">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
            <h1 className="text-2xl font-bold mb-4 sm:mb-0">レビューされたお店</h1>
            <div className="min-w-40">
              <Select defaultValue="new">
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="並び替え" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="new">新着順</SelectItem>
                  <SelectItem value="went">行った！が多い順</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

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
              {mockReviews.length === 0 ? (
                <p className="text-muted-foreground">レビューがありません。</p>
              ) : (
                <ul className="space-y-4">
                  {mockReviews.map((r) => {
                    const initials = r.employeeName
                      .split(" ")
                      .map((s) => s[0])
                      .join("");
                    return (
                      <li key={r.id} className="border rounded-xl p-4">
                        <div className="flex items-center justify-between mb-2">
                          <div className="font-medium">{r.title}</div>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <Avatar className="size-6">
                              <AvatarImage src={r.avatarUrl} alt={r.employeeName} />
                              <AvatarFallback>{initials}</AvatarFallback>
                            </Avatar>
                            <span>
                              {r.employeeName}
                              {r.isGourmetMeister ? " ・グルメマイスター" : ""}
                            </span>
                          </div>
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
                    );
                  })}
                </ul>
              )}
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
}
