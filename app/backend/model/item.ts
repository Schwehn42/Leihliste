import { Request } from "express";
import { ReservationDef } from "./reservation";

export class Item {
  _id: string;
  name: string;
  maxAmount: number;
  availableAmount: number;

  constructor(_id: string, name: string, maxAmount: number) {
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
