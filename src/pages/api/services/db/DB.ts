import { User } from "@/types/user";
import { Card } from "@/types/card";

abstract class DB {
  abstract getAllCardsForUser(userIdString: string): Promise<Card[]>;

  // TODO @Shawn: Not sure if this function would have to change based on if you are getting the card for viewing / editing -> As of now I dont think so
  abstract getCard(cardIdString: string): Promise<Card>;

  // returns the id of the new card that you are creating
  abstract createCard(newCard: Card): Promise<Card>;

  // returns the card with the changes implemented
  // will need to implement some kind of diff checker to only update the fields -> not sure if mongoDB does this already
  abstract updateCard(cardIdString: string, updatedCard: Card): Promise<Card>;

  // returns the deleted card
  abstract deleteCard(cardIdString: string): Promise<Card>;

  abstract getUser(userIdString: string): Promise<User>;

  abstract addCardToUser(
    userIdString: string,
    cardIdString: string,
  ): Promise<void>;
}

export default DB;
