import type { NextApiRequest, NextApiResponse } from "next";
import MongoDB from "../services/db/mongoDB";
import DB from "../services/db/DB";
import { Card } from "@/types/card";
import { ErrorResponse } from "@/types/apiError";
import { FindOneAndDeleteOptions, InsertOneOptions } from "mongodb";
import { zodMongoDBId } from "@/types/mongodbId";
import { ZodError } from "zod";

// for now I am creating a new instance of the DB everytime, but its reusing the same connection
// not sure if this is the best way to be doing this honestly

const db: DB<InsertOneOptions, FindOneAndDeleteOptions> = new MongoDB();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Card[] | ErrorResponse>,
) {
  if (req.method === "GET") {
    const fullUrl = `http://${process.env.HOST ?? "localhost"}${req.url}`;
    const userIdString = req.query.userIdString as string | undefined;

    if (!userIdString) {
      return res.status(400).json({
        error: true,
        errorMessage: "Missing required arguments",
        params: req.query,
        route: fullUrl,
      });
    }

    try {
      zodMongoDBId.parse(userIdString);
      const allCards = await db.getAllCardsForUser(userIdString);
      return res.status(200).json(allCards);
    } catch (err) {
      // this is to catch a BSON Parsing error
      if (err instanceof ZodError)
        return res.status(404).json({
          error: true,
          errorMessage: `userId: ${userIdString} invalid`,
          params: req.query,
          route: fullUrl,
        });

      return res.status(500).json({
        error: true,
        errorMessage: `Internal server error`,
        params: req.query,
        route: fullUrl,
      });
    }
  }
}
