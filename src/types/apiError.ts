export type RouteArguments = { [k: string]: string };

export interface ErrorResponse {
  error: boolean;
  errorMessage: string;
  params?: RouteArguments;
  route: URL;
}
