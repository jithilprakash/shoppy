const MongoClient = require("mongodb").MongoClient;
const constant = require("../config/constant.json");

module.exports.connectionStart = async () => {
  console.log("In method connection start");
  try {
    const db = await MongoClient.connect(constant.URL, {
      useNewUrlParser: true
    });

    return db;
  } catch (error) {
    console.log("Error in connecting to DB", error.toString());
    return null;
  }
};
