import { useApiFetch } from '@/hooks/useApiFetch';
import { useCallback } from 'react';
import { API_ENDPOINTS } from '../common/endpoints';
import {
  AutocompleteParams,
  AutocompleteResult,
  FetchDistanceParams,
  FetchDistanceResult,
} from '@trip-check/types';

export function useMapApi() {
  const apiFetch = useApiFetch();

  /** 経路情報を取得する */
  const fetchDistance = useCallback(
    (params: FetchDistanceParams): Promise<FetchDistanceResult> => {
      const searchParams = new URLSearchParams({
        fromLocation: JSON.stringify(params.fromLocation),
        toLocation: JSON.stringify(params.toLocation),
        departureTime: params.departureTime.toISOString(),
        transportType: params.transportType,
      });

      const url = `${API_ENDPOINTS.map.fetchDistance()}?${searchParams.toString()}`;

      return apiFetch<void, FetchDistanceResult>(url, 'GET') as Promise<FetchDistanceResult>;
    },
    [apiFetch]
  );

  /** 場所のオートコンプリート候補を取得する */
  const fetchAutocomplete = useCallback(
    (params: AutocompleteParams): Promise<AutocompleteResult> => {
      const searchParams = new URLSearchParams();

      searchParams.set('input', params.input);
      searchParams.set('language', params.language);

      if (params.sessionToken) {
        searchParams.set('sessionToken', params.sessionToken);
      }

      const url = `${API_ENDPOINTS.map.fetchAutocomplete()}?${searchParams.toString()}`;

      return apiFetch<void, AutocompleteResult>(url, 'GET') as Promise<AutocompleteResult>;
    },
    []
  );

  return { fetchDistance, fetchAutocomplete };
}
