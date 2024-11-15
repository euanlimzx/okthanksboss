import { RouteArguments } from "@/types/apiError";

export function parseUrlParams(urlParams: URLSearchParams): RouteArguments {
  const requestParams: RouteArguments = {};
  for (const keyValuePair of urlParams.toString().split("&")) {
    const [key, value] = keyValuePair.split("=");
    requestParams[key] = value;
  }
  return requestParams;
}
