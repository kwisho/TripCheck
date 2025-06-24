import { isTokenExpired } from '@/auth/auth';
import { refreshToken } from '@/auth/refreshToken';
import { storage } from '@/utils/storage';
import { HttpMethod } from '@trip-check/types';
import { ProblemDetails } from '@trip-check/utils';

const baseApiUri = process.env.EXPO_PUBLIC_BASE_API_URI;

export class ApiError extends Error {
  status: number;
  title: string;
  detail?: unknown;

  constructor(problem: ProblemDetails) {
    super(problem.title);
    this.name = 'ApiError';
    this.status = problem.status;
    this.title = problem.title;
    this.detail = problem.detail;
  }

  static unauthorized(): ApiError {
    return new ApiError({
      type: 'https://tools.ietf.org/html/rfc7235#section-3.1',
      title: 'Unauthorized',
      status: 401,
      detail: {
        reason: 'ID token is missing or expired.',
      },
    });
  }
}

export async function apiFetch<T, R>(path: string, method: HttpMethod, body?: T): Promise<R> {
  let idToken = await storage.getItem('idToken');

  if (!idToken || isTokenExpired(idToken)) {
    try {
      idToken = await refreshToken();
    } catch (error) {
      throw ApiError.unauthorized();
    }
  }

  const headers = {
    'Content-Type': 'application/json',
    ...(idToken ? { Authorization: `Bearer ${idToken}` } : {}),
  };

  const res = await fetch(`${baseApiUri}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  const contentType = res.headers.get('Content-Type') ?? '';

  if (!res.ok) {
    if (contentType.includes('application/problem+json')) {
      const problem: ProblemDetails = await res.json();
      throw new ApiError(problem);
    } else {
      const text = await res.text();
      throw new Error(`API Error: ${res.status} ${text}`);
    }
  }

  return res.json() as R;
}
