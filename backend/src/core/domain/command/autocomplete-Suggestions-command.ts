export class AutoCompleteSuggestionsCommand {
  /** 入力文字列（例: "渋谷"） */
  input: string
  /** セッションごとに一意のトークン（課金最適化・パフォーマンス向上） */
  sessionToken?: string
  /** 現在地など、位置情報に基づいた検索バイアス */
  location?: {
    lat: number
    lng: number
  }
  /** location を使う場合の検索半径（メートル） */
  radius?: number
  /** 表示する言語（例: "ja", "en"） */
  language?: string
  /** 国コードなどで検索対象を制限（例: "country:jp"） */
  components?: string
  /** 結果のタイプを限定（例: "geocode", "establishment"） */
  types?: string
  /** 厳密なバイアス制限を行うかどうか */
  strictbounds?: boolean

  constructor(params: {
    input: string
    sessionToken?: string
    location?: { lat: number; lng: number }
    radius?: number
    language?: string
    components?: string
    types?: string
    strictbounds?: boolean
  }) {
    this.input = params.input
    this.sessionToken = params.sessionToken
    this.location = params.location
    this.radius = params.radius
    this.language = params.language
    this.components = params.components
    this.types = params.types
    this.strictbounds = params.strictbounds
  }
}
