// Advent of Code 2024 - Day 3

const input = await Deno.readTextFile("./input.txt");
const testinput = await Deno.readTextFile("./test.txt");

// Split the input into lines and skip the first line (AOC INPUT FETCHED marker)
const lines = input.split("\n");
const testlines = testinput.split("\n");

// Your code here
let sum = 0;

const mul = /mul\(\d{1,3},\d{1,3}\)/g; // Global regex
const matches = input.match(mul);
if (matches) {
  sum += matches.map((match) =>
    match.slice(4, -1).split(",").map(Number).reduce(
      (acc, curr) => acc * curr,
      1,
    )
  ).reduce((acc, curr) => acc + curr, 0);
}

// Part 1 solution
console.log("Part 1:", sum);

let sum2 = 0;

const code = /do\(\)|don't\(\)|mul\(\d{1,3},\d{1,3}\)/g;
const matches2 = input.match(code);
let filtered_matches: string[] = [];
if (matches2) {
  let included = true;
  for (const elem of matches2) {
    if (elem === "do()") {
      included = true;
    } else if (elem === "don't()") {
      included = false;
    } else if (included) {
      filtered_matches.push(elem);
    }
  }
}

sum2 = filtered_matches.map((match) =>
  match.slice(4, -1).split(",").map(Number).reduce(
    (acc, curr) => acc * curr,
    1,
  )
).reduce((acc, curr) => acc + curr, 0);

// Part 2 solution
console.log("Part 2:", sum2);
