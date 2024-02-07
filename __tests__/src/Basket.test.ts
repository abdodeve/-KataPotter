import { Basket } from "../../src/Basket";
describe("/Basket.tests.ts", () => {
  test("Should calculate the price of the basket", () => {
    try {
      const basket_1 = [
        { title: "the first book", quantity: 2 },
        { title: "the seconde book", quantity: 2 },
        { title: "the third book", quantity: 2 },
        { title: "the fourth book", quantity: 1 },
        { title: "the fifth book", quantity: 1 },
      ];
      const basket = new Basket(basket_1);
      const result = basket.calculateBasketPrice();
      const expected = 51.2;
      expect(result).toEqual(expected);
    } catch (error) {
      console.error({ error });
    }
  });
});
