export type BudgetRange =
  | "~3000"
  | "3000-5000"
  | "5000-8000"
  | "8000-12000"
  | "12000~"
  | "指定なし";

export type Genre =
  | "居酒屋"
  | "和食"
  | "洋食"
  | "イタリアン・フレンチ"
  | "中華"
  | "アジア・エスニック"
  | "焼肉・ホルモン"
  | "バー・カクテル"
  | "カフェ・スイーツ"
  | "その他";

export type Area =
  | "東京"
  | "神奈川"
  | "千葉"
  | "埼玉"
  | "大阪"
  | "福岡"
  | "その他";

export interface HotPepperShop {
  id: string;
  name: string;
  genre: Genre;
  budget: BudgetRange;
  area: Area;
  address: string;
  capacity?: number;
  catchCopy?: string;
  photoUrl?: string;
  totalReviews: number;
  wentCount?: number;
}

export interface InternalReview {
  id: string;
  shopId: string;
  title: string;
  content: string;
  tags: string[];
  employeeName: string;
  isGourmetMeister: boolean;
  avatarUrl?: string;
}

export interface SearchParams {
  keyword?: string;
  people?: number;
  budget?: BudgetRange;
  genre?: Genre | "指定なし";
  area?: Area | "指定なし";
}
