import { instanse } from './axiosInstance';

type Method = 'get' | 'post' | 'put' | 'delete';

export const fetchData = async (
  url: string,
  method: Method,
  reqData?: unknown,
) => {
  try {
    const { data } = await instanse({ url, method, data: reqData });
    return data;
  } catch (error) {
    console.error(error);
  }
};

instanse.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);
instanse.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  },
);
