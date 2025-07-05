import { useApiFetch } from '@/hooks/useApiFetch';
import { useCallback } from 'react';
import { API_ENDPOINTS } from '../common/endpoints';
import { FetchDistanceParams, FetchDistanceResult } from '@trip-check/types';

export function useMapApi() {
  const apiFetch = useApiFetch();

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

  return { fetchDistance };
}
