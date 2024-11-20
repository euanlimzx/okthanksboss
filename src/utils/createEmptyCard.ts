import { Card } from "@/types/card";
import { ObjectId } from "mongodb";
import { createEmptyPage } from "./createEmptyPage";

export function createEmptyCard(userIdString: string): Card {
  return {
    _id: new ObjectId(),
    userId: new ObjectId(userIdString),
    pages: [createEmptyPage()],
  };
}

//removed createEmptyPage from here because mongodb is a server-side library, but we want createEmptyCard to run client side as well
