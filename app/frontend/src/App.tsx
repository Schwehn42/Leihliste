import React from "react";
import "./App.css";
import { ItemSelectionForm } from "./components/item_selection_form/itemSelectionForm";
import { Reservations } from "./components/reservations/reservations";

export interface AppState {}

class App extends React.Component<{}, AppState> {
  public state = {};

  public componentDidMount() {}

  public render() {
    return (
      <>
        <ItemSelectionForm />
        <Reservations />
      </>
    );
  }
}

export default App;
