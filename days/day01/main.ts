// Advent of Code 2024 - Day 1

const input = await Deno.readTextFile("./input.txt");
const testinput = await Deno.readTextFile("./test.txt");


// Split the input into lines and skip the first line (AOC INPUT FETCHED marker)
const lines = input.split("\n").slice(1);
const testlines = testinput.split("\n");

let left = [];
let right = [];

// Your code here
for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  // Process each line of the input
  const [l, r] = line.trim().split("  ");
  const leftNum = Number(l);
  const rightNum = Number(r);
  if (isNaN(leftNum) || isNaN(rightNum)) {
    console.error(`Invalid line ${i + 1}: "${line}"`);
    continue;
  }

  left.push(leftNum);
  right.push(rightNum);

}

left.sort();
right.sort();

console.log(left);
console.log(right);

let sum = 0;

for (let i = 0; i < left.length; i++) {
  //console.log(left[i], right[i]);
  sum += Math.abs(left[i] - right[i]);
}

// Part 1 solution
console.log("Part 1:", sum);

const freq : Record<number, number> = {};

sum = 0;

for (const element of right) {
  freq[element] = (freq[element] || 0) + 1;
}

for (const element of left) {
  if (freq[element] > 0) {
    sum += element * freq[element];
  }
}


// Part 2 solution
console.log("Part 2:", sum);
