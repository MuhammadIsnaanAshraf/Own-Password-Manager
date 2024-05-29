const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();
const { MongoClient } = require("mongodb");
const cors = require("cors");

const url = "mongodb://127.0.0.1:27017";
const client = new MongoClient(url);

const dbName = "lockBox";
client.connect();
const app = express();
app.use(bodyParser.json());
const port = 3000;
app.use(cors());

// get Passwords
app.get("/", async (req, res) => {
  const db = client.db(dbName);
  const collection = db.collection("documents");
  const findResult = await collection.find({}).toArray();
  res.send("Hello World!");
});

// POST PASSWORDS
app.post("/", async (req, res) => {
  const password = req.body;
  const db = client.db(dbName);
  const collection = db.collection("documents");
  const findResult = await collection.insertOne(password);
  res.send({ result: findResult });
});

app.delete("/", async (req, res) => {
  const password = req.body;
  const db = client.db(dbName);
  const collection = db.collection("documents");
  const findResult = await collection.deleteOne(password);
  res.send({ result: findResult });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
