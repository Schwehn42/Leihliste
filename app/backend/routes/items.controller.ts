import * as express from "express";
import { Item, ItemArrayServerResponse } from "../model/item";
import ItemSchema from "../schemas/item.schema";

const router = express.Router();

router.route("/").get((req, res) => {
  let items: Array<Item> = [];
  let response: ItemArrayServerResponse;

  ItemSchema.find({})
    .then((doc: Array<Item>) => {
      items = doc;
      response = {
        response: items,
        error: "",
      };
    })
    .catch(err => {
      response = {
        response: [],
        error: "Error retrieving from database",
      };
    })
    .finally(() => {
      if (!response.error) {
        return res.status(200).json(response);
      } else {
        return res.status(501).json(response);
      }
    });
});

export default router;
