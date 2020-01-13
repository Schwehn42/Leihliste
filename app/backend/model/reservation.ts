import { Item } from "./item";
import * as mongoose from "mongoose";
import { Request } from "express";

export class Reservation {
  _id: mongoose.Schema.Types.ObjectId;
  item: Item;
  amount: number;
  from: Date;
  to: Date;
  name: String;
  studentCouncil: string;
  status: ReservationStatus;
  comment: string;

  constructor(
    item: Item,
    amount: number,
    from: Date,
    to: Date,
    name: String,
    studentCouncil: string,
    status: ReservationStatus,
    comment: string
  ) {
    this.item = item;
    this.amount = amount;
    this.from = from;
    this.to = to;
    this.name = name;
    this.studentCouncil = studentCouncil;
    this.status = status;
    this.comment = comment;
  }
}

export interface ReservationDef {
  item: mongoose.Schema.Types.ObjectId | Item;
  amount: number;
  from: Date;
  to: Date;
  name: String;
  studentCouncil: string;
  status: ReservationStatus;
  comment: string;
}

export interface ReservationArrayServerResponse {
  response: Array<Reservation>;
  error: string;
}

export interface StudentCouncilsServerResponse {
  response: Array<string>;
}

export interface ReservationAddServerRequest extends Request {
  reservation: ReservationDef;
}

export interface ReservationUpdateStatusRequest extends Request {
  id: mongoose.Schema.Types.ObjectId;
  newStatus: ReservationStatus;
}

export interface ReservationDeleteRequest extends Request {
  id: mongoose.Schema.Types.ObjectId;
}

export const STUDENT_COUNCILS = [
  "IWI",
  "WI",
  "EIT",
  "W",
  "AB",
  "IM", //TODO add all councils
];

export enum ReservationStatus {
  RESERVED,
  LEND_OUT,
  RETURNED,
  RETURNED_DAMAGED,
  RETURNED_INCOMPLETE,
}
