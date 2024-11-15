import type { NextApiRequest, NextApiResponse } from "next";
import MongoDB from "../services/db/mongoDB";
import DB from "../services/db/DB";
import { Card } from "@/types/card";
import { ErrorResponse } from "@/types/apiError";
import { parseUrlParams } from "../services/helper";

// for now I am creating a new instance of the DB everytime, but its reusing the same connection
// not sure if this is the best way to be doing this honestly

const db: DB = new MongoDB();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Card[] | ErrorResponse>,
) {
  const fullUrl = new URL(
    `http://${process.env.HOST ?? "localhost"}${req.url}`,
  );
  const userIdString = fullUrl.searchParams.get("userIdString");

  if (!userIdString) {
    return res.status(400).json({
      error: true,
      errorMessage: "Missing required arguments",
      params: parseUrlParams(fullUrl.searchParams),
      route: fullUrl,
    });
  }

  const allCards = await db.getAllCardsForUser(userIdString);
  return res.status(200).json(allCards);
}
