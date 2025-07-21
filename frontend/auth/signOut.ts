import { storage } from '@/utils/storage';
import { getCurrentUser } from './auth';

/**
 * サインアウト処理（ローカル・セキュアストレージ両方をクリア）
 * @returns {Promise<void>}
 */
export const signOut = async (): Promise<void> => {
  const user = await getCurrentUser();

  if (user) {
    // ローカルで認証情報を削除
    user.signOut();

    // secure-storage からトークンを削除
    await storage.deleteItem('idToken');
    await storage.deleteItem('refreshToken');

    console.log('サインアウト完了');
  } else {
    console.log('現在ログインしているユーザーが見つかりません');
  }
};
