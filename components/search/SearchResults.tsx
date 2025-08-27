"use client";

import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { HotPepperShop, SearchParams } from "@/lib/types";

type Props = {
  shops: HotPepperShop[];
  params: SearchParams;
  onGo?: (shopId: string) => void;
};

export function SearchResults({ shops, onGo }: Props) {
  if (!shops?.length) {
    return (
      <p className="text-muted-foreground">
        該当するお店が見つかりませんでした。
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
      {shops.map((s) => (
        <Card key={s.id} className="overflow-hidden">
          {s.photoUrl ? (
            <div className="relative w-full h-40">
              <Image
                src={s.photoUrl}
                alt={s.name}
                fill
                className="object-cover"
              />
            </div>
          ) : null}
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              {s.name}
              <Badge variant="secondary">{s.genre}</Badge>
            </CardTitle>
            <CardDescription className="flex flex-wrap gap-2">
              <Badge variant="outline">予算: {s.budget}</Badge>
              {s.capacity ? (
                <Badge variant="outline">目安人数: {s.capacity}名</Badge>
              ) : null}
              <Badge variant="outline">エリア: {s.area}</Badge>
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {s.catchCopy ? <p className="text-sm">{s.catchCopy}</p> : null}
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                総レビュー: {s.totalReviews}件
              </span>
              <Button size="sm" onClick={() => onGo?.(s.id)}>
                行った！
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
