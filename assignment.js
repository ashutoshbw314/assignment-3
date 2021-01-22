// https://github.com/ashutoshbw314/assignment-3


/**
 * Converts kilometer to meter
 * @param   {number} km - A positive number representing kilometers.
 * @returns {number}      Number of meters equivalent to given kilometers.
 */
function kilometerToMeter(km) {
  // input validation
  if (!arguments.length) {
    return "Error: No arguments provided. A positive number is expected.";
  }
  if (typeof km != "number" || km < 0) {
    return "Error: Invalid input. A positive number is expected.";
  } 
  // main logic
  return km * 1000;
}


/**
 * Calculates the total price of given product counts.
 * @param {number} watchesCount - Number of watches.
 * @param {number} phonesCount  - Number of phones.
 * @param {number} laptopsCount - Number of laptops.
 * @returns {number}              Total price of all products. 
 */
function budgetCalculator(watchesCount = 0, phonesCount = 0, laptopsCount = 0) {
  // input validation
  {
    let gadgetData = [["watches", watchesCount],
                         ["phones", phonesCount],
                         ["laptops", laptopsCount]];

    for (let i = 0; i < gadgetData.length; i++) {
      let name = gadgetData[i][0];
      let count = gadgetData[i][1];
      if (typeof count != "number" || count < 0 || !Number.isInteger(count)) {
        return `Error: Invalid input for ${name} count. A non-negative integer is expected.`;
      }
    }
  }

  // main logic
  const WATCH_PRICE = 50;
  const PHONE_PRICE = 100;
  const LAPTOP_PRICE = 500;
  
  return WATCH_PRICE * watchesCount +
         PHONE_PRICE * phonesCount +
         LAPTOP_PRICE * laptopsCount;
}


/**
 * Calculates the cost staying in hotel for certain days.
 * @param   {number} days - Number of days stayed.
 * @returns {number}        Total cost of staying for the specified number of days.
 */
function hotelCost(days) {
  // input validation
  if (!arguments.length) {
    return "Error: No arguments provided. A positive number is expected.";
  }
  if (typeof days != "number" || days < 0) {
    return "Error: Invalid input. A positive number is expected.";
  }


  // main logic
  if (days == 0) return 0;

  // Holds data for per day costs in day ranges. For example, 
  // "1-10": 100 means from day 1 to day 10(both inclusive) the cost is 100.
  const costsInfo = {
    "1-10": 100,
    "11-20": 80,
    "21-Infinity": 50
  };
  
  let ranges = Object.keys(costsInfo);
  let totalCost = 0;

  /**
   * Parses a range string like "1-10" to [1, 10] array.
   * @param   {string} range - A range string like 1-10.
   * @returns {array}          An array representing the range string, e.g. [1, 10] for "1-10".
   */
  function parseRange(range) {
    let [lowerBound, upperBound] = range.split("-");
    return [+lowerBound, +upperBound];
  }

  /**
   * Sees if the given days fall in a range like "1-10".
   * @param   {string} range - A string "n-m" format where n < m is expected.
   * @returns {boolean}        Indicates whether the days fall in the range. 
   */
  function isInRange(range) {
    let [lowerBound, upperBound] = parseRange(range);
    return days >= lowerBound && days <= upperBound; 
  }

  for (let i = 0; i < ranges.length; i++) {
    let range = ranges[i];
    let [lowerBound, upperBound] = parseRange(range);
    
    if (isInRange(range)) {
      let totalDaysHere = days - lowerBound + 1;
      totalCost += costsInfo[range] * totalDaysHere;
      break;
    }

    const daysInRange = upperBound - lowerBound + 1;
    totalCost += costsInfo[range] * daysInRange;
  }

  return totalCost;
}


/**
 * Finds the longest name in a given array of names.
 * @param   {array} names - An array of names.
 * @returns {string}        The longest name in the given array.
 */
function megaFriend(names) {
  // input validation
  if (!(Array.isArray(names))) {
    return "Error: Input is not an array. An array of strings is expected.";
  } else if (!names.length) {
    return "Error: Empty array given. An array of strings is expected.";
  } 

  for (let i = 0; i < names.length; i++) {
    if (typeof names[i] != "string") {
      return `Error: The element at index ${i} is ${typeof names[i]}. A string is expected.`;
    }
  }
 
  // main logic 
  return function findLongestString(s, arr) {
    return !arr.length ? s : findLongestString(arr[0].length > s.length ? arr[0] : s, arr.slice(1));
  }(names[0], names.slice(1)); 
}


/*********** Testing Area ************\

// A bare minimum testing tool written by me tailored for this assignment.
// @param {function} f              - The function to test.
// @param    {array} input          - f's arguments are provided in an array here.
// @param      {any} expectedOutput - The expected return value of f. If an error is expected
//                                    pass "Error" here.

function test(f, input, expectedOutput) {
  function arrToStr (arr) {
    return `[${arr.map(e => typeof e == "string" ? `"${e}"` :
      e === undefined ? "undefined" :
      e === null ? "null" :
      Array.isArray(e) ? arrToStr(e) :
      e).join(", ")}]`;
  }

  const params = arrToStr(input).slice(1, -1);

  const result = f(...input);
  
  if (result === expectedOutput) {
    console.log(`✓ ${f.name}(${params}) \n\t${result}`);
    test.stats.passed++;
  } else {
    if (/^Error:/.test(result) && expectedOutput == "Error") {   
      console.log(`✓ ${f.name}(${params}) \n\tAn error is occured as expected. \n\t${result}`);
      test.stats.passed++;
    } else {
      console.log(`✗ ${f.name}(${params}) \n\tAn unexpected error occured \n\t${result}\n\tExpected: ${expectedOutput}`)
      test.stats.failed++;
    } 
  }    
}

test.stats = {
  passed: 0,
  failed: 0,
  get cases() {
    return this.passed + this.failed;
  }
}


test(kilometerToMeter, [undefined], "Error");
test(kilometerToMeter, [3], 3000);
test(kilometerToMeter, [4.5], 4500);
test(kilometerToMeter, [0.001], 1);
test(kilometerToMeter, [], "Error");
test(kilometerToMeter, ["100 km"], "Error");

test(budgetCalculator, [], 0);
test(budgetCalculator, [0, 0, 0], 0);
test(budgetCalculator, [1, 2, 3], 1750);
test(budgetCalculator, [10, 20, 6], 5500);
test(budgetCalculator, [0, -3, 0], "Error");
test(budgetCalculator, [0, 3, 0], 300);
test(budgetCalculator, [0, 3, -1], "Error");

test(hotelCost, ["two days"], "Error");
test(hotelCost, [-340], "Error");
test(hotelCost, [], "Error");
test(hotelCost, [0], 0);
test(hotelCost, [1], 100);
test(hotelCost, [1.5], 150);
test(hotelCost, [4], 400);
test(hotelCost, [10], 1000);
test(hotelCost, [30], 2300);
test(hotelCost, [30.5], 2325);

test(megaFriend, [["Ene", "Mene", "Jene", "Joe"]], "Mene");
test(megaFriend, [["Ram", "Sam", "Jodu", "Modhu"]], "Modhu");
test(megaFriend, [["Ram", "Sam", 2020 , "Modhu"]], "Error");
test(megaFriend, [[]], "Error");

if (test.stats.cases > 0 && test.stats.failed == 0) {
  console.log("\nCongratulations! All tests succeeded 👍");
  console.log("Total tests: " + test.stats.cases);
} else {
  console.log("\nTotal tests: " + test.stats.cases);
  console.log(test.stats.passed + " tests passed");
  console.log(test.stats.failed + " tests failed");
}
*/
