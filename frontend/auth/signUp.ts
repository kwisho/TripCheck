import pool from './cognitoConfig';

/**
 * Cognitoを使って会員登録をを行う
 * @param email
 * @param password
 * @returns {Promise<string>}
 */
export const signUp = (email: string, password: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    pool.signUp(email, password, [], [], (err) => {
      if (err) {
        reject(err.message || JSON.stringify(err));
      } else {
        resolve('登録成功！メールで確認コードを確認してください。');
      }
    });
  });
};
