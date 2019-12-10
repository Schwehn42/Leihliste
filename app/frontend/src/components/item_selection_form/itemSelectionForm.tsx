import * as React from "react";
import * as dateMath from "date-arithmetic";
import axios from "axios";
import { Item, ItemArrayServerResponse } from "../../../../backend/model/item";

type Props = {};
type State = {
  data: Array<Item>;
  error: string;
};

export class ItemSelectionForm extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      data: [],
      error: "",
    };
  }

  componentDidMount(): void {
    axios.get<ItemArrayServerResponse>(`/items`).then(res => {
      this.setState({ data: res.data.response });
    });
  }

  render() {
    const today = new Date();
    const maxPossibleDate = dateMath.add(today, 21, "day"); //reserve up to three weeks in advance
    const todayString = today.toISOString().split("T")[0]; //iso format: yyyy-mm-ddTblahblah
    const maxPossibleDateString = maxPossibleDate.toISOString().split("T")[0];
    const maxAvailable = 4;

    return (
      <fieldset>
        <label>
          Reservieren vom:
          <input type="date" name="reservationStart" min={todayString} max={maxPossibleDateString} />
        </label>
        <label>
          Reservieren zum:
          <input type="date" name="reservationStart" min={todayString} max={maxPossibleDateString} />
        </label>
        <label>
          Was:
          <select>
            <option>Eins</option>
            <option>Zwei</option>
            <option>Drei</option>
          </select>
        </label>
        <label>
          Verfügbar:
          <span>{maxAvailable}</span>
        </label>
        <label>
          Anzahl:
          <input type={"number"} min={maxAvailable > 0 ? 1 : 0} max={maxAvailable} />
        </label>
        <button type={"submit"}>Reservieren</button>
        <ul>
          {this.state.data.length === 0
            ? ""
            : this.state.data.map((item, index) => (
                <li key={index}>
                  {item.name} - {item.availableAmount}
                </li>
              ))}
        </ul>
      </fieldset>
    );
  }
}
