import { MongoClient, ServerApiVersion } from 'mongodb';

const uri = 'mongodb://root:password@localhost:27017/ch02-test';
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri,
  {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  }
);

const myCollection = 'ch02';

async function run() {
  try {
    // Connect the client to the server (optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);

// var seedData = function (db, callback) {
//   db.collection(myCollection).find({}, {}, {})
//     .toArray(
//       function (err, docs) {
//         if (docs.length <= 0) {
//           console.log('No data. Seeding...');

//           var ihandler = function (err) {
//             if (err) {
//               console.log(err);
//               throw err;
//             }
//             inserted++;
//           }

//           var toinsert = 2,
//             inserted = 0;

//           db.collection(myCollection).insert({
//             'Title': 'Snow Crash',
//             'Author': 'Neal Stephenson'
//           }, ihandler);
//           db.collection(myCollection).insert({
//             'Title': 'Neuromancer',
//             'Author': 'William Gibson'
//           }, ihandler);

//           var sync = setInterval(function () {
//             if (inserted === toinsert) {
//               clearInterval(sync);
//               callback(db);
//             }
//           }, 50);
//           return;
//         }
//         callback(db);
//         return;
//       }
//     );
// }

// var showDocs = function (db) {
//   console.log("Listing books:");
//   var options = {
//     sort: [
//       ['Title', 1]
//     ]
//   };
//   db.collection(myCollection).find({}, {}, options)
//     .toArray(
//       function (err, docs) {
//         if (err) throw err;

//         for (var d = 0; d < docs.length; d++) {
//           console.log(docs[d].Title + '; ' + docs[d].Author);
//         }

//         db.close();
//       }
//     );
// }

// MongoClient.connect(dbhost, function (err, db) {
//   if (err) throw err;


// });
