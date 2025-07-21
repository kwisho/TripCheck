# 📍 TripCheck

**TripCheck** は、旅行者が自分で旅程を作成し、ルートや費用を自動でチェックできるモバイルアプリです。  
旅行計画を直感的に作成し、複数の経路・交通費・宿泊費などを比較・保存できます。


---

## 🗺 ER図（データモデル）

```plaintext
+----------------------------+       +----------------------------+       +----------------------------+
|           User             |       |            Plan            |       |          Location          |
+----------------------------+       +----------------------------+       +----------------------------+
| - id (PK)                  | 1   * | - id (PK)                  |       | - id (PK)                  |
| - cognitoSub               |-------| - userId (FK)              |       | - name                     |
| - name (opt)               |       | - name                     |       | - latitude                 |
| - avatarUrl (opt)          |       | - startDate                |       | - longitude                |
| - createdAt                |       | - endDate                  |       +----------------------------+
+----------------------------+       | - description (opt)        |
                                      | - advisability             |
                                      | - imageUrl (opt)           |
                                      +----------------------------+


                                      | 1
                                      |
                                      |
                                      | *
            +----------------------------+     
            |         PlanItem           |     
            +----------------------------+     
            | - id (PK)                  |
            | - planId (FK)              |
            | - locationId (FK)          |
            | - locationStartDate        |
            | - locationEndDate          |
            | - description (opt)        |
            +----------------------------+


                                      | 1
                                      |
                                      |
                                      | *
            +----------------------------+     
            |       RouteSegment          |     
            +----------------------------+     
            | - id (PK)                  |
            | - planItemId (FK)          |
            | - fromLocationId (FK)      |
            | - toLocationId (FK)        |
            | - transportType            |
            | - durationMinutes          |
            | - cost                     |
            | - departureTime (opt)      |
            | - arrivalTime (opt)        |
            +----------------------------+



                +----------------------------+
                |            Tag             |
                +----------------------------+
                | - id (PK)                  |
                | - name                     |
                +----------------------------+


                +----------------------------+
                |       PlanItemTag          |
                +----------------------------+
                | - id (PK)                  |
                | - planItemId (FK)          |
                | - tagId (FK)               |
                +----------------------------+




PK = Primary Key  
FK = Foreign Key


---
```



## 🛠 使用技術スタック

- [Expo](https://expo.dev/)（React Native フレームワーク）
- TypeScript
- Expo（React Native） / TypeScript / React Navigation
- AWS（Lambda / API Gateway / DynamoDB / Cognito）
- GitHub Actions（CI/CD予定）

---

## 🚀 セットアップ手順（ローカル開発）

1. リポジトリをクローン

```bash
git https://github.com/kwisho/TripCheck.git

```
## 📁 ディレクトリ構成

- `backend/`  
  バックエンドAPIやサーバーサイドのコード

- `frontend/`  
  モバイルアプリ（React Native / Expo）のコード

- `packages/`  
  フロント・バックエンドで共通利用するライブラリやユーティリティ

- `node_modules/`  
  プロジェクト依存パッケージ

- `package.json` / `package-lock.json`  
  依存管理とスクリプト設定（Monorepo全体）

- `eslint.config.js`  
  コード品質管理用のESLint設定ファイル


