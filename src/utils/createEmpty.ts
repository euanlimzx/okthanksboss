import { Card, Page } from "@/types/card";
import { ObjectId } from "mongodb";

export function createEmptyCard(userIdString: string): Card {
  return {
    _id: new ObjectId(),
    userId: new ObjectId(userIdString),
    pages: [createEmptyPage()],
  };
}

export function createEmptyPage(): Page {
  return {
    pageNumber: 1,
    pageFeatures: [
      {
        featureType: "header",
        textContent: "",
        textColor: "black",
      },
      {
        featureType: "body",
        textContent: "",
        textColor: "black",
      },
      // TODO: change if necessary welps, not sure what to add for asset
    ],
    pageColor: "white",
  };
}
