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
    item: req.body.reservation.item,
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
  let reservations: Array<ReservationDef> = [];
  let response: ReservationArrayServerResponse;

  ReservationSchema.find({})
    .populate("item")
    .then(doc => {
      console.log(doc);
      reservations = doc; //NOTE: ReservationDef.item is of type ObjectID, but actually contains type Item. Need to cast later
      response = {
        response: reservations,
        error: "",
      };
    })
    .catch(err => {
      console.log(`error: ${err}`);
      response = {
        response: [],
        error: err.message,
      };
    })
    .finally(() => {
      if (!response.error) {
        return res.status(200).json(response);
      } else {
        return res.status(501).json(response);
      }
    });
});

router.route("/councils").get((req, res) => {
  const response: StudentCouncilsServerResponse = {
    response: STUDENT_COUNCILS,
  };
  console.log(response);

  return res.status(200).json(response);
});

export default router;
