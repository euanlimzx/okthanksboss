import { zodPageFeature } from "./pageFeatures";
import { ObjectId } from "mongodb";
import { z } from "zod";

export const zodPage = z.object({
  pageNumber: z.number(),
  pageFeatures: z.array(zodPageFeature),
  //made pageFeatures a compulsory field, when I create a blank page I'll supply an empty list
  pageColor: z.union([z.string(), z.undefined()]),
});

export type Page = z.infer<typeof zodPage>;

export const zodCard = z.object({
  _id: z.union([
    z.instanceof(ObjectId),
    z.string().transform((idString) => new ObjectId(idString)),
  ]),
  userId: z.union([
    z.instanceof(ObjectId),
    z.string().transform((idString) => new ObjectId(idString)),
  ]),
  pages: z.array(zodPage),
});

export type Card = z.infer<typeof zodCard>;
