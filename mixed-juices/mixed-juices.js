// @ts-check
//
// The line above enables type checking for this file. Various IDEs interpret
// the @ts-check directive. It will give you helpful autocompletion when
// implementing this exercise.

/**
 * Determines how long it takes to prepare a certain juice.
 *
 * @param {string} name
 * @returns {number} time in minutes
 */
export function timeToMixJuice(name) {
  switch(name){
    case 'Pure Strawberry Joy':
      return 0.5;
    case 'Energizer':
    case 'Green Garden':
      return 1.5;
    case 'Tropical Island':
      return 3;
    case 'All or Nothing':
      return 5;
    default:
      return 2.5;
  }
}

/**
 * Calculates the number of limes that need to be cut
 * to reach a certain supply.
 *
 * @param {number} wedgesNeeded
 * @param {string[]} limes
 * @returns {number} number of limes cut
 */
export function limesToCut(wedgesNeeded, limes) {
  let wedges = 0;
  let totalLimesCut = 0;
    for( let i = 0; i < limes.length; i++){
      if (wedges >= wedgesNeeded){
        break;
      } 
      else{
      switch(limes[i]){
          case 'small':
            wedges += 6;
            totalLimesCut ++;
            break;
          case 'medium':
            wedges += 8;
            totalLimesCut ++;
            break;
          case 'large':
            wedges += 10;
            totalLimesCut ++;
      }
      }  
    }
  return totalLimesCut;
}

/**
 * Determines which juices still need to be prepared after the end of the shift.
 *
 * @param {number} timeLeft
 * @param {string[]} orders
 * @returns {string[]} remaining orders after the time is up
 */
export function remainingOrders(timeLeft, orders) {
  let number = 0;
  let orderTime;
  while(timeLeft > 0 && orders.length > 0){
    switch(orders[number]){
    case 'Pure Strawberry Joy':
      orderTime = 0.5;
      break;
    case 'Energizer':
    case 'Green Garden':
      orderTime = 1.5;
      break;
    case 'Tropical Island':
      orderTime = 3;
      break;
    case 'All or Nothing':
      orderTime = 5;
      break;
    default:
      orderTime = 2.5;
    }
    
    timeLeft -= orderTime;
    orders.shift();
  }
  return orders;
}