import * as React from "react";
import { FormEvent } from "react";
import * as dateMath from "date-arithmetic";
import axios from "axios";
import { Item, ItemArrayServerResponse } from "../../../../backend/model/item";
import { Reservations } from "../reservations/reservations";
import { StudentCouncilsServerResponse } from "../../../../backend/model/reservation";

type Props = {};
type State = {
  itemsList: Array<Item>;
  councilsList: Array<string>;
  selectedItemIndex: number;
  selectedItemAmount: number;
  error: string;
  maxAvailable: number;
  reservationStart: Date | undefined;
  reservationEnd: Date | undefined;
  inputName: string;
  inputCouncil: string;
  comment: string;
};

export class ItemSelectionForm extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      itemsList: [],
      councilsList: [],
      selectedItemIndex: 0,
      selectedItemAmount: 0,
      error: "",
      maxAvailable: 0,
      reservationStart: undefined,
      reservationEnd: undefined,
      inputName: "",
      inputCouncil: "IWI",
      comment: "",
    };
  }

  componentDidMount(): void {
    this.updateItemsList();
    this.updateCouncilsList();
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
          <input
            type="date"
            name="reservationStart"
            min={todayString}
            max={maxPossibleDateString}
            onChange={e => this.handleInputDateChange(e, "reservationStart")}
          />
        </label>
        <label>
          Reservieren zum:
          <input
            type="date"
            name="reservationEnd"
            min={todayString}
            max={maxPossibleDateString}
            onChange={e => this.handleInputDateChange(e, "reservationEnd")}
          />
        </label>
        <label>
          Was:
          <select onChange={e => this.onChangeOption(e)}>
            {/* update available amount */}
            <option value={0} selected={true} disabled={true}>
              {"---"}
            </option>{" "}
            {/* default */}
            {this.state.itemsList.length === 0
              ? ""
              : this.state.itemsList.map((item, index) => (
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
          <input
            type={"number"}
            min={this.state.maxAvailable > 0 ? 1 : 0}
            max={this.state.maxAvailable}
            required={true}
            onChange={e => {
              this.setState({ selectedItemAmount: Number.parseInt(e.currentTarget.value) });
            }}
          />
        </label>
        <label>
          Dein Name:
          <input
            type={"text"}
            name={"inputName"}
            minLength={2}
            maxLength={32}
            required={true}
            placeholder={"Dein Name"}
            onChange={e => this.handleInputNameChange(e)}
          />
        </label>
        <label>
          Fachschaft:
          <select name={"inputCouncil"} onChange={e => this.handleInputCouncilChange(e)}>
            {this.state.councilsList.length === 0
              ? ""
              : this.state.councilsList.map((council, index) => (
                  <option value={council} key={index}>
                    {council}
                  </option>
                ))}
          </select>
        </label>
        <label>
          Kommentar:
          <input type={"text"} maxLength={32} onChange={e => this.handleInputCommentChange(e)} />
        </label>
        <button
          type={"submit"}
          onClick={_ => this.onSubmit()}
          disabled={
            !this.state.maxAvailable ||
            !this.state.selectedItemAmount ||
            !this.state.inputName ||
            !this.state.reservationStart ||
            !this.state.reservationEnd
          }
        >
          Reservieren
        </button>
        {this.state.error && (
          <p className={"errorDisplay"}>
            Error: <span>{this.state.error}</span>
          </p>
        )}
      </fieldset>
    );
  }

  updateItemsList(): void {
    axios
      .get<ItemArrayServerResponse>(`/items`)
      .then(res => {
        this.setState({
          itemsList: res.data.response,
        });
      })
      .catch(err => {
        this.setState({
          error: err.response.data.error,
        });
      });
  }

  updateCouncilsList(): void {
    axios.get<StudentCouncilsServerResponse>(`/reservations/councils`).then(res => {
      this.setState({ councilsList: res.data.response });
    });
  }

  onChangeOption(e: FormEvent<HTMLSelectElement>): void {
    // update available amount
    this.setState({
      maxAvailable: Number.parseInt(e.currentTarget.value, 10),
      selectedItemIndex: e.currentTarget.selectedIndex,
    });
  }

  handleInputDateChange(e: FormEvent<HTMLInputElement>, targetInput: "reservationStart" | "reservationEnd"): void {
    let date: Date = new Date(e.currentTarget.value);
    if (targetInput === "reservationStart") {
      this.setState({ reservationStart: date });
    } else {
      this.setState({ reservationEnd: date });
    }
  }

  handleInputNameChange(e: FormEvent<HTMLInputElement>): void {
    this.setState({
      inputName: e.currentTarget.value,
    });
  }

  handleInputCouncilChange(e: FormEvent<HTMLSelectElement>): void {
    this.setState({
      inputCouncil: e.currentTarget.value,
    });
  }

  handleInputCommentChange(e: FormEvent<HTMLInputElement>): void {
    this.setState({
      comment: e.currentTarget.value,
    });
  }

  onSubmit(): void {
    axios
      .post("/reservations", {
        reservation: {
          item_id: this.state.itemsList[this.state.selectedItemIndex - 1]._id,
          amount: this.state.selectedItemAmount,
          from: this.state.reservationStart,
          to: this.state.reservationEnd,
          name: this.state.inputName,
          studentCouncil: this.state.inputCouncil,
          status: 0,
          comment: this.state.comment,
        },
      })
      .then(_ => {
        Reservations.instance.updateReservationList();
      });
  }
}
