import * as mongoose from "mongoose";
import { Document, model, Schema } from "mongoose";
import { SchemaDef } from "../types";
import { ReservationDef } from "../model/reservation";

// Declare model interface
interface ReservationDoc extends ReservationDef, Document {}

export const RESERVATION_SCHEMA_DEF: SchemaDef<ReservationDef> = {
  item: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Item",
  },
  amount: {
    type: Number,
    required: true,
  },
  from: {
    type: Date,
    required: false,
    default: Date.now(),
  },
  to: {
    type: Date,
    required: false,
    default: Date.now(),
  },
  name: {
    type: String,
    required: true,
  },
  studentCouncil: {
    type: String,
    required: true,
  },
  status: {
    type: Number,
    required: true,
  },
  comment: {
    type: String,
    required: false,
  },
};

// Define model schema
const reservationSchema = new Schema(RESERVATION_SCHEMA_DEF);

export default model<ReservationDoc>("Reservation", reservationSchema, "reservations");
