"use client";

import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
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
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {shops.map((s) => (
        <Card
          key={s.id}
          className="overflow-hidden bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300"
        >
          {s.photoUrl ? (
            <div className="relative w-full h-48">
              <Image src={s.photoUrl} alt={s.name} fill className="object-cover" />
            </div>
          ) : null}
          <CardContent className="p-6">
            <div className="flex items-baseline mb-2">
              <span className="inline-block bg-secondary text-secondary-foreground text-xs px-2 rounded-full uppercase font-semibold tracking-wide">
                {s.genre}
              </span>
              <div className="ml-2 text-muted-foreground text-xs uppercase font-semibold tracking-wide">
                {s.area}
              </div>
            </div>
            <h3 className="text-xl font-bold mb-3">{s.name}</h3>
            <div className="border-t pt-4">
              {s.catchCopy ? (
                <p className="text-sm leading-relaxed text-foreground/80">{s.catchCopy}</p>
              ) : null}
            </div>
            <div className="mt-6 flex justify-between items-center">
              <span className="text-sm text-muted-foreground font-medium">
                社内レビュー {s.totalReviews}件
              </span>
              <Button
                variant="outline"
                className="bg-muted text-foreground hover:bg-accent"
                onClick={() => onGo?.(s.id)}
              >
                行った！ <span className="font-bold ml-1">{s.wentCount ?? 0}</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
