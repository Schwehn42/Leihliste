import * as React from "react";
import { ReservationArrayServerResponse, ReservationDef } from "../../../../backend/model/reservation";
import axios from "axios";
import { Item } from "../../../../backend/model/item";

type Props = {};
type State = {
  reservationsList: Array<ReservationDef>;
  error: string;
};

export class Reservations extends React.Component<Props, State> {
  static instance;
  constructor(props: Props) {
    super(props);

    this.state = {
      reservationsList: [],
      error: "",
    };
    Reservations.instance = this;
  }

  componentDidMount(): void {
    this.updateReservationList();
  }

  render() {
    return (
      <>
        <table>
          <tbody>
            <tr>
              <td>Item</td>
              <td>Anzahl</td>
              <td>Von</td>
              <td>Bis</td>
              <td>Name</td>
              <td>FS</td>
              <td>Status</td>
              <td>Kommentar</td>
            </tr>
            {this.state.reservationsList.length > 0
              ? this.state.reservationsList.map((reservation, index) => (
                  <tr key={index}>
                    {<td>{this.castToItem(reservation.item).name}</td>}
                    <td>{reservation.amount}</td>
                    <td>{new Date(reservation.from).toLocaleDateString()}</td>
                    <td>{new Date(reservation.to).toLocaleDateString()}</td>
                    <td>{reservation.name}</td>
                    <td>{reservation.studentCouncil}</td>
                    <td>{reservation.status}</td>
                    <td>{reservation.comment}</td>
                  </tr>
                ))
              : ""}
          </tbody>
        </table>
        {this.state.error && (
          <p className={"errorDisplay"}>
            Error: <span>{this.state.error}</span>
          </p>
        )}
      </>
    );
  }

  updateReservationList(): void {
    axios
      .get<ReservationArrayServerResponse>(`/reservations`)
      .then(res => {
        this.setState({ reservationsList: res.data.response });
      })
      .catch(err => {
        this.setState({
          error: err.response.data.error,
        });
      });
  }

  castToItem(itemObj: object): Item {
    return itemObj as Item;
  }
}
