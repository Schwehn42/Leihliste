import * as mongoose from "mongoose";
import app from "./app";
import Item from "../schemas/test_schema";

const url = process.env.MONGODB_URI || "mongodb://localhost:27017/test_database";
const port = process.env.PORT || 9000;

(async () => {
  // Connect to the database
  await mongoose.connect(url, { useNewUrlParser: true });
  // Populate database with sample data if it's empty
  //await populateDatabase();
  const newItems = [
    {
      name: "this does in fact work",
      value: 0.1,
    },
  ];
  await Item.insertMany(newItems);
  // Start express App
  app.listen(port);
  console.log(`App listening on port ${port}...`);
})();
