import * as express from "express";
import * as bodyParser from "body-parser";
import { ReservationServerRequest } from "../model/item";
import {
  Reservation,
  ReservationArrayServerResponse,
  ReservationDef,
  STUDENT_COUNCILS,
  StudentCouncilsServerResponse,
} from "../model/reservation";
import ReservationSchema from "../schemas/reservation.schema";

const router = express.Router();

const reservations: Array<Reservation> = []; //empty for now

router.route("/").post(bodyParser.json(), (req: ReservationServerRequest, res) => {
  const newReservation: Array<ReservationDef> = [];
  console.log("posting new reservation");
  console.log(req.body);
  newReservation.push({
    item_id: req.body.reservation.item_id,
    amount: req.body.reservation.amount,
    from: req.body.reservation.from,
    to: req.body.reservation.to,
    name: req.body.reservation.name,
    studentCouncil: req.body.reservation.studentCouncil,
    status: req.body.reservation.status,
    comment: req.body.reservation.comment,
  });

  ReservationSchema.insertMany(newReservation)
    .then(_ => {})
    .catch(err => {
      console.log(`error: ${err}`);
    })
    .finally(() => {
      return res.status(201).send("Received Reservation");
    });
});

router.route("/").get((req, res) => {
  const response: ReservationArrayServerResponse = {
    response: reservations,
    /*
    TODO get proper reservation list.
    don't forget that the items have to be fetched somehow, too
     */
  };
  return res.status(200).json(response);
});

router.route("/councils").get((req, res) => {
  const response: StudentCouncilsServerResponse = {
    response: STUDENT_COUNCILS,
  };
  console.log(response);

  return res.status(200).json(response);
});

export default router;
