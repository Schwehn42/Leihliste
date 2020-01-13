import * as React from "react";
import { FormEvent } from "react";
import axios from "axios";

type Props = {
  relatedReservationID: string;
  selectedStatus: number;
};
type State = {
  selectedIndex: number;
};

//same as ReservationStatus in backend
enum ReservationStatus {
  RESERVED,
  LENT_OUT,
  RETURNED,
  RETURNED_DAMAGED,
  RETURNED_INCOMPLETE,
}

const ReservationStatusMap = new Map<ReservationStatus, string>([
  [ReservationStatus.RESERVED, "reserviert"],
  [ReservationStatus.LENT_OUT, "ausgeliehen"],
  [ReservationStatus.RETURNED, "zurückgegeben"],
  [ReservationStatus.RETURNED_DAMAGED, "zurückgegeben mit Schaden"],
  [ReservationStatus.RETURNED_INCOMPLETE, "zurückgegeben unvollständig"],
]);

export class ReservationStatusSelect extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      selectedIndex: this.props.selectedStatus,
    };
  }

  render() {
    return (
      <select onChange={e => this.updateReservationStatus(e)}>
        {Array.from(ReservationStatusMap).map(([key, value]) => (
          <option key={key} selected={key === this.props.selectedStatus}>
            {value}
          </option>
        ))}
      </select>
    );
  }

  updateReservationStatus(e: FormEvent<HTMLSelectElement>): void {
    this.setState(
      {
        selectedIndex: e.currentTarget.selectedIndex,
      },
      () => {
        axios.put("/reservations", {
          id: this.props.relatedReservationID,
          newStatus: this.state.selectedIndex,
        });
      }
    );
  }
}
