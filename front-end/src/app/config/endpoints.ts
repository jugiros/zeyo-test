export const API_ENDPOINTS = {
  BASE_URL: 'http://localhost:3000',
  PROCESOS: {
    GET_ALL: '/api/procesos',
    CREATE: '/api/procesos',
    UPDATE: (id: number) => `/api/procesos/${id}`,
    DELETE: (id: number) => `/api/procesos/${id}`
  }
} as const;
