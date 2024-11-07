import { PageFeature } from "./pageFeatures";
import { ObjectId } from "mongodb";

export interface Card {
  _id: ObjectId;
  userId: ObjectId;
  pages: Page[];
  pageColor: string;
}

export interface Page {
  pageNumber: number;
  pageName: string;
  pageFeatures: PageFeature[];
}
