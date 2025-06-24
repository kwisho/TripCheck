import pool from '@/auth/cognitoConfig';
import { CognitoUser, CognitoUserSession } from 'amazon-cognito-identity-js';

/**
 * 現在ログイン中のCognitoユーザーを取得する非同期関数。
 * ユーザーがログインしておらず、またはセッションが無効な場合は null を返す。
 *
 * @returns {Promise<CognitoUser | null>} 有効なログインユーザーがいれば CognitoUser、いなければ null
 */
export const getCurrentUser = (): Promise<CognitoUser | null> => {
  return new Promise((resolve, _reject) => {
    // 現在のCognitoユーザーを取得（ログインしていなければ null）
    const user = pool.getCurrentUser();

    // ユーザーが存在しない場合は null を返す
    if (!user) return resolve(null);

    // ユーザーのセッション情報を取得
    user.getSession((err: Error | null, session: CognitoUserSession | null) => {
      // エラーまたはセッションが無効な場合は null を返す
      if (err || !session?.isValid()) return resolve(null);

      // セッションが有効な場合はユーザーを返す
      resolve(user);
    });
  });
};

/**
 * 現在のCognitoユーザーを即座に取得する（セッションの有効性は検証しない）。
 *
 * 注意：この関数はログイン済みかどうかは確認しません。
 * 実際にログイン状態を確認したい場合は getCurrentUser() を使用してください。
 *
 * @returns {CognitoUser | null} 現在のユーザー、または未ログインなら null
 */
export function getCurrentCognitoUser(): CognitoUser | null {
  return pool.getCurrentUser();
}

/**
 * idTokenの有効期限を判別する
 * @param token
 * @returns {boolean}
 */
export function isTokenExpired(token: string): boolean {
  try {
    const [, payloadBase64] = token.split('.');
    const payload = JSON.parse(atob(payloadBase64));
    const now = Math.floor(Date.now() / 1000);
    return payload.exp < now;
  } catch (error) {
    console.warn('Invalid token', error);
    return true;
  }
}
