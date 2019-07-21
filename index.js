var express = require("express");
var app = express();
var MongoClient = require("mongodb").MongoClient;
const assert = require("assert");
// var url = "mongodb://naruto:naruto20@ds353007.mlab.com:53007";
var url = "mongodb://3.17.135.197:3500";
// var url = "mongodb://172.31.45.160:27017";

var str = "";

MongoClient.connect(url, async (err, client) => {
  if (!err) {
    const db = client.db("shoppy");
    // console.log(db);

    //insert documents

    // insertDocuments(db, result => {
    //   console.log("Connected");
    //   client.close();
    // });

    //findDocuments

    findAllDocuments(db, result => {
      console.log("connected");
      client.close;
    });
  }
});

const insertDocuments = (db, callback) => {
  const collection = db.collection("shoppy-keeper-test");
  collection.insertMany(
    [
      {
        accountName: "Simple",
        GSTNo: "23432-4566-23",
        ownedBy: "Naruto",
        phone: "1234567898",
        email: "naruto@gmail.com"
      },
      {
        accountName: "SimpleTerms",
        GSTNo: "434-23432-4566-23",
        ownedBy: "Meliodas",
        phone: "876543266",
        email: "meliodas@gmail.com"
      }
    ],
    async (err, result) => {
      console.log(`Inserted documents ${result.ops.length}`);
      callback(result);
    }
  );
};

const findAllDocuments = (db, callback) => {
  const collection = db.collection("shoppy-keeper-test");

  collection.find({}).toArray(async (err, docs) => {
    // console.log(`All documents -- ${docs.map(doc=>)}`);
    docs.map(doc => console.log(doc));
    callback(docs);
  });
};
