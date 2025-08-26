// UIモック: 店舗単位の簡易サマリ（検索→この店で日程調整導線から遷移想定）
import Link from "next/link";

export default function EventResult() {
  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold">候補の共有</h1>
      <p className="text-sm text-gray-700">
        このお店で日程の候補を共有しましょう。調整さんの作成・CSVインポートで優先ユーザーを反映できます。
      </p>
      <div className="grid gap-3">
        <Link href="/new/schedule" className="underline">
          調整用CSVを用意する
        </Link>
        <Link href="/review/123" className="underline">
          この店のレビューを見る/書く
        </Link>
      </div>
    </div>
  );
}
