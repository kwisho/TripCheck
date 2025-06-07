import { CognitoUser } from 'amazon-cognito-identity-js';
import pool from './cognitoConfig';

/**
 * 確認コードの確認を実施し、ユーザー登録を行う
 * @param email
 * @param code
 * @returns {Promise<string>}
 */
export const confirmSignUp = (email: string, code: string): Promise<string> => {
  const user = new CognitoUser({ Username: email, Pool: pool });
  return new Promise((resolve, reject) => {
    user.confirmRegistration(code, true, (err) => {
      if (err) {
        reject(err.message || JSON.stringify(err));
      } else {
        resolve('確認完了!ログインできます。');
      }
    });
  });
};
