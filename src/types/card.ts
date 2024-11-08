import { PageFeature } from "./pageFeatures";
import { ObjectId } from "mongodb";

export interface Card {
  _id: ObjectId;
  userId: ObjectId;
  pages: Page[];
}

export interface Page {
  pageNumber: number;
  pageFeatures?: PageFeature[];
  pageColor?: string;
}
