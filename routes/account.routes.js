const express = require("express");
const router = express.Router();
const MongoClient = require("mongodb").MongoClient;
const constant = require("../config/constant.json");
const accountController = require("../controller/account.controller");
const {
  findAllDocuments,
  inserOneDocument,
  updateDocument,
  deleteDocument,
  deleteAllDocument
} = require("../utils/query");
const { connectionStart } = require("../utils/db.connection");

router.get("/", (req, res, next) => {
  res.send("Its working");
});

router.get("/account", async (req, res, next) => {
  const connection = await connectionStart();
  try {
    if (connection !== null) {
      const db = connection.db(constant.DB);
      const response = await findAllDocuments(db, constant.COLLECTION);
      res.json(response);
    }
  } catch (error) {
    console.log(error.toString());
    res.status(500).send("Error happened when finding the document");
  } finally {
    connection.close();
  }
});

router.post("/account/newdoc", async (req, res, next) => {
  //   console.log("Account body", req.body);
  const connection = await connectionStart();
  try {
    if (connection !== null) {
      const db = connection.db(constant.DB);
      const response = await inserOneDocument(
        db,
        constant.COLLECTION,
        req.body,
        { unique: true }
      );
      res.json(response);
    }
  } catch (error) {
    console.log(error.toString());
    if (error.toString().includes("duplicate")) {
      res.status(500).send("Duplicate document found");
    } else {
      res.status(500).send("Error happened when posting document");
    }
  } finally {
    connection.close();
  }
});

router.post("/account/update", async (req, res, next) => {
  const connection = await connectionStart();
  try {
    if (connection !== null) {
      const db = connection.db(constant.DB);
      const response = await updateDocument(db, constant.COLLECTION, req.body);
      res.json(response);
    }
  } catch (error) {
    console.log(error.toString());
    res.status(500).send("Document did not update");
  } finally {
    connection.close();
  }
});

router.delete("/account/delete/:id", async (req, res, next) => {
  const connection = await connectionStart();
  try {
    if (connection !== null) {
      const db = connection.db(constant.DB);
      const response = await deleteDocument(db, constant.COLLECTION, {
        _id: req.params.id
      });
      res.json(response);
    }
  } catch (error) {
    console.log(error.toString());
    res.status(500).send("Document did not delete");
  } finally {
    connection.close();
  }
});

router.delete("/account/deleteAll", async (req, res, next) => {
  const connection = await connectionStart();
  try {
    if (connection !== null) {
      const db = connection.db(constant.DB);
      const response = await deleteAllDocument(db, constant.COLLECTION);
      res.json(response);
    }
  } catch (error) {
    console.log(error.toString());
    res.status(500).send("Document did not delete");
  } finally {
    connection.close();
  }
});

module.exports = router;
