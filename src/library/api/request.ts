import { toQueryString } from "./utils/toQueryString";
import { isJsonResponse } from "./utils/isJsonResponse";
import { API_BASE_URL } from "./configuration";

export type Primitive = string | number | boolean | null | undefined;
export type QueryParams = Record<string, Primitive>;

export type ApiRequestConfig = {
  method?: "GET" | "POST" | "PUT" | "DELETE";
  headers?: Record<string, string>;
  queryParams?: QueryParams;
  bodyParams?: Record<string, unknown>;
  formData?: FormData;
  getToken?: () => string | undefined;
};

export async function request<T>(
  endpoint: string,
  {
    method = "GET",
    headers = {},
    queryParams,
    bodyParams,
    formData,
    getToken,
  }: ApiRequestConfig
): Promise<T> {
  let url = API_BASE_URL + endpoint;
  if (queryParams) {
    const queryString = toQueryString(queryParams);
    if (queryString) {
      url += `?${queryString}`;
    }
  }

  const token = getToken?.();
  const allHeaders: Record<string, string> = {
    Accept: "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...headers,
  };

  let body: BodyInit | undefined;
  if (formData) {
    body = formData;
    delete allHeaders["Content-Type"];
  } else if (method !== "GET" && bodyParams) {
    allHeaders["Content-Type"] = "application/json";
    body = JSON.stringify(bodyParams);
  }

  const response = await fetch(url, {
    method,
    headers: allHeaders,
    body,
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || `API Error: ${response.status}`);
  }

  if (isJsonResponse(response)) {
    return (await response.json()) as T;
  }

  return (await response.text()) as unknown as T;
}
