// Advent of Code 2024 - Day 6

const input = await Deno.readTextFile("./input.txt");
const testinput = await Deno.readTextFile("./test.txt");

// Split the input into lines and skip the first line (AOC INPUT FETCHED marker)
const lines = input.split("\n").splice(1);
const testlines = testinput.split("\n");

let { grid, obstacles, gx, gy } = lines
  .reduce((acc, curr, row) => {
    const line = curr.split("");
    if (line.length === 0) return acc;
    acc.grid.push(line);

    line.forEach((char: string, col: number) => {
      if (char === "#") {
        acc.obstacles.add(`${row},${col}`);
      } else if ("^><v".includes(char)) {
        acc.gx = row;
        acc.gy = col;
      }
    });
    return acc;
  }, {
    grid: [] as string[][],
    obstacles: new Set<string>(),
    gx: -1,
    gy: -1,
  });

const grid2 = grid.map((row) => row.slice());
const gx2 = gx;
const gy2 = gy;

const guard = "^>v<";

const directions: number[][] = [
  [-1, 0],
  [0, 1],
  [1, 0],
  [0, -1],
];

let guard_index = guard.indexOf(grid[gx][gy]);

let sum = 0;

while (true) {
  const [cx, cy] = directions[guard_index];
  const nx = gx + cx;
  const ny = gy + cy;
  if (!(nx >= 0 && nx < grid.length && ny >= 0 && ny < grid[0].length)) {
    sum++;
    break;
  }
  if (obstacles.has(`${nx},${ny}`)) {
    guard_index = (guard_index + 1) % 4;
  } else {
    if (grid[gx][gy] !== "X") {
      sum++;
      grid[gx][gy] = "X";
    }
    gx = nx;
    gy = ny;
  }
}

// Part 2 solution
console.log("Part 1:", sum);

const loops = (grid: string[][], r: number, c: number, guard_index: number) => {
  const seen = new Set() as Set<string>;
  while (true) {
    const [cx, cy] = directions[guard_index];
    const nx = r + cx;
    const ny = c + cy;
    if (!(nx >= 0 && nx < grid.length && ny >= 0 && ny < grid[0].length)) {
      return false;
    }
    if (seen.has(`${nx},${ny},${guard_index}`)) return true;
    seen.add(`${nx},${ny},${guard_index}`);
    if (obstacles.has(`${nx},${ny}`)) {
      guard_index = (guard_index + 1) % 4;
    } else {
      if (grid[r][c] !== "X") {
        grid[r][c] = "X";
      }
      r = nx;
      c = ny;
    }
  }
};

grid = grid2;
gx = gx2;
gy = gy2;
guard_index = guard.indexOf(grid[gx][gy]);
let obs = 0;

for (let r = 0; r < grid.length; r++) {
  for (let c = 0; c < grid[0].length; c++) {
    if (grid[r][c] === ".") {
      obstacles.add(`${r},${c}`);
      const gridCopy = grid.map((row) => [...row]);
      if (loops(gridCopy, gx, gy, guard_index)) {
        obs++;
      }
      obstacles.delete(`${r},${c}`);
    }
  }
}
// Part 2 solution
console.log("Part 2:", obs);
