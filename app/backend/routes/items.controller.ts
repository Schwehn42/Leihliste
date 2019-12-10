import * as bodyParser from "body-parser";
import * as express from "express";
import { Item, ItemArrayServerResponse } from "../model/item";

const router = express.Router();

router.route("/").get((req, res) => {
  const items: Array<Item> = [new Item(0, "abc", 4), new Item(1, "def", 0), new Item(2, "ghi", 1)];

  const response: ItemArrayServerResponse = {
    response: items,
  };

  return res.status(200).json(response);
});

export default router;
