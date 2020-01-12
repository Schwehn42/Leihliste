import * as React from "react";

type Props = {
  relatedReservationID: string;
  initiallySelected: number;
};
type State = {};

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
  }

  render() {
    return (
      <select>
        {Array.from(ReservationStatusMap).map(([key, value]) => (
          <option key={key} selected={key === this.props.initiallySelected}>
            {value}
          </option>
        ))}
      </select>
    );
  }
}
