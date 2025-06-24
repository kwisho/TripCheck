import { useRouter } from 'expo-router';
import { ApiError, apiFetch } from '@/api/common/httpClient';
import { HttpMethod } from '@trip-check/types';
import { formatResponseBodyRecursive, generalDateProperties } from '@trip-check/utils';

export function useApiFetch() {
  const router = useRouter();

  async function wrappedApiFetch<T, R>(
    path: string,
    method: HttpMethod,
    body?: T,
    dateProps?: string[]
  ): Promise<R | undefined> {
    try {
      const response = await apiFetch<T, R>(path, method, body);
      if (response) {
        // 日付変換対象のキーをマージ
        const allDateProps = [...generalDateProperties, ...(dateProps ?? [])];
        // レスポンスの文字列化→再パースして日付変換
        const res = formatResponseBodyRecursive<R>(JSON.stringify(response), allDateProps);

        console.log(res);

        return res;
      }
      return undefined;
    } catch (error: any) {
      if (error instanceof ApiError && error.status === 401) {
        // Unauthorizedならログイン画面へ遷移
        router.push('/login');
      }
      throw error;
    }
  }

  return wrappedApiFetch;
}
