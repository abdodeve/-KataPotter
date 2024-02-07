import { BasketList, ShoppingCart, OptimalSets } from "./../types";

export class Basket {
  private shoppingCart: ShoppingCart = [];
  private discounts: { [key: string]: number } = {
    "1": 1,
    "2": 0.95,
    "3": 0.9,
    "4": 0.8,
    "5": 0.75,
  };
  private priceBook = 8;

  constructor(shoppingCart: ShoppingCart) {
    this.shoppingCart = shoppingCart;
  }

  /*********************************************************************
   * Part 1 - Get the combination
   **********************************************************************
   */

  /**
   * Using modulo to dividing a number
   * @param totalBooksInTheBasket
   * @param bookSetType
   * @returns { bookSetType: number; numberSets: number[]; rest: number;}
   */
  countBookSetTypes(
    totalBooksInTheBasket: number,
    bookSetType: number
  ): { bookSetType: number; numberSets: number[]; rest: number } {
    if (totalBooksInTheBasket % bookSetType === 0) {
      const numberOfSets = Math.floor(totalBooksInTheBasket / bookSetType);
      const arrSets = [];
      for (let i = 0; i < numberOfSets; i++) {
        arrSets.push(bookSetType);
      }
      return { bookSetType, numberSets: arrSets, rest: 0 };
    } else {
      const rest = totalBooksInTheBasket % bookSetType;
      const numberOfSets = (totalBooksInTheBasket - rest) / bookSetType;
      const arrSets = [];
      for (let i = 0; i < numberOfSets; i++) {
        arrSets.push(bookSetType);
      }
      return { bookSetType, numberSets: arrSets, rest };
    }
  }

  /**
   * Get all possible combinations
   * @param totalBooksInTheBasket
   */
  getAllPossibleCombinations(totalBooksInTheBasket: number) {
    const combinations = [];
    for (let i = 1; i <= 5; i++) {
      combinations.push(this.countBookSetTypes(totalBooksInTheBasket, i));
    }
    return combinations;
  }

  /**
   * Sum of sets
   * @param totalBooksInTheBasket
   */
  calculateSets(totalBooksInTheBasket: number) {
    const combinations = this.getAllPossibleCombinations(totalBooksInTheBasket);
    const sumDiscountPossibility = [];
    for (let i = 0; i < combinations.length; i++) {
      sumDiscountPossibility.push(
        combinations[i].numberSets.length + combinations[i].rest
      );
    }

    return sumDiscountPossibility;
  }

  /**
   * Find optimat set most cheapest
   * @param totalBooksInTheBasket
   */
  findOptimalSet(totalBooksInTheBasket: number) {
    const arrSetsSum = this.calculateSets(totalBooksInTheBasket);
    const min = Math.min(...arrSetsSum);
    const combinations = this.getAllPossibleCombinations(totalBooksInTheBasket);
    const optimalSets: OptimalSets = [];
    arrSetsSum.map((value, index) => {
      if (value === min) optimalSets.push(combinations[index]);
    });

    optimalSets.sort((a, b) => b.rest - a.rest);

    return optimalSets[0];
  }

  /**
   * Get final combination
   * @param totalBooksInTheBasket
   */
  defineFinalCombination(totalBooksInTheBasket: number) {
    const optimalSet = this.findOptimalSet(totalBooksInTheBasket);
    const finalSet = { bookSets: optimalSet.numberSets, rest: optimalSet.rest };
    return finalSet;
  }

  /*********************************************************************
   * Part 2 - Get the Uniq totalBooksInTheBasket
   **********************************************************************
   */
  checkArrayFinished(array: BasketList) {
    let counter = 0;
    const arrayLenght = array.length;
    for (let i = 0; i < array.length; i++) {
      if (array[i] === 0) {
        counter++;
      }
    }
    // finished
    if (counter === arrayLenght - 1 || counter === arrayLenght) return false;
    else return true;
  }

  uniqCombinations(basket: BasketList) {
    let counter = 0;
    while (this.checkArrayFinished(basket)) {
      basket.map((book, index) => {
        if (basket[index] > 0) {
          basket[index] = basket[index] - 1;
          counter++;
        }
      });
    }

    // get rest
    const rest = basket.reduce((prev, curr) => prev + curr, 0);

    return [counter, rest];
  }

  /**********************************************************************
   * Part 3 - Get booksUniq & booksDuplicated
   **********************************************************************
   */

  /**
   * Get uniq and duplicated Books
   * @param basket
   * @returns
   */
  getBooks(basket: BasketList) {
    const uniqCombin = this.uniqCombinations(basket);
    const booksUniq = this.defineFinalCombination(uniqCombin[0]);
    const booksDuplicated = uniqCombin[1];
    return {
      booksUniq: booksUniq.bookSets,
      booksDuplicated: booksDuplicated + booksUniq.rest,
    };
  }

  /**
   * Addition of all books with applying discounts
   * @param basketList
   * @returns number
   */
  sumBooks(basketList: number[]) {
    let priceBasket = 0;
    const { booksUniq, booksDuplicated } = this.getBooks(basketList);

    booksUniq.map((value) => {
      priceBasket += value * this.priceBook * this.discounts[value.toString()];
    });
    priceBasket += booksDuplicated * this.priceBook;
    return priceBasket;
  }

  /**
   * Calculate the most lower price of the basket
   * @returns number
   */
  calculateBasketPrice() {
    const basketList: BasketList = [];
    this.shoppingCart.map((value) => {
      basketList.push(value.quantity);
    });
    return this.sumBooks(basketList);
  }
}
