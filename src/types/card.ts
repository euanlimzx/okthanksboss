import { PageFeature } from "./pageFeatures";
import { ObjectId } from "mongodb";

export interface Card {
  _id: ObjectId;
  userId: ObjectId;
  pages: Page[];
}

export interface Page {
  pageNumber: number;
  pageFeatures: PageFeature[];
  //made pageFeatures a compulsory field, when I create a blank page I'll supply an empty list
  pageColor?: string;
}
