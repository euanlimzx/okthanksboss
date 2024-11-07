import { User } from "@/types/user";
import { ObjectId, MongoClient } from "mongodb";
import { DB } from "./DB";

export class MongoDB {
  client: MongoClient | null = null;

  async establishConnection() {
    const mongoClient = new MongoClient(process.env.MONGODB_URI!);
    await mongoClient.connect();
    this.client = mongoClient!;
  }

  async test() {
    if (!this.client) {
      return false;
    }

    const cardCollection = this.client
      .db(process.env.OKTHANKSBOSS_DBNAME)
      .collection("Card");
    return cardCollection.find({}).toArray();
  }
  // getUser(id: ObjectId): User {}
}
