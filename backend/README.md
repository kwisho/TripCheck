
# 🧭 TripCheck - Serverless API for Travel Plans

こんにちは！このプロジェクト「TripCheck」は、旅行者が旅程を管理できるクラウドネイティブなサーバーレスAPIです。AWSを活用し、旅行プランを保存・取得・削除できる機能を備えたREST APIを提供します。

このリポジトリは、自分自身のスキルとサーバーレスアーキテクチャの理解を深めるために構築したものです。技術検証用やポートフォリオとしてもご活用いただけます。

---

## 🚀 スタック構成

| 技術            | 説明 |
|------------------|------|
| ![Node.js](https://upload.wikimedia.org/wikipedia/commons/d/d9/Node.js_logo.svg) | Node.js - JavaScriptランタイム |
| ![TypeScript](https://upload.wikimedia.org/wikipedia/commons/4/4c/Typescript_logo_2020.svg) | TypeScript - 静的型付きのJavaScriptスーパーセット |
| ![AWS Lambda](https://cdn.worldvectorlogo.com/logos/aws-lambda.svg) | AWS Lambda - サーバーレス実行環境 |
| ![AWS API Gateway](https://cdn.worldvectorlogo.com/logos/aws-api-gateway.svg) | API Gateway - HTTP APIを受け付けるゲートウェイ |
| ![DynamoDB](https://cdn.worldvectorlogo.com/logos/aws-dynamodb.svg) | DynamoDB - NoSQLデータベース |
| ![Serverless Framework](https://user-images.githubusercontent.com/2752551/30405068-a7733b34-989e-11e7-8f66-7badaf1373ed.png) | Serverless Framework - デプロイ＆管理ツール |
| ![CloudFormation](https://cdn.worldvectorlogo.com/logos/aws-cloudformation.svg) | CloudFormation - AWSインフラのコード化 |

---

## 🧱 アーキテクチャ概要

TripCheck APIは以下の構成で設計されています：

- ユーザーがHTTPリクエスト（例：GET `/v1/plans`）を送信
- API Gateway がリクエストを受信し、適切な Lambda 関数を実行
- Lambda 関数が DynamoDB にアクセスし、レスポンスを返す
- API Gateway を通じてユーザーにレスポンスを返却

![アーキテクチャ図](docs/rest-api-diagram.svg)

---

## 📁 コード構成（ディレクトリ構造）

```
backend/
├── src/
│   ├── core/
│   │   ├── application/        # アプリケーション層：ユースケースやサービスロジック
│   │   ├── domain/             # ドメイン層：エンティティやインターフェース定義
│   │   └── infrastructure/     # インフラ層：DBアクセス、AWSサービス連携など
│   ├── functions/              # Lambda関数のハンドラ（エンドポイントごと）
│   └── utils/                  # 共通ユーティリティ関数（レスポンス整形、日付操作など）
├── docs/                       # アーキテクチャ図、テスト結果画像など
├── resources/                  # DynamoDBなどAWSリソースの定義（YAML形式）
├── tests/                      # 単体テストファイル
├── serverless.yml              # Serverless Framework設定ファイル
├── package.json                # プロジェクトの依存パッケージ定義
├── tsconfig.json               # TypeScriptの設定ファイル
└── README.md                   # このファイル
```

---

## 📦 インストールとローカル開発

```bash
# 依存関係をインストール
npm install

# サーバーレス関数をローカルでテスト（例：GETプラン一覧）
npx serverless invoke local --function get-plan
```

---

## ☁️ デプロイ方法

```bash
# AWSにデプロイ（dev環境）
npx serverless deploy --stage dev
```

---

## 🧪 テスト

一部のビジネスロジックにはユニットテストが用意されています。

```bash
npm test
```

使用しているテストランナー：Node.jsの標準テストランナー

![テスト結果](docs/test-results.png)

---

## 🗂️ 今後の予定

- 認証機能の追加（Cognitoなど）
- ユーザーごとの旅程保存
- 通知機能（出発前リマインド）
- 管理画面（別リポジトリで開発予定）

---

## 📫 開発者情報

TripCheckは個人開発プロジェクトです。フィードバックやコラボのご連絡はお気軽に！

---

## 📝 ライセンス

MIT License
