import { Request } from "express";
import { Reservation } from "./reservation";

export class Item {
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
  reservation: Reservation;
}
