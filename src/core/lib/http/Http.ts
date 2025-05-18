import axios, {
  AxiosInstance,
  AxiosPromise,
  AxiosRequestConfig,
  InternalAxiosRequestConfig,
} from 'axios';
import qs from 'qs';
import { AxiosBuilderService } from './AxiosBuilder';
import { Fetcher, Http, RequestParams } from './Http.types';
import { RequestInterceptorParams } from './AxiosBuilder/AxiosBuilder.types';
import { getSession } from 'next-auth/react';
import { logout } from '../auth';
import { authStore } from '@auth/store/Auth.store';

declare module 'next-auth' {
  interface Session {
    accessToken?: string;
  }
}

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

class HttpService implements Http {
  private fetcher: AxiosInstance;

  constructor() {
    this.fetcher = new AxiosBuilderService()
      .setRequestInterceptor({
        onFulfilled: async (config) => {
          const accessToken = authStore.accessToken;

          if (accessToken) {
            return {
              ...config,
              headers: {
                ...config.headers,
                Authorization: `Bearer ${accessToken}`,
              },
            };
          }

          return config;
        },
        onRejected: async (error) => {
          return Promise.reject(error);
        },
      } as RequestInterceptorParams<InternalAxiosRequestConfig<unknown>>)
      .setResponseInterceptor({
        onFulfilled: (value) => {
          return value;
        },
        onRejected: async (error) => {
          const original = error.config as AxiosRequestConfig & { _retry?: boolean };

          if (error.response?.status === 401 && !original?._retry) {
            if (!!original?._retry) {
              await logout();
              return Promise.reject(error);
            } else {
              try {
                const res = await api.post('/auth/refresh');
                const newToken = res.data.accessToken;

                authStore.setAccessToken(newToken);

                const s = await getSession();

                Object.assign(s!, { accessToken: newToken });
              } catch (e) {
                original._retry = true;
                return Promise.reject(error);
              }
            }
          }

          original._retry = true;

          return Promise.reject(error);
        },
      })
      .getInstance();
  }

  private request<T = unknown, R = unknown>({
    url,
    data,
    config,
    method = 'GET',
  }: RequestParams<T>): AxiosPromise<R> {
    const options: AxiosRequestConfig<T> = {
      url: `${url}`,
      method: method,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      data: method !== 'GET' ? data : undefined,
      paramsSerializer: (params) => qs.stringify(params, { arrayFormat: 'repeat' }),
    };

    return (this.fetcher as Fetcher<T, R>)({
      ...options,
      ...config,
    });
  }

  public get<R = unknown>(url: string, config?: AxiosRequestConfig<R>): AxiosPromise<R> {
    return this.request<unknown, R>({ url, config, method: 'GET' });
  }

  public post<T = unknown, R = unknown>(
    url: string,
    data: T,
    config?: AxiosRequestConfig,
  ): AxiosPromise<R> {
    return this.request<T, R>({
      url,
      data,
      config,
      method: 'POST',
    });
  }

  public delete<T = unknown, R = unknown>(
    url: string,
    config?: AxiosRequestConfig,
  ): AxiosPromise<R> {
    return this.request<T, R>({ url, config, method: 'DELETE' });
  }

  public patch<T = unknown, R = unknown>(
    url: string,
    data: T,
    config?: AxiosRequestConfig,
  ): AxiosPromise<R> {
    return this.request<T, R>({
      url,
      data,
      config,
      method: 'PATCH',
    });
  }

  public put<T = unknown, R = unknown>(
    url: string,
    data: T,
    config?: AxiosRequestConfig,
  ): AxiosPromise<R> {
    return this.request<T, R>({
      url,
      data,
      config,
      method: 'PUT',
    });
  }
}

export const httpService = new HttpService();
