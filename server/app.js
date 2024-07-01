import express from "express";
import cors from "cors";
import postRouter from "./apps/posts.js";
import { client } from "./utils/db.js";
import authRouter from "./apps/auth.js";

async function init() {
  const app = express();
  const port = 4000;

  await client.connect();

  app.use(cors());
  app.use(express.json());
  app.use("/posts", postRouter);
  app.use("/auth", authRouter);

  app.get("/", (req, res) => {
    res.send("Hello World!");
  });

  app.get("*", (req, res) => {
    res.status(404).send("Not found");
  });

  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
}

init();
