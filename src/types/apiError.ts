import { z } from "zod";

export const zodRouteArguments = z.record(
  z.string(),
  z.union([z.string(), z.array(z.string()), z.undefined()]),
);

export type RouteArguments = z.infer<typeof zodRouteArguments>;

export const zodErrorResponse = z.object({
  error: z.boolean(),
  errorMessage: z.string(),
  params: zodRouteArguments,
  route: z.string().url(),
});

export type ErrorResponse = z.infer<typeof zodErrorResponse>;
