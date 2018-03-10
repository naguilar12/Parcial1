var express = require("express");
const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");
var router = express.Router();




// Connection URL

const url = process.env.MONGOLAB_URI;

function saveTag(nTag, callback){
  const dbName = "hashtags";

  // Use connect method to connect to the server
  MongoClient.connect(url, function(err, client) {
    assert.equal(null, err);
    console.log("Connected successfully to server");

    const db = client.db(dbName);

    const collection = db.collection("history");
    console.log(nTag + "AQUUUUUU")

    collection.save({tag: nTag});
    assert.equal(err, null);



    client.close();
    callback("Listo");
  });  
}

function getHistory(callback) {
  console.log("AQUIIIIIIIIII")

  // Database Name
  const dbName = "hashtags";

  // Use connect method to connect to the server
  MongoClient.connect(url, function(err, client) {
    assert.equal(null, err);
    console.log("Connected successfully to server");

    const db = client.db(dbName);

    const collection = db.collection("history");
    console.log(collection.find({}));
    collection.find().toArray(function(err, docs) {
      assert.equal(err, null);
      console.log("Found " + docs.length + " records");
      callback(docs);
    });
    client.close();
  });

}


router.post("/:tag", function(req, res) {
  console.log(req.params);
  saveTag(req.params.tag, (tag) => res.send(tag))
});

router.get("/history", function(req, res) {
  console.log(req.params);
  getHistory( 
    (history) => res.send(history) 
    );
});


module.exports = router;
