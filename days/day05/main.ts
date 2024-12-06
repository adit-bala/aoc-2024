// Advent of Code 2024 - Day 5

const input = await Deno.readTextFile("./input.txt");
const testinput = await Deno.readTextFile("./test.txt");

// Split the input into lines and skip the first line (AOC INPUT FETCHED marker)
const lines = input.split("\n");
const testlines = testinput.split("\n");

const adj = lines
  .filter((rule) => rule.includes("|"))
  .map((rule) => rule.split("|").map(Number))
  .reduce((acc, [pre, curr]) => {
    acc.adj[pre] ??= new Set();
    acc.adj[pre].add(curr);
    return acc;
  }, { adj: {} as Record<number, Set<number>> }).adj;

const sum = lines
  .filter((rule) => rule.includes(","))
  .map((rule) => rule.split(",").map(Number))
  .filter((numbers) =>
    numbers.reduce((acc, num, index) => {
      if (index === 0) acc.result.push(true);
      else {
        const isOrdered = !acc.previous.some((prev) => adj[num]?.has(prev));
        acc.result.push(isOrdered);
      }
      acc.previous.push(num);
      return acc;
    }, { previous: [] as number[], result: [] as boolean[] }).result.every((
      val,
    ) => val)
  )
  .reduce((acc, curr) => {
    acc.sum += curr[Math.floor(curr.length / 2)];
    return acc;
  }, { sum: 0 }).sum;

console.log("Part 1:", sum);

const sum2 = lines
  .filter((rule) => rule.includes(","))
  .map((rule) => rule.split(",").map(Number))
  .filter((numbers) =>
    !numbers.reduce((acc, num, index) => {
      if (index === 0) acc.result.push(true);
      else {
        const isOrdered = !acc.previous.some((prev) => adj[num]?.has(prev));
        acc.result.push(isOrdered);
      }
      acc.previous.push(num);
      return acc;
    }, { previous: [] as number[], result: [] as boolean[] }).result.every((
      val,
    ) => val)
  )
  .reduce((acc, curr) => {
    const corrected = curr.reduce((acc2, num, index) => {
      if (index === 0) acc2.previous.push(num);
      else {
        const insertionIndex = acc2.previous.findIndex((prev) =>
          adj[num]?.has(prev)
        );
        if (insertionIndex === -1) acc2.previous.push(num);
        else acc2.previous.splice(insertionIndex, 0, num);
      }
      return acc2;
    }, { previous: [] as number[] }).previous;
    acc.sum += corrected[Math.floor(corrected.length / 2)];
    return acc;
  }, { sum: 0 }).sum;

// Part 2 solution
console.log("Part 2:", sum2);
