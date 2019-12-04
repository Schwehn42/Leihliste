import axios from "axios";
import React from "react";
import "./App.css";

export interface AppState {
}

class App extends React.Component<{}, AppState> {
  public state = {
  };

  public componentDidMount() {
  }

  public render() {
    return (
      <>
        <div>Hello World</div>
      </>
    );
  }
}

export default App;
