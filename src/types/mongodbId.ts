import { ObjectId } from "mongodb";
import { z } from "zod";

// made this just for consistency and so that error detection is simple
export const zodMongoDBId = z.union([
  z.instanceof(ObjectId),
  z.string().transform((idString) => new ObjectId(idString)),
]);
