import * as React from "react";
import { Reservation, ReservationArrayServerResponse } from "../../../../backend/model/reservation";
import axios from "axios";

type Props = {};
type State = {
  reservationsList: Array<Reservation>;
};

export class Reservations extends React.Component<Props, State> {
  static instance;
  constructor(props: Props) {
    super(props);

    this.state = {
      reservationsList: [],
    };
    Reservations.instance = this;
  }

  componentDidMount(): void {
    this.updateReservationList();
  }

  render() {
    return (
      <table>
        <tr>
          <td>Item</td>
          <td>Anzahl</td>
          <td>Von</td>
          <td>Bis</td>
          <td>Name</td>
          <td>FS</td>
          <td>Status</td>
        </tr>
        {this.state.reservationsList.length > 0
          ? this.state.reservationsList.map(reservation => (
              <tr>
                <td>{reservation.item.name}</td>
                <td>{reservation.amount}</td>
                <td>{new Date(reservation.from).toLocaleDateString()}</td>
                <td>{new Date(reservation.to).toLocaleDateString()}</td>
                <td>{reservation.name}</td>
                <td>{reservation.studentCouncil}</td>
                <td>{reservation.status}</td>
              </tr>
            ))
          : ""}
      </table>
    );
  }

  updateReservationList(): void {
    axios.get<ReservationArrayServerResponse>(`/reservations`).then(res => {
      this.setState({ reservationsList: res.data.response });
    });
  }
}
