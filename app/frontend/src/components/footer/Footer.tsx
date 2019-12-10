import * as React from "react";

type Props = {};
type State = {};

export class Footer extends React.Component<Props, State> {
  render() {
    const year: number = new Date().getFullYear();
    return <div>&#169; 2019 - {year} AStA Hochschule Karlsruhe</div>;
  }
}
