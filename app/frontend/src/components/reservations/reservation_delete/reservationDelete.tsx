import * as React from "react";
import axios from "axios";
import { Reservations } from "../reservations";

type Props = {
  relatedReservationID: string;
  relatedItemID: string;
  amountToReAdd: number;
};
type State = {};

export class ReservationDelete extends React.Component<Props, State> {
  render() {
    return <div onClick={() => this.deleteReservation()}>X</div>;
  }

  deleteReservation(): void {
    axios
      .post("/reservations/delete", {
        reservationID: this.props.relatedReservationID,
        itemID: this.props.relatedItemID,
        amountToReAdd: this.props.amountToReAdd,
      })
      .then(_ => {
        Reservations.instance.updateReservationList();
      });
  }
}
