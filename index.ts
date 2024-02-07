import { Basket } from "./src/Basket";

const run = () => {
  const basketExample = [
    { title: "the first book", quantity: 2 },
    { title: "the seconde book", quantity: 2 },
    { title: "the third book", quantity: 2 },
    { title: "the fourth book", quantity: 1 },
    { title: "the fifth book", quantity: 1 },
  ];
  const basket = new Basket(basketExample);
  const totalPrice = basket.calculateBasketPrice();
  console.log(`Total Price: ${totalPrice.toFixed(2)} EUR`);
};
run();
