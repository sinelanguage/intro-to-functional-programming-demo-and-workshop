import * as R from "ramda";

/**
 * Introduction to functional programming week 1.
 * This week: the concepts
 * Next week: refactor a chunk of Bronx code using these concepts
 * Note:  Everyone should have a github account so we can pass around these sandboxes
 */

/**
 * 1: Sum of Numbers
 * Example of Imperative programming
 * Concerned with the HOW to achieve a result
 *
 * We loop over an array of numbers
 * We the array item to the existing running total
 * We return the running total once the loop exits
 * =============================================
 */
const NUMS = [1, 2, 3, 4, 5];
let sum = 0;

/** loop through array and get sum of elements */
function sumOfNumbers(numbers) {
  for (var i = 0; i < numbers.length; i++) {
    sum += parseInt(numbers[i], 10);
  }
  return sum;
}

const calcSumOfNumbers = sumOfNumbers(NUMS);

console.log(`1: Imperative programming:
   sumOfNumbers: ${calcSumOfNumbers}
   `);

/**
 * 2: Sum of Numbers: Functional / Immutable version
 * Example of Declarive programming
 * Concerned with the WHAT
 * We don't see what reduce does to this array behind the scenes
 * =============================================
 */
const sumOfNumbersFP = numbers =>
  numbers.reduce((acc, n) => {
    return acc + n;
  });

const calcSumOfNumbersFp = sumOfNumbersFP(NUMS);

console.log(`2: Functional Programming:
   sumOfNumbersFP: ${calcSumOfNumbersFp}
  `);

/**
 * 3: Sum of numbers: Functional callback
 * We can do better than that
 * The callback you pass to reduce assumes your
 * callback's functional signature respects how reduce operates on values
 * This also works in map,reduce,filter
 * =============================================
 */

// Callback
const sumOfNumbersCallback = (acc, currentNumber) => {
  return acc + currentNumber;
};

// Don't do this, use the magic of JS HOFs
const betterSumOfNumbersFpTooVerbose = numbers =>
  numbers.reduce((acc, item) => sumOfNumbersCallback(acc, item));

// Do this instead.
const betterSumOfNumbersFp = numbers => numbers.reduce(sumOfNumbersCallback);

const calcBetterSumOfNumbersFp = betterSumOfNumbersFp(NUMS);

console.log(`3: betterSumOfNumbersFp: ${calcBetterSumOfNumbersFp}
`);

// Back to Powerpoint and goto next slide
// Slide explains the functional programming paradigm

/**
 * 5: Currying
 *
 * Note: The term arity, refers to the number of arguments a function takes.
 * function(a,b) {...//} takes two arguments therefore its a 2 arity function
 *
 * The purpose of currying is the process of turning a function with
 * multiple arity into a function with less arity
 *
 * How do we code that?
 * Currying transforms a function with multiple arguments into a sequence/series
 * of functions each taking a single argument.
 *
 * Notice that the function takes 3 arguments total and has 3 nested functions.
 * 1 nested function per argument  This is where currying and partial application differ
 */

/**
 * A 3 arity function
 */
const addThreeNumbersThreeArityVersion = (a, b, c) => a + b + c;

/**
 * Curried version of the same function
 * Written in ES5
 */

function addThreeNumbersCurriedES5(a) {
  return function(b) {
    return function(c) {
      return a + b + c;
    };
  };
}

const calcThreeNumbersCurriedES5 = addThreeNumbersCurriedES5(1)(2)(3);

console.log(`4: Currying:
   addThreeNumbersCurriedES5: ${calcThreeNumbersCurriedES5}
   `);

/**
 * 6: Currying ES6
 * Or an even cleaner ES6 version
 */

const addThreeNumbersCurriedES6 = a => b => c => a + b + c;

const calcThreeNumbersCurriedES6 = addThreeNumbersCurriedES6(1)(2)(3);

console.log(`5: addThreeNumbersCurriedES6: ${calcThreeNumbersCurriedES6}
`);

