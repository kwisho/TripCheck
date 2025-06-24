# 📍 TripCheck

# 📍 TripCheck

**TripCheck** は、旅行者が自分で旅程を作成し、ルートや費用を自動でチェックできるモバイルアプリです。  
旅行計画を直感的に作成し、複数の経路・交通費・宿泊費などを比較・保存できます。

---

## 🗺 ER図（データモデル）

# 📍 TripCheck

**TripCheck** は、旅行者が自分で旅程を作成し、ルートや費用を自動でチェックできるモバイルアプリです。  
旅行計画を直感的に作成し、複数の経路・交通費・宿泊費などを比較・保存できます。

---

## 🗺 ER図（データモデル）

```plaintext
+----------------+       +----------------+       +----------------+
|     User       |       |     Plan       |       |    Location    |
+----------------+       +----------------+       +----------------+
| - userId (PK)  |1    * | - planId (PK)  |       | - locationId(PK)|
| - name         |-------| - userId (FK)  |       | - name         |
| - email        |       | - title        |       | - latitude     |
| - passwordHash |       | - startDate    |       | - longitude    |
+----------------+       | - endDate      |       +----------------+
                         | - description  |
                         +----------------+
                              | 1
                              | 
                              | *
+----------------+     +----------------+     +----------------+
|   PlanItem     |     | RouteSegment   |     |    Location    |
+----------------+     +----------------+     +----------------+
| - planItemId(PK)|     | - routeSegmentId(PK)| | - locationId(PK)|
| - planId (FK)  |     | - planId (FK)        | | - name         |
| - locationId(FK)|-----| - fromLocationId (FK)| | - latitude     |
| - date         |     | - toLocationId (FK)  | | - longitude    |
| - description  |     | - transportType      | +----------------+
+----------------+     | - durationMinutes    |
                       | - cost               |
                       | - departureTime (opt)|
                       | - arrivalTime (opt)  |
                       +----------------+

          *                          
          |                          
          |                          
+----------------+
|    Tag         |
+----------------+
| - tagId (PK)   |
| - name         |
+----------------+

          *                          
          |                          
          |                          
+----------------+
| PlanItemTag    |
+----------------+
| - planItemId(FK)|
| - tagId (FK)    |
+----------------+

PK = Primary Key  
FK = Foreign Key


---



## 🛠 使用技術スタック

- [Expo](https://expo.dev/)（React Native フレームワーク）
- TypeScript
- React Navigation
- Zustand（状態管理）
- AWS（バックエンド／インフラ予定）
- GitHub Actions（CI/CD予定）

---

## 🚀 セットアップ手順（ローカル開発）

1. リポジトリをクローン

```bash
git https://github.com/kwisho/TripCheck.git
