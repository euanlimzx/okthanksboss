import { User } from "@/types/user";
import { Card } from "@/types/card";
import { ObjectId, MongoClient, Collection } from "mongodb";
import DB from "./DB";

class MongoDB extends DB {
  client: MongoClient | null = null;
  cardCollection: Collection | null = null;
  userCollection: Collection | null = null;

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
    } catch (err) {
      console.error(
        "Error fetching all the cards belonging to user: ",
        userIdString,
        err,
      );
      return [];
    }
  }

  async getCard(cardIdString: string): Promise<Card | null> {
    const cardId = new ObjectId(cardIdString);

    try {
      await this._connect();
      if (!this.cardCollection) {
        throw new Error("Could not connect to the database");
      }

      const card = (await this.cardCollection.findOne(cardId)) as Card;
      return card;
    } catch (err) {
      console.error("Error fetching card: ", cardIdString, err);
      return null;
    }
  }

  async createCard(newCard: Card): Promise<Card | null> {
    try {
      await this._connect();
      if (!this.cardCollection) {
        throw new Error("Could not connect to the database");
      }

      // addded as unknown here because IDK how to resolve this TS error ew
      const createdCard = (await this.cardCollection.insertOne(
        newCard,
      )) as unknown as Card;
      return createdCard;
    } catch (err) {
      console.error("Error creating card: ", err);
      return null;
    }
  }

  async updateCard(
    cardIdString: string,
    updatedCard: Card,
  ): Promise<Card | null> {
    const cardId = new ObjectId(cardIdString);

    try {
      await this._connect();
      if (!this.cardCollection) {
        throw new Error("Could not connect to the database");
      }

      // addded as unknown here because IDK how to resolve this TS error ew
      const createdCard = (await this.cardCollection.updateOne(
        cardId,
        updatedCard,
      )) as unknown as Card;
      return createdCard;
    } catch (err) {
      console.error("Error updating card with card id: ", cardIdString, err);
      return null;
    }
  }

  async deleteCard(cardIdString: string): Promise<Card | null> {
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
    } catch (err) {
      console.error("Error deleting card with id: ", cardIdString, err);
      return null;
    }
  }

  async getUser(userIdString: string): Promise<User | null> {
    const userId = new ObjectId(userIdString);

    try {
      await this._connect();
      if (!this.userCollection) {
        throw new Error("Could not connect to the database");
      }

      const user = (await this.userCollection.findOne(userId)) as User;
      return user;
    } catch (err) {
      console.error("Error finding a user with id: ", userIdString, err);
      return null;
    }
  }
}

export default MongoDB;
