const constant = require("../config/constant.json");

const checkAndCreateCollection = async db => {
  const collectionInfoList = await db.listCollections().toArray();
  let collectionNameList = [];
  collectionInfoList.map(coll => collectionNameList.push(coll.name));
  console.log("Collection Name List", collectionNameList);
  if (!collectionNameList.includes(constant.COLLECTION)) {
    db.collection(constant.COLLECTION).createIndex(
      { email: 1, GSTNo: 1 },
      { unique: true }
    );
  }
};

module.exports.findAllDocuments = async (db, collectionName) => {
  const collection = db.collection(collectionName);
  const docs = await collection.find({}).toArray();
  return docs;
};

module.exports.findOneDocument = async (db, collectionName, data) => {
  console.log(collectionName, data);
  const collection = db.collection(collectionName);
  const doc = await collection.findOne(data)
  return doc;
};

module.exports.inserOneDocument = async (db, collectionName, data) => {
  await checkAndCreateCollection(db);
  const collection = db.collection(collectionName);
  const docs = await collection.insertOne(data);
  return docs;
};

module.exports.updateDocument = async (db, collectionName, data) => {
  const collection = db.collection(collectionName);
  const docs = await collection.save(data);
  return docs;
};

module.exports.deleteDocument = async (db, collectionName, data) => {
  const collection = db.collection(collectionName);
  const docs = await collection.remove(data);
  return docs;
};

module.exports.deleteAllDocument = async (db, collectionName) => {
  const collection = db.collection(collectionName);
  const docs = await collection.remove();
  return docs;
};
