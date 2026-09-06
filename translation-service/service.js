// / <reference path="./global.d.ts" />

// import { reject, resolve } from "core-js/fn/promise";
// import { error } from "node:console";
// import { callbackify } from "node:util";
import { NotAvailable } from './errors.js';
// import { values } from "core-js/core/array";

// import { values } from "core-js/core/array";

// import { resolve } from "core-js/fn/promise";

// @ts-check
//
// The lines above enable type checking for this file. Various IDEs interpret
// the @ts-check and reference directives. Together, they give you helpful
// autocompletion when implementing this exercise. You don't need to understand
// them in order to use it.
//
// In your own projects, files, and code, you can play with @ts-check as well.

export class TranslationService {
  /**
   * Creates a new service
   * @param {ExternalApi} api the original api
   */
  constructor(api) {
    this.api = api;
  }

  /**
   * Attempts to retrieve the translation for the given text.
   *
   * - Returns whichever translation can be retrieved, regardless the quality
   * - Forwards any error from the translation api
   *
   * @param {string} text
   * @returns {Promise<string>}
   */
  free(text){
    const promise = this.api.fetch(text);
    return promise.then((value)=>{
       return value.translation;
    })
  }

  /**
   * Batch translates the given texts using the free service.
   *
   * - Resolves all the translations (in the same order), if they all succeed
   * - Rejects with the first error that is encountered
   * - Rejects with a BatchIsEmpty error if no texts are given
   *
   * @param {string[]} texts
   * @returns {Promise<string[]>}
   */
  batch(texts) {
    if(texts.length === 0){
      return Promise.reject(new BatchIsEmpty());
    }
    const arr = [];
    for(const text of texts){
      let promise = this.free(text);
      arr.push(promise);
    }
    return Promise.all(arr);
  }

  /**
   * Requests the service for some text to be translated.
   *
   * Note: the request service is flaky, and it may take up to three times for
   *       it to accept the request.
   *
   * @param {string} text
   * @returns {Promise<void>}
   */
  request(text) {
    return new Promise((resolve, reject)=>{
      let attempts = 0;

      const tryRequest =()=> {
        attempts++;

        this.api.request(text, (error)=>{
          if(error === undefined){
            resolve(undefined);
          }
          else if (attempts < 3){
            tryRequest();
          }
          else{
            reject(error);
          }
        });
      }
      tryRequest();
    });
  }

  /**
   * Retrieves the translation for the given text
   *
   * - Rejects with an error if the quality can not be met
   * - Requests a translation if the translation is not available, then retries
   *
   * @param {string} text
   * @param {number} minimumQuality
   * @returns {Promise<string>}
   */
premium(text, minimumQuality) {
  return this.api.fetch(text)
    .then((result) => {
      if (result.quality >= minimumQuality) {
        return result.translation;
      }

      throw new QualityThresholdNotMet(text);
    })
    .catch((error) => {
      if (!(error instanceof NotAvailable)) {
        throw error;
      }

      return this.request(text)
        .then(() => this.api.fetch(text))
        .then((result) => {
          if (result.quality >= minimumQuality) {
            return result.translation;
          }

          throw new QualityThresholdNotMet(text);
        });
    });
}
}

/** 
 * This error is used to indicate the batch service was called without any
 * texts to translate (it was empty). Do not change the name of this error.
 */
export class BatchIsEmpty extends Error {
  constructor() {
    super(
      `
Requested a batch translation, but there are no texts in the batch.
    `.trim(),
    );
  }
}

export class QualityThresholdNotMet extends Error {
  constructor(text) {
    super(
      `
The translation of ${text} does not meet the requested quality threshold.
    `.trim(),
    );
    this.text = text;
  }
}
