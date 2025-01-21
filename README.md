# Amie's Closet (wardrobe-manager デジタルクローゼット管理アプリ)

## 概要
このプロジェクトは、個人の衣類やコーディネートを効率的に管理するためのWebアプリケーションです。直感的なUIで衣類の分類、コーディネートの作成、画像管理が可能です。

## 技術スタック
### フロントエンド
- React
- TailwindCSS
- JavaScript (ES6+)

### バックエンド
- Supabase (PostgreSQL)
- Cloudinary (画像ストレージ)

### 開発ツール
- VSCode
- ESLint
- Prettier

## 主な機能
### 衣類管理
- カテゴリ別の衣類管理
  - 外套 (アウター)
  - 上装 (トップス)
  - 下装 (ボトムス)
  - 連衣裙 (ワンピース)
  - 靴子 (シューズ)
  - 配飾 (アクセサリー)
- アイテムのタグ付け機能
- 画像アップロード機能

### コーディネート機能
- シーン別のコーディネート作成
  - 运动 (スポーツ)
  - 舒适 (カジュアル)
  - 休闲 (リラックス)
- コーディネート画像の保存
- コーディネート名の設定

### その他の機能
- 衣類の検索機能
- カテゴリ別の数量管理
- タグによるフィルタリング

## インストール方法
```bash
# リポジトリのクローン
git clone https://github.com/yourusername/wardrobe-manager.git

# プロジェクトディレクトリに移動
cd wardrobe-manager

# 依存関係のインストール
npm install

# 環境変数の設定
cp .env.example .env
# 必要な環境変数を設定:
# - VITE_SUPABASE_URL
# - VITE_SUPABASE_ANON_KEY
# - VITE_CLOUDINARY_CLOUD_NAME
# - VITE_CLOUDINARY_UPLOAD_PRESET

# 開発サーバーの起動
npm run dev
