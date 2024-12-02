// Advent of Code 2024 - Day 2

const input = await Deno.readTextFile("./input.txt");
const testinput = await Deno.readTextFile("./test.txt");

// Split the input into lines and skip the first line (AOC INPUT FETCHED marker)
const lines = input.split("\n").slice(1);
const testlines = testinput.split("\n");

// Your code here

const part1Sum = lines
  .map((line) => line.trim().split(" ").map(Number))
  .filter((level) => {
    const isIncreasing = level.slice(0, -1).every((num, idx) =>
      num < level[idx + 1]
    );
    const isDecreasing = level.slice(0, -1).every((num, idx) =>
      num > level[idx + 1]
    );
    const hasValidDifferences = level.slice(0, -1).every(
      (num, idx) => {
        const diff = Math.abs(num - level[idx + 1]);
        return diff >= 1 && diff <= 3;
      },
    );
    return (isIncreasing || isDecreasing) && hasValidDifferences;
  }).length;

// Part 1 solution
console.log("Part 1:", part1Sum);

let sum = 0;
function isSafe(level: number[]) {
  let inc = true, dec = true, adj = true;
  for (let i = 0; i < level.length - 1; i++) {
    if (level[i] > level[i + 1]) {
      inc = false;
    }
    if (level[i] < level[i + 1]) {
      dec = false;
    }
    const diff = Math.abs(level[i] - level[i + 1]);
    if (diff < 1 || diff > 3) {
      adj = false;
    }
  }
  return ((inc || dec) && adj);
}

function canBeMadeSafe(level: number[]) {
  for (let i = 0; i < level.length; i++) {
    const modified = [...level.slice(0, i), ...level.slice(i + 1)];
    if (isSafe(modified)) {
      return true;
    }
  }
  return false;
}

for (const line of lines) {
  const level = line.trim().split(" ").map(Number);
  if (isSafe(level)) {
    sum++;
  } else if (canBeMadeSafe(level)) {
    sum++;
  }
}

// Part 2 solution
console.log("Part 2:", sum);
