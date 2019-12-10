import * as dateMath from "date-arithmetic";
import React from "react";
import "./App.css";

export interface AppState {}

class App extends React.Component<{}, AppState> {
  public state = {};

  public componentDidMount() {}

  public render() {
    const today = new Date();
    const maxPossibleDate = dateMath.add(today, 21, "day"); //reserve up to three weeks in advance
    const todayString = today.toISOString().split("T")[0]; //iso format: yyyy-mm-ddTblahblah
    const maxPossibleDateString = maxPossibleDate.toISOString().split("T")[0];
    return (
      <>
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
            <span>4</span>
          </label>
          <label>
            Anzahl:
            <input type={"number"} min={1} />
          </label>
          <button type={"submit"}>Reservieren</button>
        </fieldset>
      </>
    );
  }
}

export default App;
