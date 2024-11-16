export type RouteArguments = { [k: string]: string | string[] | undefined };

export interface ErrorResponse {
  error: boolean;
  errorMessage: string;
  params?: RouteArguments;
  route: URL;
}
