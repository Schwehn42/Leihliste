import * as React from "react";
import axios from "axios";
import { Reservations } from "../reservations";

type Props = {
  relatedReservationID: string;
};
type State = {};

export class ReservationDelete extends React.Component<Props, State> {
  render() {
    return <div onClick={() => this.deleteReservation()}>X</div>;
  }

  deleteReservation(): void {
    axios
      .post("/reservations/delete", {
        id: this.props.relatedReservationID,
      })
      .then(_ => {
        Reservations.instance.updateReservationList();
      });
  }
}
