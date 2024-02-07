export type BasketList = number[];
export type ShoppingCart = { title: string; quantity: number }[];

export type OptimalSets = {
  bookSetType: number;
  numberSets: BasketList;
  rest: number;
}[];
