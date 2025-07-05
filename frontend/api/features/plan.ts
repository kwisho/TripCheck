import { useApiFetch } from '@/hooks/useApiFetch';
import { FullPlan, Plan } from '@trip-check/types';
import { GetPagedResult } from '@trip-check/utils';
import { useCallback } from 'react';
import { API_ENDPOINTS } from '../common/endpoints';

export function usePlanApi() {
  const apiFetch = useApiFetch();
  const dateProps = [
    'startDate',
    'endDate',
    'locationStartDate',
    'locationEndDate',
    'arrivalTime',
    'departureTime',
    'createdAt',
    'updatedAt',
  ];

  const getPlans = useCallback((): Promise<GetPagedResult<Plan>> => {
    return apiFetch<void, GetPagedResult<Plan>>(
      API_ENDPOINTS.plans.getAll(),
      'GET',
      undefined,
      dateProps
    ) as Promise<GetPagedResult<Plan>>;
  }, [apiFetch]);

  const getPlan = useCallback(
    (id: string): Promise<FullPlan> => {
      return apiFetch<void, FullPlan>(
        API_ENDPOINTS.plans.getById(id),
        'GET',
        undefined,
        dateProps
      ) as Promise<FullPlan>;
    },
    [apiFetch]
  );

  const createPlan = useCallback(
    (plan: Partial<Plan>): Promise<Plan> => {
      return apiFetch<Partial<Plan>, Plan>(
        API_ENDPOINTS.plans.create(),
        'POST',
        plan,
        dateProps
      ) as Promise<Plan>;
    },
    [apiFetch]
  );

  const updatePlan = useCallback(
    (id: string, plan: Partial<Plan>): Promise<Plan> => {
      return apiFetch<Partial<Plan>, Plan>(
        API_ENDPOINTS.plans.update(id),
        'POST',
        plan,
        dateProps
      ) as Promise<Plan>;
    },
    [apiFetch]
  );

  const deletePlan = useCallback(
    (id: string): Promise<void> => {
      return apiFetch<void, void>(API_ENDPOINTS.plans.delete(id), 'DELETE') as Promise<void>;
    },
    [apiFetch]
  );

  return {
    getPlans,
    getPlan,
    createPlan,
    updatePlan,
    deletePlan,
  };
}
