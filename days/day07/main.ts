// Advent of Code 2024 - Day 7

const input = await Deno.readTextFile("./input.txt");
const testinput = await Deno.readTextFile("./test.txt");

// Split the input into lines and skip the first line (AOC INPUT FETCHED marker)
const lines = input.split("\n").splice(1);
const testlines = testinput.split("\n");

const backtrack = (arr: number[], index: number, curr_sum: number): boolean => {
  if (index === arr.length) {
    return curr_sum === arr[0];
  }
  return backtrack(arr, index + 1, curr_sum + arr[index]) ||
    backtrack(arr, index + 1, curr_sum * arr[index]);
};

const sum = lines
  .filter((line) => line.includes(":"))
  .map((line) => {
    const [l, r] = line.split(":");
    const ops = r.split(" ").filter((itm) => itm !== "");
    return [l, ...ops].map(Number);
  })
  .filter((line) => backtrack(line, 2, line[1]))
  .map((line) => line[0]).reduce((acc, sum) => acc + sum, 0);

// Part 1 solution
console.log("Part 1:", sum);

const backtrack2 = (
  arr: number[],
  index: number,
  curr_sum: number,
): boolean => {
  if (index === arr.length) {
    return curr_sum === arr[0];
  }
  return backtrack2(arr, index + 1, curr_sum + arr[index]) ||
    backtrack2(arr, index + 1, curr_sum * arr[index]) ||
    backtrack2(arr, index + 1, Number(`${curr_sum}${arr[index]}`));
};

const sum2 = lines
  .filter((line) => line.includes(":"))
  .map((line) => {
    const [l, r] = line.split(":");
    const ops = r.split(" ").filter((itm) => itm !== "");
    return [l, ...ops].map(Number);
  })
  .filter((line) => backtrack2(line, 2, line[1]))
  .map((line) => line[0]).reduce((acc, sum) => acc + sum, 0);

// Part 2 solution
console.log("Part 2:", sum2);
