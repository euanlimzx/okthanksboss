import { User } from "@/types/user";
import { Card } from "@/types/card";
import { ObjectId } from "mongodb";

export abstract class DB {
  abstract getUser(id: ObjectId): User;

  // TODO @Shawn: Not sure if this function would have to change based on if you are getting the card for viewing / editing -> As of now I dont think so
  abstract getCard(id: ObjectId): Card;

  // returns the id of the new card that you are creating
  abstract createCard(userId: ObjectId): ObjectId;

  // returns true or false based on whether the update was successful
  // to be called mostly when we auto save to the backend
  // will need to implement some kind of diff checker to only update the fields -> not sure if mongoDB does this already
  abstract updateCard(cardId: ObjectId, cardData: Card): boolean;
}
