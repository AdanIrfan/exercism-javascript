/// <reference path="./global.d.ts" />

//
// @ts-check

/**
 * Determine the price of the pizza given the pizza and optional extras
 *
 * @param {Pizza} pizza name of the pizza to be made
 * @param {Extra[]} extras list of extras
 *
 * @returns {number} the price of the pizza
*/
export function pizzaPrice(pizza, ...extras) {
  if(extras.length === 0){
    if(pizza === 'Margherita'){
      return 7;
    }
    if(pizza == 'Caprese'){
      return 9;
    }
    if (pizza == 'Formaggio'){
      return 10;
    }
  }
  let extraPrice;
  let extra = extras.shift()
  if(extra === 'ExtraToppings'){
    extraPrice = 2;
  }
  if (extra === "ExtraSauce"){
    extraPrice = 1;
  }

  return extraPrice + pizzaPrice(pizza, ...extras);
}

/**
 * Calculate the price of the total order, given individual orders
 *
 * (HINT: For this exercise, you can take a look at the supplied "global.d.ts" file
 * for a more info about the type definitions used)
 *
 * @param {PizzaOrder[]} pizzaOrders a list of pizza orders
 * @returns {number} the price of the total order
 */
  export function orderPrice(pizzaOrders) {
    let total = 0;
    let orderprice;
    for (const order of pizzaOrders){
      let extras = order.extras;
      orderprice = pizzaPrice(order.pizza, ...extras)
      total += orderprice;
    }
    return total;
  }
