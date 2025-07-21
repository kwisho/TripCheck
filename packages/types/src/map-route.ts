import { Location } from './location';
import { TransportType } from './route-segment';

//
// ------------------------------
// 距離・所要時間取得（Routes API 用）
// ------------------------------

/**
 * 2地点間の距離と所要時間を取得するためのリクエストパラメータ型
 */
export type FetchDistanceParams = {
  /** 出発地点の情報（地名や座標など） */
  fromLocation: Location;
  /** 到着地点の情報（地名や座標など） */
  toLocation: Location;
  /** 出発予定の時刻（未来時刻を想定） */
  departureTime: Date;
  /** 交通手段（WALKING, DRIVING, TRANSITなど） */
  transportType: TransportType;
};

/**
 * 距離と所要時間取得のレスポンス型
 */
export type FetchDistanceResult = {
  /** 所要時間（分単位） */
  durationMinutes: number;
  /** 移動距離（メートル単位） */
  distanceMeters: number;
  /** ユーザー向け表示用のサマリー（例: "25分 / 3.2 km"） */
  summary: string;
};


//
// ------------------------------
// Google Places API: オートコンプリート関連
// ------------------------------

/**
 * Google Places API の Place Autocomplete に送るリクエストパラメータ型
 */
export type AutocompleteParams = {
  /** ユーザーが入力している検索語（例: "渋谷"） */
  input: string;
  /** セッションごとの識別トークン（パフォーマンス向上・請求最適化に役立つ） */
  sessionToken?: string;
  /** 検索範囲の中心となる位置情報（緯度・経度） */
  location?: {
    lat: number;
    lng: number;
  };
  /** 言語コード（例: 'ja'） */
  language: string;
};

/**
 * オートコンプリート候補の1件分を表す型
 */
export type AutocompletePrediction = {
  /** 候補として表示される地名や施設名（例: "渋谷駅, 日本"） */
  description: string;
  /** プレイスID（Place Details APIなどで詳細取得に使用） */
  place_id: string;
  /** サブ情報（例: "Shibuya City, Tokyo"）※ structured_formatting から抽出可 */
  secondary_text?: string;
};

/**
 * AutocompleteResult:
 * Google Places API のオートコンプリート結果レスポンス型
 */
export type AutocompleteResult = {
  /** 候補のリスト（通常最大5〜10件が返る） */
  predictions: AutocompletePrediction[];
};
