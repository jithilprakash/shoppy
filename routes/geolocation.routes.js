const express = require("express");
const router = express.Router();
const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectID;
const constant = require("../config/constant.json");
const accountController = require("../controller/account.controller");
const {
  findAllDocuments,
  inserOneDocument,
  updateDocument,
  deleteDocument,
  findOneDocument
} = require("../utils/query");
const { connectionStart } = require("../utils/db.connection");

router.get("/", (req, res, next) => {
  res.send("Its working");
});

router.post("/add/:id", async (req, res) => {
  let location = req.body;
  const connection = await connectionStart();
  try {
    if (connection !== null) {
      const db = connection.db(constant.DB);
      const response = await findOneDocument(db, constant.COLLECTION, {
        _id: ObjectId(req.params.id)
      });
      let locationId = new ObjectId().toHexString();
      console.log("location id", locationId);
      location = { locationId, ...location };
      let oldLoc = response.location;
      console.log(oldLoc);
      if (oldLoc === undefined || oldLoc === null) {
        console.log(oldLoc);
        oldLoc = [];
        oldLoc.push(location);
      } else {
        oldLoc.push(location);
      }
      let newdoc = { ...response, location: oldLoc };
      //   console.log(newdoc);

      const updatedDocs = await updateDocument(db, constant.COLLECTION, newdoc);
      res.json(updatedDocs);
    }
  } catch (error) {
    console.log(error.toString());
    res.status(500).send("Error happened when adding geoLocation");
  }
});

module.exports = router;
