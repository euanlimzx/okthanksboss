import { User } from "@/types/user";
import { Card } from "@/types/card";
import {
  ObjectId,
  MongoClient,
  Collection,
  ClientSession,
  InsertOneOptions,
  FindOneAndDeleteOptions,
} from "mongodb";
import DB from "./DB";

class MongoDB extends DB<InsertOneOptions, FindOneAndDeleteOptions> {
  client: MongoClient | null = null;
  cardCollection: Collection<Card> | null = null;
  userCollection: Collection<User> | null = null;
  session: ClientSession | null = null;

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

  async createCard(newCard: Card, options: InsertOneOptions): Promise<Card> {
    try {
      await this._connect();
      if (!this.cardCollection) {
        throw new Error("Could not connect to the database");
      }

      // addded as unknown here because IDK how to resolve this TS error ew
      const createdCard = await this.cardCollection.insertOne(newCard, options);
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

  async deleteCard(
    cardIdString: string,
    options: FindOneAndDeleteOptions,
  ): Promise<Card | null> {
    const cardId = new ObjectId(cardIdString);

    try {
      await this._connect();
      if (!this.cardCollection) {
        throw new Error("Could not connect to the database");
      }

      // addded as unknown here because IDK how to resolve this TS error ew
      const deletedCard = await this.cardCollection.findOneAndDelete(
        { _id: cardId },
        options,
      );

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

  async createNewCardAndAddToUser(
    userIdString: string,
    newCard: Card,
  ): Promise<Card> {
    const userId = new ObjectId(userIdString);

    try {
      await this._connect();
      if (!this.client || !this.userCollection || !this.cardCollection) {
        throw new Error("Could not connect to the database");
      }

      this.session = this.client.startSession();
      if (!this.session) {
        throw new Error("Could not establish a DB session");
      }

      let insertedCard = null;

      await this.session.withTransaction(async () => {
        insertedCard = await this.createCard(newCard, {
          session: this.session!,
        });
        const updateResult = await this.userCollection?.updateOne(
          { _id: userId },
          {
            $push: { createdCards: insertedCard._id },
          },
          {
            session: this.session!,
          },
        );

        if (!updateResult?.modifiedCount) {
          throw new Error(`Could not find user id: ${userIdString}`);
        }
      });

      return insertedCard!;
    } catch (e) {
      console.error(
        "Error adding new card to user with with id: ",
        userIdString,
        e,
      );
      throw e;
    } finally {
      await this.session!.endSession();
    }
  }

  async deleteCardAndRemoveFromUser(cardIdString: string): Promise<Card> {
    try {
      await this._connect();
      if (!this.client || !this.userCollection || !this.cardCollection) {
        throw new Error("Could not connect to the database");
      }

      this.session = this.client.startSession();
      if (!this.session) {
        throw new Error("Could not establish a DB session");
      }

      let removedCard = null;

      await this.session.withTransaction(async () => {
        removedCard = await this.deleteCard(cardIdString, {
          session: this.session!,
        });

        if (!removedCard) {
          throw new Error(`Coult not a card with ID: ${cardIdString}`);
        }

        console.log(removedCard);

        const updateResult = await this.userCollection?.updateOne(
          { _id: removedCard.userId },
          {
            $pull: { createdCards: new ObjectId(cardIdString) },
          },
        );
        if (!updateResult?.modifiedCount) {
          throw new Error(
            `Coult not find a user ${removedCard.userId.toString()} that owns card with ID: ${cardIdString}`,
          );
        }
      });

      return removedCard!;
    } catch (e) {
      console.error("Error deleting card with ID: ", cardIdString, e);
      throw e;
    } finally {
      await this.session!.endSession();
    }
  }
}

export default MongoDB;
