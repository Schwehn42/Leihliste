import { Item } from "./item";

export class Reservation {
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

export interface ReservationArrayServerResponse {
  response: Array<Reservation>;
}

export interface StudentCouncilsServerResponse {
  response: Array<string>;
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
