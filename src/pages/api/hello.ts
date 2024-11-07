// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { MongoDB } from "./db/mongoDB";

type Data = {
  name: string;
};

// seems like this is loading after handler is evoked :()
const db = new MongoDB();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  const result = await db.getCards();
  console.log(result);
  res.status(200).json({ name: "Hello Works" });
}
