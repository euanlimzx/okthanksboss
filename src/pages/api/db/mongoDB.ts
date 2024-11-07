import { User } from "@/types/user";
import { ObjectId, MongoClient, Collection } from "mongodb";
import { DB } from "./DB";

export class MongoDB {
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

  async getCards() {
    // TODO @SW: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy
    // create a proxy object that automates the calling of the connect function before each function call, but I think there is no need for that for now
    await this._connect();
    return this.cardCollection?.find({}).toArray();
  }
  // getUser(id: ObjectId): User {}
}
