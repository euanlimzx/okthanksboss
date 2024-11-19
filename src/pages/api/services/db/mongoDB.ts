import { User } from "@/types/user";
import { Card } from "@/types/card";
import { ObjectId, MongoClient, Collection } from "mongodb";
import DB from "./DB";

class MongoDB extends DB {
  client: MongoClient | null = null;
  cardCollection: Collection<Card> | null = null;
  userCollection: Collection<User> | null = null;

  async _connect() {
    // checks if there is already a connection that has been established
    // based on my understanding, this is the best way to check if a connection has already been established
    // https://www.mongodb.com/community/forums/t/mongo-isconnected-alternative-for-node-driver-v-4/117041/6
    if (this.client && this.cardCollection && this.userCollection) {
      return;
    }

    console.log("creating new DB connections...");
    const mongoClient = new MongoClient(process.env.MONGODB_URI!);
    await mongoClient.connect();

    this.client = mongoClient!;
    this.cardCollection = this.client
      .db(process.env.OKTHANKSBOSS_DBNAME)
      .collection("Card")!;
    this.userCollection = this.client
      .db(process.env.OKTHANKSBOSS_DBNAME)
      .collection("User")!;
  }

  async getAllCardsForUser(userIdString: string): Promise<Card[]> {
    // TODO @SW: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy
    // create a proxy object that automates the calling of the connect function before each function call, but I think there is no need for that for now
    const userId = new ObjectId(userIdString);

    try {
      await this._connect();
      if (!this.cardCollection) {
        throw new Error("Could not connect to the database");
      }

      const cards = (await this.cardCollection
        .find({ userId })
        .toArray()) as Card[];
      return cards;
    } catch (e) {
      console.error(
        "Error fetching all the cards belonging to user: ",
        userIdString,
        e,
      );
      throw e;
    }
  }

  async getCard(cardIdString: string): Promise<Card> {
    const cardId = new ObjectId(cardIdString);

    try {
      await this._connect();
      if (!this.cardCollection) {
        throw new Error("Could not connect to the database");
      }

      const card = (await this.cardCollection.findOne(cardId)) as Card;
      return card;
    } catch (e) {
      console.error("Error fetching card: ", cardIdString, e);
      throw e;
    }
  }

  async createCard(newCard: Card): Promise<Card> {
    try {
      await this._connect();
      if (!this.cardCollection) {
        throw new Error("Could not connect to the database");
      }

      // addded as unknown here because IDK how to resolve this TS error ew
      const createdCard = await this.cardCollection.insertOne(newCard);
      return { ...newCard, _id: createdCard.insertedId };
    } catch (e) {
      console.error("Error creating card: ", e);
      throw e;
    }
  }

  async updateCard(cardIdString: string, updatedCard: Card): Promise<Card> {
    const cardId = new ObjectId(cardIdString);

    try {
      await this._connect();
      if (!this.cardCollection) {
        throw new Error("Could not connect to the database");
      }

      // addded as unknown here because IDK how to resolve this TS error ew
      const createdCard = (await this.cardCollection.findOneAndUpdate(
        // update the card only if the pages array changes
        { _id: cardId, $or: [{ pages: { $ne: updatedCard.pages } }] },
        {
          $set: {
            pages: updatedCard.pages,
          },
        },
        {
          returnDocument: "after",
        },
      )) as unknown as Card;
      return createdCard;
    } catch (e) {
      console.error("Error updating card with card id: ", cardIdString, e);
      throw e;
    }
  }

  async deleteCard(cardIdString: string): Promise<Card> {
    const cardId = new ObjectId(cardIdString);

    try {
      await this._connect();
      if (!this.cardCollection) {
        throw new Error("Could not connect to the database");
      }

      // addded as unknown here because IDK how to resolve this TS error ew
      const deletedCard = (await this.cardCollection.deleteOne(
        cardId,
      )) as unknown as Card;
      return deletedCard;
    } catch (e) {
      console.error("Error deleting card with id: ", cardIdString, e);
      throw e;
    }
  }

  async getUser(userIdString: string): Promise<User> {
    const userId = new ObjectId(userIdString);

    try {
      await this._connect();
      if (!this.userCollection) {
        throw new Error("Could not connect to the database");
      }

      const user = (await this.userCollection.findOne(userId)) as User;
      return user;
    } catch (e) {
      console.error("Error finding a user with id: ", userIdString, e);
      throw e;
    }
  }

  async addCardToUser(
    userIdString: string,
    cardIdString: string,
  ): Promise<void> {
    const userId = new ObjectId(userIdString);
    const cardId = new ObjectId(cardIdString);

    try {
      await this._connect();
      if (!this.userCollection) {
        throw new Error("Could not connect to the database");
      }

      await this.userCollection.findOneAndUpdate(
        { _id: userId },
        {
          $push: { createdCards: cardId },
        },
      );
    } catch (e) {
      console.error(
        "Error adding card of id: ",
        cardId,
        " to user with with id: ",
        userIdString,
        e,
      );
      throw e;
    }
  }
}

export default MongoDB;
