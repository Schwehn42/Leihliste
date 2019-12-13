import { Item } from "./item";

export class Reservation {
  item: Item;
  amount: number;
  from: Date;
  to: Date;
  name: String;
  studentCouncil: StudentCouncil;
  status: ReservationStatus;

  constructor(item: Item, amount: number, from: Date, to: Date, name: String, studentCouncil: StudentCouncil, status: ReservationStatus) {
    this.item = item;
    this.amount = amount;
    this.from = from;
    this.to = to;
    this.name = name;
    this.studentCouncil = studentCouncil;
    this.status = status;
  }
}

export interface ReservationArrayServerResponse {
  response: Array<Reservation>;
}

export enum StudentCouncil {
  IWI,
  WI,
  EIT,
  W,
  AB,
  IM, //TODO add all councils
}

export enum ReservationStatus {
  RESERVED,
  LEND_OUT,
  RETURNED,
  RETURNED_DAMAGED,
  RETURNED_INCOMPLETE,
}
