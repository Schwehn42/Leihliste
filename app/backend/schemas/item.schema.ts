import { Document, model, Schema } from "mongoose";
import { SchemaDef } from "../types";
import { ItemDef } from "../model/item";

// Declare model interface
interface ItemDoc extends ItemDef, Document {}

export const ITEM_SCHEMA_DEF: SchemaDef<ItemDef> = {
  name: {
    type: String,
    required: true,
  },
  maxAmount: {
    type: Number,
    required: true,
  },
  availableAmount: {
    type: Number,
    required: true,
  },
};

// Define model schema
const itemSchema = new Schema(ITEM_SCHEMA_DEF);

export default model<ItemDoc>("Item", itemSchema);
