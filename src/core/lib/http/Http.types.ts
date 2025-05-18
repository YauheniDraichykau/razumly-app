import { AxiosPromise, AxiosRequestConfig, Method } from "axios";

export type HttpMethod = Method;

export type HttpServiceRequestConfig = Omit<AxiosRequestConfig, "url" | "data">;

export type Http = {
	get: <T = unknown>(
		url: string,
		requestConfig?: HttpServiceRequestConfig,
	) => AxiosPromise<T>;
	post: <T = unknown, R = unknown>(
		url: string,
		data: T,
		requestConfig?: HttpServiceRequestConfig,
	) => AxiosPromise<R>;
	delete: <T = unknown>(
		url: string,
		requestConfig?: HttpServiceRequestConfig,
	) => AxiosPromise<T>;
	patch: <T = unknown, R = unknown>(
		url: string,
		data: T,
		requestConfig?: HttpServiceRequestConfig,
	) => AxiosPromise<R>;
	put: <T = unknown, R = unknown>(
		url: string,
		data: T,
		requestConfig?: HttpServiceRequestConfig,
	) => AxiosPromise<R>;
};

export type RequestParams<T> = {
	url: string;
	method: HttpMethod;
	data?: T;
	config?: HttpServiceRequestConfig;
};

export type Fetcher<T = unknown, R = unknown> = (
	params: AxiosRequestConfig<T>,
) => AxiosPromise<R>;
