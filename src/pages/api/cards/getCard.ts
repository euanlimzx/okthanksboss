import type { NextApiRequest, NextApiResponse } from "next";
import MongoDB from "../services/db/mongoDB";
import DB from "../services/db/DB";
import { Card } from "@/types/card";
import { ErrorResponse } from "@/types/apiError";
import { BSON, InsertOneOptions } from "mongodb";

// for now I am creating a new instance of the DB everytime, but its reusing the same connection
// not sure if this is the best way to be doing this honestly

const db: DB<InsertOneOptions> = new MongoDB();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Card | null | ErrorResponse>,
) {
  const fullUrl = `http://${process.env.HOST ?? "localhost"}${req.url}`;

  const { cardIdString } = req.query;

  if (!cardIdString) {
    return res.status(400).json({
      error: true,
      errorMessage: "Missing required arguments",
      params: req.query,
      route: fullUrl,
    });
  }
  try {
    const card = await db.getCard(cardIdString as string);
    return res.status(200).json(card);
  } catch (err) {
    // this is to catch a BSON Parsing error
    if (err instanceof BSON.BSONError)
      return res.status(404).json({
        error: true,
        errorMessage: `cardId: ${cardIdString} not found`,
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
