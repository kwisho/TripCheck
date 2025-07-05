export const API_ENDPOINTS = {
  /** 旅程 */
  plans: {
    getAll: () => `/plans`,
    getById: (id: string) => `/plans/${id}`,
    create: () => `/plans`,
    update: (id: string) => `/plans/${id}`,
    delete: (id: string) => `/plans/${id}`,
  },
  /** マップ・経路 */
  map: {
    fetchDistance: () => `/maps`,
  },
};
