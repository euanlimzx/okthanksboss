// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name: string;
};

// seems like this is loading after handler is evoked :()
// const db: DB = new MongoDB();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  // console.log(await db.getAllCardsForUser("123"));
  res.status(200).json({ name: "Hello Works" });
}
