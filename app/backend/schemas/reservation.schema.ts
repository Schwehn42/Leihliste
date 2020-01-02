import { Document, model, Schema } from "mongoose";
import { SchemaDef } from "../types";
import { ReservationDef } from "../model/reservation";

// Declare model interface
interface ReservationDoc extends ReservationDef, Document {}

export const RESERVATION_SCHEMA_DEF: SchemaDef<ReservationDef> = {
  item_id: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  from: {
    type: Date,
    required: true,
  },
  to: {
    type: Date,
    required: true,
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

export default model<ReservationDoc>("Reservation", reservationSchema);
