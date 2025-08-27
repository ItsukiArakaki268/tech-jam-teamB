import {
  Area,
  BudgetRange,
  Genre,
  HotPepperShop,
  InternalReview,
} from "./types";

export const mockShops: HotPepperShop[] = [
  {
    id: "shop_1",
    name: "炭火焼き とり吉 新橋店",
    genre: "居酒屋" as Genre,
    budget: "3000-5000" as BudgetRange,
    area: "東京" as Area,
    address: "東京都港区新橋1-1-1",
    capacity: 20,
    catchCopy: "備長炭で焼き上げる絶品焼き鳥",
    photoUrl: "https://images.unsplash.com/photo-1553621042-f6e147245754?w=800",
  totalReviews: 12,
  wentCount: 12,
  },
  {
    id: "shop_2",
    name: "トラットリア アズーリ",
    genre: "イタリアン・フレンチ" as Genre,
    budget: "5000-8000" as BudgetRange,
    area: "東京" as Area,
    address: "東京都千代田区丸の内1-2-3",
    capacity: 8,
    catchCopy: "ワインと手打ちパスタが人気",
    photoUrl: "https://images.unsplash.com/photo-1543352634-8730cde56b47?w=800",
  totalReviews: 8,
  wentCount: 5,
  },
  {
    id: "shop_3",
    name: "焼肉 きんぐ 大阪本町",
    genre: "焼肉・ホルモン" as Genre,
    budget: "5000-8000" as BudgetRange,
    area: "大阪" as Area,
    address: "大阪府大阪市中央区本町3-3-3",
    capacity: 30,
    catchCopy: "会食に最適な個室多数",
    photoUrl: "https://images.unsplash.com/photo-1553621042-2fa1a1c1c2f6?w=800",
  totalReviews: 25,
  wentCount: 8,
  },
];

export const mockReviews: InternalReview[] = [
  {
    id: "rev_1",
    shopId: "shop_1",
    title: "焼き鳥がジューシーで会話も弾む",
    content:
      "カウンターで大将との距離も近く、接待というよりはチーム飲みに最適。つくねが特におすすめ。",
    tags: ["チーム飲み", "コスパ良し"],
    employeeName: "山田 太郎",
    isGourmetMeister: true,
  },
  {
    id: "rev_2",
    shopId: "shop_2",
    title: "ワインの提案が的確で接待向き",
    content:
      "店員さんのサービスが行き届いていて、少人数の会食にちょうど良い雰囲気。",
    tags: ["接待", "少人数"],
    employeeName: "佐藤 花子",
    isGourmetMeister: false,
  },
];
