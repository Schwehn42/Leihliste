import React from "react";
import "./App.css";
import { ItemSelectionForm } from "./components/item_selection_form/itemSelectionForm";
import { Footer } from "./components/footer/Footer";

export interface AppState {}

class App extends React.Component<{}, AppState> {
  public state = {};

  public componentDidMount() {}

  public render() {
    return (
      <>
        <header></header>
        <main>
          <ItemSelectionForm />
        </main>
        <Footer></Footer>
      </>
    );
  }
}

export default App;
