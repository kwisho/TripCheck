export const API_ENDPOINTS = {
  plans: {
    getAll: () => `/plans`,
    getById: (id: string) => `/plans/${id}`,
    create: () => `/plans`,
    update: (id: string) => `/plans/${id}`,
    delete: (id: string) => `/plans/${id}`,
  },
};
