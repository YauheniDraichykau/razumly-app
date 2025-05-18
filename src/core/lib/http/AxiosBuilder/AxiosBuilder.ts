import axios, { AxiosInstance, InternalAxiosRequestConfig } from 'axios';
import {
  AxiosBuilder,
  RequestInterceptorParams,
  ResponseInterceptorParams,
} from './AxiosBuilder.types';

export class AxiosBuilderService implements AxiosBuilder {
  private readonly axiosInstance: AxiosInstance;

  public constructor() {
    this.axiosInstance = axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_URL,
      withCredentials: true,
    });
  }

  public setRequestInterceptor({
    onFulfilled,
    onRejected,
  }: RequestInterceptorParams<InternalAxiosRequestConfig<unknown>>): this {
    this.axiosInstance.interceptors.request.use(onFulfilled, onRejected);

    return this;
  }

  public setResponseInterceptor({ onFulfilled, onRejected }: ResponseInterceptorParams): this {
    this.axiosInstance.interceptors.response.use(onFulfilled, onRejected);
    return this;
  }

  public getInstance(): AxiosInstance {
    return this.axiosInstance;
  }
}
