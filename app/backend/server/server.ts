import * as mongoose from "mongoose";
import app from "./app";
import { ItemDef } from "../model/item";
import Item from "../schemas/item.schema";

const url = process.env.MONGODB_URI || "mongodb://localhost:27017/test_database";
const port = process.env.PORT || 9000;

(async () => {
  // Connect to the database
  await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
  // Populate database with sample data if it's empty
  //await populateDatabase();
  const newItems: Array<ItemDef> = [
    {
      name: "this does in fact work",
      maxAmount: 5,
      availableAmount: 3,
    },
  ];

  Item.findOne({ maxAmount: 5 }, function(err, doc) {
    console.log(doc);
  });

  await Item.insertMany(newItems);

  // Start express App
  app.listen(port);
  console.log(`App listening on port ${port}...`);
})();
