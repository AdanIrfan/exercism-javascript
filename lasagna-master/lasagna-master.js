/// <reference path="./global.d.ts" />

import { receiveMessageOnPort } from "node:worker_threads";

// @ts-check

/**
 * Implement the functions needed to solve the exercise here.
 * Do not forget to export them so they are available for the
 * tests. Here an example of the syntax as reminder:
 *
 * export function yourFunction(...) {
 *   ...
 * }
 */

export function cookingStatus(remainingTime){
    if (remainingTime === 0){
        return 'Lasagna is done.';
    }
    else if(remainingTime === undefined){
        return 'You forgot to set the timer.'
    }
    else{
        return 'Not done, please wait.';
    }
}

export function preparationTime(layers, avgPreparationtime = 2){
    let count = 0;
    for( const layer of layers){
        count++;
    }
    return count * avgPreparationtime;
}

export function quantities(layers){
    let noodles = 50;
    let sauce = 0.2;
    let noodlesCount = 0;
    let sauceCount = 0;
    for (const layer of layers){
        if(layer === "noodles"){
            noodlesCount++;
        }
        else if(layer === "sauce"){
            sauceCount++;
        }
        else{
            continue;
        }
    }
    noodles *= noodlesCount;
    sauce *= sauceCount;
    return {noodles,sauce};
}

export function addSecretIngredient(friendsList, myList){
    const secretIngredient = friendsList[friendsList.length - 1];
    myList.push(secretIngredient);
}

export function scaleRecipe(recipe, numOfPortion){
    const scaledRecipe = {};
    for(const ingredient in recipe){
        scaledRecipe[ingredient] = recipe[ingredient] * (numOfPortion/2);
    }
    return  scaledRecipe;
}