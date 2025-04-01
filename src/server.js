// server.js
import express from "express";
import { MongoClient, ServerApiVersion } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());

const { PORT = "3001" } = process.env;

// MongoDB connection URI
const uri =
  "mongodb+srv://karanvishwakarma732:MeERI0RiPcXPMDnP@ss.f2cwigy.mongodb.net/?retryWrites=true&w=majority&appName=ss";
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    await client.connect();
    console.log("Connected to MongoDB!");

    // Simple authentication route
    app.post("/auth", async (req, res) => {
      const { username, password } = req.body;

      // Replace this with your actual user collection and logic
      const usersCollection = client.db("user").collection("table");
      const user = await usersCollection.findOne({ username, password });

      if (user) {
        return res.status(200).json({ message: "Authentication successful!" });
      } else {
        return res
          .status(401)
          .json({ message: "Invalid username or password." });
      }
    });

    app.listen(PORT, () => {
      console.log(`Server is listening on port: ${PORT}`);
    });
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

run().catch(console.dir);
