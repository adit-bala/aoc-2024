// Advent of Code 2024 - Day 1

const input = await Deno.readTextFile("./input.txt");
const testinput = await Deno.readTextFile("./test.txt");

// Split the input into lines and skip the first line (AOC INPUT FETCHED marker)
const lines = input.split("\n");
const testlines = testinput.split("\n");

const sum = input
  .split("\n")
  .map((line) => line.trim().split("  ").map(Number))
  .filter(([l, r]) => !isNaN(l) && !isNaN(r))
  .reduce(
    (acc, [left, right], _, arr) => {
      acc.left.push(left);
      acc.right.push(right);
      if (arr.length === acc.left.length) {
        acc.left.sort((a, b) => a - b);
        acc.right.sort((a, b) => a - b);
        acc.sum = acc.left.reduce(
          (sum, l, i) => sum + Math.abs(l - acc.right[i]),
          0,
        );
      }
      return acc;
    },
    { left: [] as number[], right: [] as number[], sum: 0 as number },
  ).sum;

// Part 1 solution
console.log("Part 1:", sum);

const sum2 = input
  .split("\n")
  .map((line) => line.trim().split("  ").map(Number))
  .filter(([l, r]) => !isNaN(l) && !isNaN(r))
  .reduce(
    (acc, [left, right], _, arr) => {
      acc.left.push(left);
      acc.freq[right] = (acc.freq[right] || 0) + 1;
      if (arr.length === acc.left.length) {
        acc.sum = acc.left.reduce(
          (sum, l) => sum + (l * (acc.freq[l] || 0)),
          0,
        );
      }
      return acc;
    },
    {
      left: [] as number[],
      freq: {} as Record<number, number>,
      sum: 0 as number,
    },
  ).sum;

console.log("Similarity Score:", sum2);
