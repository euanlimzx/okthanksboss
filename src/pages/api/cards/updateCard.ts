import type { NextApiRequest, NextApiResponse } from "next";
import MongoDB from "../services/db/mongoDB";
import DB from "../services/db/DB";
import { zodCard, Card } from "@/types/card";
import { ErrorResponse } from "@/types/apiError";
import { ZodError } from "zod";
import { InsertOneOptions } from "mongodb";

const db: DB<InsertOneOptions> = new MongoDB();

// https://www.mongodb.com/community/forums/t/update-document-only-if-new-data-differs-from-current-data/139827/4
// for now I will just implement a simple update -> will try to implement this
// hashing function if there becomes a need for it

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Card | null | ErrorResponse>,
) {
  if (req.method === "POST") {
    const fullUrl = `http://${process.env.HOST ?? "localhost"}${req.url}`;

    const { rawUpdatedCard } = req.body;

    try {
      const parsedUpdatedCard = zodCard.parse(rawUpdatedCard);
      const updatedCard = await db.updateCard(
        parsedUpdatedCard._id.toString(),
        parsedUpdatedCard,
      );
      return res.status(200).json(updatedCard);
    } catch (e) {
      if (e instanceof ZodError) {
        console.error(e);
        return res.status(400).json({
          error: true,
          errorMessage: "Invalid Card data given",
          params: req.body,
          route: fullUrl,
        });
      }

      return res.status(500).json({
        error: true,
        errorMessage: `Internal server error`,
        params: req.query,
        route: fullUrl,
      });
    }
  }
}
