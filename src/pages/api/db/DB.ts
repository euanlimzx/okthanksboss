import { User } from "@/types/user";
import { Card } from "@/types/card";

export abstract class DB<ObjectIdType> {
  abstract getUser(id: ObjectIdType): User;

  abstract getCards(): Card[];

  // TODO @Shawn: Not sure if this function would have to change based on if you are getting the card for viewing / editing -> As of now I dont think so
  abstract getCard(id: ObjectIdType): Card;

  // returns the id of the new card that you are creating
  abstract createCard(userId: ObjectIdType): Card;

  // returns the card with the changes implemented
  // will need to implement some kind of diff checker to only update the fields -> not sure if mongoDB does this already
  abstract updateCard(cardId: ObjectIdType, cardData: Card): Card;

  // returns the deleted card
  abstract deleteCard(cardId: ObjectIdType): Card;
}
