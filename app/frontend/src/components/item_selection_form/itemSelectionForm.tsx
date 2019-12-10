import * as React from "react";
import * as dateMath from "date-arithmetic";
import axios from "axios";
import { Item, ItemArrayServerResponse } from "../../../../backend/model/item";
import { FormEvent } from "react";

type Props = {};
type State = {
  data: Array<Item>;
  error: string;
  maxAvailable: number;
};

export class ItemSelectionForm extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      data: [],
      error: "",
      maxAvailable: 0,
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
          <select onChange={e => this.onChangeOption(e)}>
            {" "}
            {/* update available amount */}
            <option value={0} selected={true} disabled={true}>
              {" "}
              ---{" "}
            </option>{" "}
            {/* default */}
            {this.state.data.length === 0
              ? ""
              : this.state.data.map((item, index) => (
                  <option value={item.availableAmount} key={index}>
                    {item.name}
                  </option>
                ))}
          </select>
        </label>
        <label>
          Verfügbar:
          <span>{this.state.maxAvailable}</span>
        </label>
        <label>
          Anzahl:
          <input type={"number"} min={this.state.maxAvailable > 0 ? 1 : 0} max={this.state.maxAvailable} />
        </label>
        <button type={"submit"}>Reservieren</button>
      </fieldset>
    );
  }

  onChangeOption(e: FormEvent<HTMLSelectElement>): void {
    // update available amount
    this.setState({ maxAvailable: Number.parseInt(e.currentTarget.value, 10) });
  }
}
