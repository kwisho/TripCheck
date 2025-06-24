import { Plan } from '@trip-check/types';
import { API_ENDPOINTS } from '../common/endpoints';
import { GetPagedResult } from '@trip-check/utils';
import { useApiFetch } from '@/hooks/useApiFetch';

export function usePlanApi() {
  const apiFetch = useApiFetch();
  const dateProps = ['startDate', 'endDate'];

  const getPlans = (): Promise<GetPagedResult<Plan>> =>
    apiFetch<void, GetPagedResult<Plan>>(
      API_ENDPOINTS.plans.getAll(),
      'GET',
      undefined,
      dateProps
    ) as Promise<GetPagedResult<Plan>>;

  const getPlan = (id: string): Promise<Plan> =>
    apiFetch<void, Plan>(
      API_ENDPOINTS.plans.getById(id),
      'GET',
      undefined,
      dateProps
    ) as Promise<Plan>;

  const createPlan = (plan: Partial<Plan>): Promise<Plan> =>
    apiFetch<Partial<Plan>, Plan>(
      API_ENDPOINTS.plans.create(),
      'POST',
      plan,
      dateProps
    ) as Promise<Plan>;

  const updatePlan = (id: string, plan: Partial<Plan>): Promise<Plan> =>
    apiFetch<Partial<Plan>, Plan>(
      API_ENDPOINTS.plans.update(id),
      'POST',
      plan,
      dateProps
    ) as Promise<Plan>;

  const deletePlan = (id: string): Promise<void> =>
    apiFetch<void, void>(API_ENDPOINTS.plans.delete(id), 'DELETE') as Promise<void>;

  return {
    getPlans,
    getPlan,
    createPlan,
    updatePlan,
    deletePlan,
  };
}
