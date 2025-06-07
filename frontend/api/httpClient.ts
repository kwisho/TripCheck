import { isTokenExpired, refreshToken } from '@/auth/refreshToken';
import * as SecureStore from 'expo-secure-store';
const baseApiUri = process.env.EXPO_PUBLIC_COGNITO_USER_POOL_ID;

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

export async function httpClient<T, R>(path: string, method: HttpMethod, body?: T): Promise<R> {
  // expo-secure-storeでidTokenを取得する
  let idToken = await SecureStore.getItemAsync('idToken');

  // idTokenが無いまたは期限切れならリフレッシュする
  if (!idToken || isTokenExpired(idToken)) {
    try {
      idToken = await refreshToken();
    } catch (error) {
      console.error('トークン更新失敗', error);
      throw new Error('セッションの有効期限が切れています。再ログインしてください。');
    }
  }
  const headers = {
    'Content-Type': 'application/json',
    ...(idToken ? { Authorization: `Bearer ${idToken}` } : {}),
  };
  const res = await fetch(`${baseApiUri}, ${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!res.ok) {
    const errorBody = await res.text();
    throw new Error(`API Error: ${res.status} ${errorBody}`);
  }

  return res.json();
}
