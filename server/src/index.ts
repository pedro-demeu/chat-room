import cors from "cors";
import express from "express";
import http from "http";
import { MongoClient, ObjectId } from "mongodb";
import { Server } from "socket.io";
import dotenv from "dotenv";

dotenv.config();
const database = process.env.DATABASE_SERVER || "http://127.0.0.1:27017";
const PORT = 8000;
const app = express();
const httpServer = http.createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});

app.use(cors());
app.use(express.json());

app.post("/v1/room/:roomId/messages", async (req, res) => {
  const { roomId } = req.params;
  const { username, message } = req.body;

  const client = new MongoClient(database);

  const messageRef = {
    [roomId]: {
      username,
      message,
      timestemp: new Date().toLocaleTimeString(),
    },
  };

  await client.db("CRDB").collection("messages").insertOne(messageRef);

  return res.status(201).json({
    username,
    message,
    timestemp: new Date().toLocaleTimeString(),
  });
});

app.post("/v1/room", async (req, res) => {
  const { username } = req.body;
  const client = new MongoClient(database);
  return res.status(201).json({
    roomId: (
      await client.db("CRDB").collection("rooms").insertOne({ username })
    ).insertedId,
  });
});

app.get("/v1/room/:roomId/messages", async (req, res) => {
  const { roomId } = req.params;
  const client = new MongoClient(database);

  try {
    await client.connect();

    const messages = await client
      .db("CRDB")
      .collection("messages")
      .find({ [roomId]: { $exists: true } })
      .toArray();

    return res.status(200).json(messages);
  } catch (err) {
    console.log(err);
  } finally {
    await client.close();
  }
});

io.on("connection", (socket) => {
  console.log("User is connected in socket server 🔋");
  const client = new MongoClient(database);

  socket.on("new_message", async (message) => {
    const { roomId } = message;

    const createMessage = {
      ...message,
      timestemp: new Date().toLocaleTimeString(),
    };
    io.emit(roomId, createMessage);
    await client
      .db("CRDB")
      .collection("messages")
      .insertOne({
        [roomId]: createMessage,
      });
  });

  socket.on("disconnect", () => {
    console.log("User is disconnected from socket server. 🔴");
  });
});

httpServer.listen(PORT, () => {
  console.log(`listening on port: ${PORT} 🚀`);
});


export default app;