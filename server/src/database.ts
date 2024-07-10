import dotenv from "dotenv";
import { MongoClient } from "mongodb";

dotenv.config();

const databaseName = process.env.DATABASE_NAME || "databaseName";
const server = process.env.DATABASE_SERVER || "http://127.0.0.1:27017";

class Database {
  constructor() {
    this._connect();
  }

  async _connect() {
    const client = new MongoClient(server);

    try {
      await client.connect();

      await client.db(databaseName).command({ ping: 1 });
      console.log("Database connection successful");
    } catch (err) {
      console.error("Database connection error");
      console.error({
        err,
        server,
      });
    } finally {
      await client.close();
    }
  }
}

export default Database;
