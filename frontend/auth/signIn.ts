import { AuthenticationDetails, CognitoUser } from 'amazon-cognito-identity-js';
import pool from './cognitoConfig';
import { storage } from '@/utils/storage';

/**
 * ログイン処理を実施する
 * @param email
 * @param password
 * @returns {Promise<string>}
 */
export const signIn = (email: string, password: string): Promise<string> => {
  const authDetails = new AuthenticationDetails({
    Username: email,
    Password: password,
  });

  const user = new CognitoUser({
    Username: email,
    Pool: pool,
  });

  return new Promise((resolve, reject) => {
    user.authenticateUser(authDetails, {
      onSuccess: async (result) => {
        // secure-storageに保存する
        const idToken = result.getIdToken().getJwtToken();
        const refreshToken = result.getRefreshToken().getToken();
        await storage.setItem('idToken', idToken);
        await storage.setItem('refreshToken', refreshToken);
        resolve(`ログイン成功！トークン：${idToken}`);
      },
      onFailure: (err) => {
        reject(err.message || JSON.stringify(err));
      },
    });
  });
};