/**
 * Partial application
 * When we have the number of arguments needed to call the nested functions
 * Is more than the number of actual nested functions
 * That is an example of partial application
 * Or when a function is partially applied to its arguments.
 */

/**
 * Let's figure out the volume of a cylinder at of any size,
 * they are all the same length
 * So if volume is l * w * h let's write a curried fn for that
 */

const volumeOfAnything = length => (width, height) => length * width * height;

/**
 * Now let's figure out the volume of any cylinder of length 70;
 * First we partially apply our arguments to the volumeOfAnything fn:
 */
const lengthCylinder70 = volumeOfAnything(70);

const largeCylinder70 = lengthCylinder70(100, 150);
const smallCylinder70 = lengthCylinder70(20, 20);

console.log(`6: Partial Application:
   largeCylinder70: ${largeCylinder70}
   smallCylinder70: ${smallCylinder70}
`);

/**
 * 7: Combining multiple functions
 */

const multiply = (a, b) => a * b;
const addOne = x => x + 1;
const square = x => x * x;

const operate = (x, y) => {
  const product = multiply(x, y);
  const incremented = addOne(product);
  const squared = square(incremented);

  return squared;
};

const combinedFunctions = operate(3, 4);
// => ((3 * 4) + 1)^2 => (12 + 1)^2 => 13^2 => 169

console.log(`7: Combining functions sequentially: ${combinedFunctions}
`);

/**
 * 8: Composed functional pipelines:
 *
 * Function composition is the process of combining two or more functions
 * to produce a new function.
 *
 * Composing functions together is like snapping together a series of pipes
 * for our data to flow through.
 *
 * So what if we could replace that operate function: with this:
 */
const operatePipe = R.pipe(
  multiply,
  addOne,
  square
);

const ourFirstFunctionalPipeline = operatePipe(3, 4);

console.log(`8: Our first functional pipeline: ${ourFirstFunctionalPipeline}
`);

/**
 * So what can Currying and Partial application do for me?
 * How do I use it in my everyday coding life?
 *
 * If the goal is leaner, scalable, reuseable, immutable, readable code.
 * Functional utility libraries are here to help
 *
 * LoDash: Functional utility library
 * Ramda: Functional utility library that automatically curries every function
 *
 * What you get in return is leaner, scalable, reuseable, immutable, readable code.
 *
 * The currying and partial application get abstracted away but you're left with
 * is composed functional pipelines, or as I like to call it, MAGIC :)
 *
 * What does that mean?
 * Let's see an example.
 */

/**
 * 9: Introducing Ramda
 * Currying and partial application
 */
const addThree = R.add(3);
const addFour = R.add(4);

const sumPiped = R.pipe(
  addThree,
  addFour
);

const calcSumPiped = sumPiped(3, 4);

console.log(`9: Ramda: pipe: sumPiped: ${calcSumPiped}
`);

/**
 * Example of a functional pipeline powered by Ramda:
 * Using function currying and partial application
 */
const ITEM_PRICE = 33.99;
const TAX_RATE = 0.15;
const DELIVERY_CHARGE = 35;

const withTax = R.multiply(TAX_RATE);
const withDeliveryCharge = R.add(DELIVERY_CHARGE);

const totalPrice = R.pipe(
  withTax,
  withDeliveryCharge
);

const total = totalPrice(ITEM_PRICE).toFixed(2);

console.log(`10: Ramda: pipe: total: ${total}
`);

/**
 * Where are we going with all this?
 * Composed functional pipelines
 * Functional Pipelines: [Number] -> [a] -> [a]
 */
var pickIndexes = R.useWith(R.ap, [R.map(R.nth), R.of]);

const pickedIndexesFromArray = pickIndexes([0, 2], ["a", "b", "c"]); // => ['a', 'c']

console.log(`11: Ramda: useWith: pickedIndexesFromArray: ${pickedIndexesFromArray}
`);

/**
 * And where we stop?  Hopefully RxJS and Observables
 */
