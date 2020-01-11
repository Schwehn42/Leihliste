import { Request } from "express";
import { ReservationDef } from "./reservation";
import * as mongoose from "mongoose";

export class Item {
  _id: mongoose.Schema.Types.ObjectId;
  name: string;
  maxAmount: number;
  availableAmount: number;

  constructor(name: string, maxAmount: number) {
    this.name = name;
    this.maxAmount = maxAmount;
    this.availableAmount = maxAmount;
  }
}

export interface ItemDef {
  name: string;
  maxAmount: number;
  availableAmount: number;
}

export interface ItemArrayServerResponse {
  response: Array<Item>;
  error: string;
}

export interface ReservationServerRequest extends Request {
  reservation: ReservationDef;
}
