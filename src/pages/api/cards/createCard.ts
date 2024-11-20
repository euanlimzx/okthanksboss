import type { NextApiRequest, NextApiResponse } from "next";
import MongoDB from "../services/db/mongoDB";
import DB from "../services/db/DB";
import { zodCard, Card } from "@/types/card";
import { ErrorResponse } from "@/types/apiError";
import { ZodError } from "zod";
import { createEmptyCard } from "@/utils/createEmpty";
import { FindOneAndDeleteOptions, InsertOneOptions } from "mongodb";

// for now I am creating a new instance of the DB everytime, but its reusing the same connection
// not sure if this is the best way to be doing this honestly

const db: DB<InsertOneOptions, FindOneAndDeleteOptions> = new MongoDB();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Card | null | ErrorResponse>,
) {
  if (req.method === "POST") {
    const fullUrl = `http://${process.env.HOST ?? "localhost"}${req.url}`;

    try {
      // function assumes that the card is empty!
      const { userIdString } = req.body;
      const newCard = zodCard.parse(createEmptyCard(userIdString));
      const createdCard = await db.createNewCardAndAddToUser(
        userIdString,
        newCard,
      );

      return res.status(201).json(createdCard);

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (e) {
      if (e instanceof ZodError) {
        return res.status(400).json({
          error: true,
          errorMessage: "Missing required arguments",
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

// NOTE: This is what the return value currently looks like:
// {
// "acknowledged": true,
// "insertedId": "6737e41954510e049c65be62"
// }
// Might wanna modify it later
