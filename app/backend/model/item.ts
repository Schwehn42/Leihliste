export class Item {
  id: number;
  name: string;
  maxAmount: number;
  availableAmount: number;

  constructor(id: number, name: string, maxAmount: number) {
    this.id = id;
    this.name = name;
    this.maxAmount = maxAmount;
    this.availableAmount = maxAmount;
  }
}

export interface ItemArrayServerResponse {
  response: Array<Item>;
}
