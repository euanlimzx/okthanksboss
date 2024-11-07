// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import MongoDB from "./services/db/mongoDB";
import ImageStore from "./services/imageStore/imageStore";

type Data = {
  name: string;
};

// seems like this is loading after handler is evoked :()
const db = new MongoDB();
const is = new ImageStore();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  const result = await db.getUser("672d165609e3d7870d499f25");
  await is.authenticate();
  console.log(result);
  res.status(200).json({ name: "Hello Works" });
}
