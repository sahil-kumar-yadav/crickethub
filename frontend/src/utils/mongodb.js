import { MongoClient } from "mongodb";

// Connection URL - make sure to use process.env to access your MongoDB URI
const client = new MongoClient(process.env.MONGODB_URI);

const clientPromise = client.connect().then(client => client.db());

export default clientPromise;
