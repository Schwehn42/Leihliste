import * as express from "express";
import * as bodyParser from "body-parser";
import { GenericResponse } from "../model/item";
import {
  Reservation,
  ReservationAddServerRequest,
  ReservationArrayServerResponse,
  ReservationDef,
  ReservationDeleteRequest,
  ReservationUpdateStatusRequest,
  STUDENT_COUNCILS,
  StudentCouncilsServerResponse,
} from "../model/reservation";
import ReservationSchema from "../schemas/reservation.schema";

const router = express.Router();

const reservations: Array<Reservation> = []; //empty for now

/**
 * create new reservation for an item
 * res.body must contain field reservation of type {@link ReservationDef}.
 * {@link ReservationDef.item} is of a mongoose ObjectID
 */
router.route("/").post(bodyParser.json(), (req: ReservationAddServerRequest, res) => {
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

/**
 * @return array of all reservations ({@link ReservationDef}) and error.
 * error is "" if fetch is successful.
 */
router.route("/").get((req, res) => {
  let reservations: Array<Reservation> = [];
  let response: ReservationArrayServerResponse;

  ReservationSchema.find({})
    .populate("item")
    .then(doc => {
      console.log(doc);
      reservations = doc as Array<Reservation>; //NOTE: ReservationDef.item is of type ObjectID, but actually contains type Item. Need to cast
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

/**
 * update (multiple) reservation status
 * res.body must contain Array of <reservation ID and newStatus of type {@link ReservationStatus}>
 * @return fields success: boolean and error: string
 */
router.route("/").put(bodyParser.json(), (req: ReservationUpdateStatusRequest, res) => {
  let response: GenericResponse = {
    success: true,
    error: "",
  };

  ReservationSchema.updateOne({ _id: req.body.id }, { status: req.body.newStatus })
    .then(_ => {})
    .catch(_ => {
      response.success = false;
      response.error = "error while updating reservation";
    })
    .finally(() => {
      if (!response.error) {
        return res.status(200).json(response);
      } else {
        return res.status(501).json(response);
      }
    });
});

/**
 * delete (multiple) reservations
 * res.body must contain Array of <reservation ID>
 * @return fields success: boolean and error: string
 */
router.route("/delete").post(bodyParser.json(), (req: ReservationDeleteRequest, res) => {
  let response: GenericResponse = {
    success: true,
    error: "",
  };

  ReservationSchema.findOneAndDelete({ _id: req.body.id })
    .then(_ => {})
    .catch(_ => {
      response.success = false;
      response.error = "error while deleting reservation";
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

  return res.status(200).json(response);
});

export default router;
