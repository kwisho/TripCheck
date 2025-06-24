import * as SecureStore from 'expo-secure-store';
import { CognitoRefreshToken } from 'amazon-cognito-identity-js';
import { getCurrentCognitoUser } from './auth';
import { storage } from '@/utils/storage';

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
    user.refreshSession(
      refreshToken,
      (
        err: string,
        session: {
          getIdToken: () => {
            (): string;
            new (): string;
            getJwtToken: { (): string; new (): string };
          };
        }
      ) => {
        if (err) {
          reject(err);
        } else {
          const newIdToken: string = session.getIdToken().getJwtToken();
          storage.setItem('idToken', newIdToken);
          resolve(newIdToken);
        }
      }
    );
  });
}
