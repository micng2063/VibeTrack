import express from "express";
import db from "../db/conn.mjs";
//import { ObjectId } from "mongodb";

const router = express.Router();

// This section will help you get a list of all the records.
router.get("/", async (req, res) => {
  let collection = await db.collection("User");
  let results = await collection.find({}).toArray();
  res.send(results).status(200);
});

// This section will help you get a single record by id
router.get("/:code", async (req, res) => {
  let collection = await db.collection("User");
  let query = {code: req.params.code};
  let result = await collection.findOne(query);

  if (!result) res.send("Not found").status(404);
  else res.send(result).status(200);
});

// This section will help you create a new record.
router.post("/", async (req, res) => {
  let newDocument = {
    code: req.body.code,
    name: req.body.name,
    lastName: req.body.lastName,
    phone: req.body.phone,
    email: req.body.email,
    gender: req.body.gender,
    birthdate: req.body.birthdate,
    emergencyName1: req.body.emergencyName1,
    emergencyEmail1: req.body.emergencyEmail1,
    emergencyName2: req.body.emergencyName2,
    emergencyEmail2: req.body.emergencyEmail2,
    favorite: req.body.favorite,
  };
  let collection = await db.collection("User");
  let result = await collection.insertOne(newDocument);
  res.send(result).status(204);
});

// This section will help you update a record by id.
router.patch("/:code", async (req, res) => {
  let query = {code: req.params.code};
  const updates =  {
    $set: {
      code: req.body.code,
      name: req.body.name,
      lastName: req.body.lastName,
      phone: req.body.phone,
      email: req.body.email,
      gender: req.body.gender,
      birthdate: req.body.birthdate,
      emergencyName1: req.body.emergencyName1,
      emergencyEmail1: req.body.emergencyEmail1,
      emergencyName2: req.body.emergencyName2,
      emergencyEmail2: req.body.emergencyEmail2,
      favorite: req.body.favorite,
    }
  };

  let collection = await db.collection("User");
  let result = await collection.updateOne(query, updates);
  res.send(result).status(200);
});

// This section will help you delete a record
router.delete("/:code", async (req, res) => {
  let query = {code: req.params.code};

  const collection = db.collection("User");
  let result = await collection.deleteOne(query);

  res.send(result).status(200);
});

export default router;