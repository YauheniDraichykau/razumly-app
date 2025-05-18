import { AxiosError, AxiosInstance, AxiosResponse } from "axios";

export type AxiosBuilder = {
	getInstance: () => AxiosInstance;
};

export type InterceptorParams<T> = {
	onFulfilled?: (value: T) => T | Promise<T>;
	onRejected?: (error: AxiosError) => unknown;
};

export type RequestInterceptorParams<T> = InterceptorParams<T>;

export type ResponseInterceptorParams = RequestInterceptorParams<AxiosResponse>;
