import * as express from "express";
import * as bodyParser from "body-parser";
import { ReservationServerRequest } from "../model/item";
import { Reservation, ReservationArrayServerResponse } from "../model/reservation";

const router = express.Router();

const reservations: Array<Reservation> = [];

router.route("/").post(bodyParser.json(), (req: ReservationServerRequest, res) => {
  console.log(req.body.reservation);
  reservations.push(
    new Reservation(
      req.body.reservation.item,
      req.body.reservation.amount,
      req.body.reservation.from,
      req.body.reservation.to,
      req.body.reservation.name,
      req.body.reservation.studentCouncil,
      req.body.reservation.status
    )
  );

  console.log(reservations);

  return res.status(201).send("Received Reservation");
});

router.route("/").get((req, res) => {
  const response: ReservationArrayServerResponse = {
    response: reservations,
  };
  return res.status(200).json(response);
});

export default router;
