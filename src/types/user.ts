import { z } from "zod";
import { zodMongoDBId } from "./mongodbId";

// choice of interface over type here: https://stackoverflow.com/questions/62552096/why-does-typescript-programmers-prefer-interface-over-type
// based on what I understand, type is more like an alias for a long thing, but interface is more to define a custom schema

export const zodUser = z.object({
  _id: zodMongoDBId,
  createdCards: z.array(zodMongoDBId),
});

export type User = z.infer<typeof zodUser>;
