export interface IHttpClientResponse<T> {
  statusCode: number;
  data: T;
}

export interface IHttpClient {
  get<T>(path: string): Promise<IHttpClientResponse<T>>;
}
