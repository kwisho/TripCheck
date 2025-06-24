import joi from 'joi'
import { BaseEntity } from './base'

/**
 * アプリ独自のユーザー情報
 * - 認証は Cognito に委任する
 */
export type User = BaseEntity & {
  /** Cognito の `sub`（一意なID） */
  cognitoSub: string
  /** 表示名（任意） */
  name?: string
  /** プロフィール画像URLなど（任意） */
  avatarUrl?: string
  /** 登録日など（任意） */
  createdAt: Date
}

export const UserValidator = joi.object<User>().keys({
  id: joi.string().optional(),
  cognitoSub: joi.string().required(),
  name: joi.string().max(100).optional(),
  avatarUrl: joi.string().uri().optional(),
  createdAt: joi.date().required(),
})
