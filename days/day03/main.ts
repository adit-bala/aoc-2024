// Advent of Code 2024 - Day 3

const input = await Deno.readTextFile("./input.txt");
const testinput = await Deno.readTextFile("./test.txt");

// Split the input into lines and skip the first line (AOC INPUT FETCHED marker)
const lines = input.split("\n");
const testlines = testinput.split("\n");

// Your code here
const mul = /mul\(\d{1,3},\d{1,3}\)/g; // Global regex
const sum = input
  .match(mul)
  ?.map((match) =>
    match
      .slice(4, -1)
      .split(",")
      .map(Number)
      .reduce((acc, curr) => acc * curr, 1)
  )
  .reduce((acc, curr) => acc + curr, 0);

// Part 1 solution
console.log("Part 1:", sum);

const code = /do\(\)|don't\(\)|mul\(\d{1,3},\d{1,3}\)/g;

const filtered_matches = input
  .match(code)
  ?.reduce(
    (acc, elem) => {
      if (elem === "do()") acc.included = true;
      else if (elem === "don't()") acc.included = false;
      else if (acc.included) acc.filtered.push(elem);
      return acc;
    },
    { included: true, filtered: [] as string[] },
  ).filtered ?? [];

const sum2 = filtered_matches
  .map((match) =>
    match
      .slice(4, -1)
      .split(",")
      .map(Number)
      .reduce((acc, curr) => acc * curr, 1)
  )
  .reduce((acc, curr) => acc + curr, 0);

// Part 2 solution
console.log("Part 2:", sum2);
