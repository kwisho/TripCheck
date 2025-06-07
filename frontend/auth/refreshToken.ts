import pool from '@/auth/cognitoConfig';
import * as SecureStore from 'expo-secure-store';
import { CognitoRefreshToken, CognitoUser } from 'amazon-cognito-identity-js';

/**
 * Cognitoで認証したユーザ情報を取得する
 * @returns {CognitoUser | null}
 */
function getCurrentCognitoUser(): CognitoUser | null {
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

/**
 * refreshTokenを使用して、idTokenを再取得する
 * @returns {Promise<string | null>}
 */
export async function refreshToken(): Promise<string | null> {
  const refreshTokenStr = SecureStore.getItem('refreshToken');
  if (!refreshTokenStr) return null;

  const user = getCurrentCognitoUser();
  if (!user) return null;

  const refreshToken = new CognitoRefreshToken({ RefreshToken: refreshTokenStr });

  return new Promise((resolve, reject) => {
    user.refreshSession(refreshToken, (err, session) => {
      if (err) {
        reject(err);
      } else {
        const newIdToken = session.getIdToken().getJwtToken();
        SecureStore.setItemAsync('idToken', newIdToken);
        resolve(newIdToken);
      }
    });
  });
}
