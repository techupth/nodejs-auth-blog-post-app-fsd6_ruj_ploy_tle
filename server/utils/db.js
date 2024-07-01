import { MongoClient } from "mongodb";

const connectionString = "mongodb://localhost:27017";

export const client = new MongoClient(connectionString, {
  useUnifiedTopology: true,
});

export async function connectToDatabase() {
  try {
    await client.connect();
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

export const db = client.db("practice-mongo");
export const userCollection = db.collection('users');