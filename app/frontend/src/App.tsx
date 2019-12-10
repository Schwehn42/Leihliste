import React from "react";
import "./App.css";
import { ItemSelectionForm } from "./components/item_selection_form/itemSelectionForm";

export interface AppState {}

class App extends React.Component<{}, AppState> {
  public state = {};

  public componentDidMount() {}

  public render() {
    return (
      <>
        <ItemSelectionForm />
      </>
    );
  }
}

export default App;
