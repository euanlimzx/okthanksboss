import type { NextApiRequest, NextApiResponse } from "next";
import MongoDB from "../services/db/mongoDB";
import DB from "../services/db/DB";
import { Card } from "@/types/card";
import { ErrorResponse } from "@/types/apiError";
import { ZodError } from "zod";
import { FindOneAndDeleteOptions, InsertOneOptions } from "mongodb";
import { zodMongoDBId } from "@/types/mongodbId";

const db: DB<InsertOneOptions, FindOneAndDeleteOptions> = new MongoDB();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Card | null | ErrorResponse>,
) {
  if (req.method === "DELETE") {
    const fullUrl = `http://${process.env.HOST ?? "localhost"}${req.url}`;

    const { cardIdString } = req.body;

    try {
      zodMongoDBId.parse(cardIdString);

      const deletedCard = await db.deleteCardAndRemoveFromUser(cardIdString);

      return res.status(200).json(deletedCard);
    } catch (e) {
      if (e instanceof ZodError) {
        console.error(e);
        return res.status(400).json({
          error: true,
          errorMessage: "Invalid Card ID given",
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
