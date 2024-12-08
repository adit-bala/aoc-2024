// Advent of Code 2024 - Day 8

const input = await Deno.readTextFile("./input.txt");
const testinput = await Deno.readTextFile("./test.txt");

const lines = input.split("\n");
const testlines = testinput.split("\n");

const coords = lines.filter((line) => line.includes("."))
  .reduce((acc, line, row) => {
    return line.split("").reduce((acc2, char, col) => {
      if (char !== ".") {
        acc2[char] ??= [];
        acc2[char].push([row, col]);
      }
      return acc2;
    }, acc);
  }, {} as Record<string, [number, number][]>);

const gridRows = lines.filter((line) => line.includes(".")).length;
const gridCols = lines[0].length;

const isValidCoordinate = (
  row: number,
  col: number,
): boolean => {
  return row >= 0 && row < gridRows && col >= 0 && col < gridCols;
};

const sum = Object.values(coords).reduce(
  (acc, antennaList: [number, number][]) => {
    antennaList.map(([r1, c1]: [number, number], index: number) =>
      antennaList.slice(index + 1).map(([r2, c2]: [number, number]) => {
        const [dr, dc] = [r1 - r2, c1 - c2];
        const a1 = `${r1 + dr},${c1 + dc}`;
        const a2 = `${r2 + -dr},${c2 + -dc}`;
        if (isValidCoordinate(r1 + dr, c1 + dc) && !acc.seen.has(a1)) {
          acc.seen.add(a1);
          acc.sum++;
        }
        if (isValidCoordinate(r2 - dr, c2 - dc) && !acc.seen.has(a2)) {
          acc.seen.add(a2);
          acc.sum++;
        }
      })
    );
    return acc;
  },
  { seen: new Set<string>(), sum: 0 },
).sum;

// Part 1 solution
console.log("Part 1:", sum);

const sum2 = Object.values(coords).reduce(
  (acc, antennaList: [number, number][]) => {
    antennaList.map(([r1, c1]: [number, number], index: number) =>
      antennaList.slice(index + 1).map(([r2, c2]: [number, number]) => {
        const src = `${r1},${c1}`;
        const dest = `${r2},${c2}`;
        if (!acc.seen.has(src)) {
          acc.seen.add(src);
          acc.sum++;
        }
        if (!acc.seen.has(dest)) {
          acc.seen.add(dest);
          acc.sum++;
        }
        const [dr, dc] = [r1 - r2, c1 - c2];
        let [currR, currC] = [r1 + dr, c1 + dc];
        while (isValidCoordinate(currR, currC)) {
          const pos = `${currR},${currC}`;
          if (!acc.seen.has(pos)) {
            acc.seen.add(pos);
            acc.sum++;
          }
          currR += dr;
          currC += dc;
        }

        // Extend line in the negative direction
        [currR, currC] = [r1 - dr, c1 - dc];
        while (isValidCoordinate(currR, currC)) {
          const pos = `${currR},${currC}`;
          if (!acc.seen.has(pos)) {
            acc.seen.add(pos);
            acc.sum++;
          }
          currR -= dr;
          currC -= dc;
        }
      })
    );
    return acc;
  },
  { seen: new Set<string>(), sum: 0 },
).sum;

// Part 2 solution
console.log("Part 2:", sum2);
