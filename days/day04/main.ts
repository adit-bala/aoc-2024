// Advent of Code 2024 - Day 4

const input = await Deno.readTextFile("./input.txt");
const testinput = await Deno.readTextFile("./test.txt");

// Split the input into lines and skip the first line (AOC INPUT FETCHED marker)
const lines = input.split("\n");
const testlines = testinput.split("\n");

// Your code here
const grid = lines
  ?.reduce(
    (acc, elem) => {
      acc.matrix.push(elem.split(""));
      return acc;
    },
    { matrix: [] as string[][] },
  ).matrix;

const search = "XMAS";
const directions = [
  [1, 0],
  [0, 1],
  [-1, 0],
  [0, -1],
  [1, 1],
  [1, -1],
  [-1, 1],
  [-1, -1],
];

function dfs(
  grid: string[][],
  searchString: string,
  index: number,
  x: number,
  y: number,
  dx: number,
  dy: number,
): number {
  if (index === searchString.length) {
    return 1;
  }

  const nx = x + dx;
  const ny = y + dy;

  if (
    nx >= 0 && nx < grid.length &&
    ny >= 0 && ny < grid[0].length &&
    grid[nx][ny] === searchString[index]
  ) {
    return dfs(grid, searchString, index + 1, nx, ny, dx, dy);
  } else {
    return 0;
  }
}

const sum = grid.reduce((totalSum, row, x) => {
  return totalSum + row.reduce((rowSum, _, y) => {
    let count = 0;
    if (grid[x][y] === search[0]) {
      for (const [dx, dy] of directions) {
        count += dfs(grid, search, 1, x, y, dx, dy);
      }
    }
    return rowSum + count;
  }, 0);
}, 0);

console.log(sum);

// Part 1 solution
console.log("Part 1:", sum);

const diagonals: [number, number][] = [
  [-1, -1],
  [-1, 1],
];

const patterns = ["MAS", "SAM"];

let count = 0;

for (let x = 0; x < grid.length; x++) {
  for (let y = 0; y < grid[0].length; y++) {
    if (grid[x][y] === "A") {
      for (const pattern1 of patterns) {
        for (const pattern2 of patterns) {
          // Check Diagonal 1 (top-left to bottom-right)
          let match1 = false;
          let x1 = x - 1;
          let y1 = y - 1;
          let x2 = x + 1;
          let y2 = y + 1;
          if (
            x1 >= 0 &&
            y1 >= 0 &&
            x2 < grid.length &&
            y2 < grid[0].length &&
            grid[x1][y1] + grid[x][y] + grid[x2][y2] === pattern1
          ) {
            match1 = true;
          }

          // Check Diagonal 2 (top-right to bottom-left)
          let match2 = false;
          x1 = x - 1;
          y1 = y + 1;
          x2 = x + 1;
          y2 = y - 1;
          if (
            x1 >= 0 &&
            y1 < grid[0].length &&
            x2 < grid.length &&
            y2 >= 0 &&
            grid[x1][y1] + grid[x][y] + grid[x2][y2] === pattern2
          ) {
            match2 = true;
          }

          if (match1 && match2) {
            count++;
          }
        }
      }
    }
  }
}

// Part 2 solution
console.log("Part 2:", count);
