import type { NextApiRequest, NextApiResponse } from "next";
import MongoDB from "../services/db/mongoDB";
import DB from "../services/db/DB";
import { Card } from "@/types/card";
import { ErrorResponse } from "@/types/apiError";

// for now I am creating a new instance of the DB everytime, but its reusing the same connection
// not sure if this is the best way to be doing this honestly

const db: DB = new MongoDB();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Card | null | ErrorResponse>,
) {
  if (req.method === "POST") {
    const fullUrl = new URL(
      `http://${process.env.HOST ?? "localhost"}${req.url}`,
    );

    // should I do some JSON validation here
    const card = req.body;

    // checks if the object is empty
    if (Object.keys(card).length === 0) {
      return res.status(400).json({
        error: true,
        errorMessage: "Missing required arguments",
        params: req.body,
        route: fullUrl,
      });
    }

    try {
      const createdCard = await db.createCard(card);
      return res.status(201).json(createdCard);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (e) {
      return res.status(500).json({
        error: true,
        errorMessage: `Internal server error`,
        params: req.query,
        route: fullUrl,
      });
    }
  }
}

// NOTE: This is what the return value currently looks like:
// {
// "acknowledged": true,
// "insertedId": "6737e41954510e049c65be62"
// }
// Might wanna modify it later
