// start.ts
import { parseArgs } from "jsr:@std/cli/parse-args";
import { ensureFileSync } from "jsr:@std/fs/ensure-file";

const args = parseArgs(Deno.args);

if (!args.day) {
  console.error("Please specify the day using --day=<day_number>");
  Deno.exit(1);
}

ensureFileSync(".aocrc");

const year = Deno.readTextFileSync(".aocrc");

if (!year) {
  console.error(
    "Year not specified. Set it using 'deno task year --year=<year>'.",
  );
  Deno.exit(1);
}

const day = String(args.day).padStart(2, "0");
const dayFolder = `days/day${day}`;

try {
  await Deno.mkdir(dayFolder, { recursive: true });
  console.log(`Created folder ${dayFolder}`);
} catch (error) {
  if (error instanceof Deno.errors.AlreadyExists) {
    console.log(`Folder ${dayFolder} already exists`);
  } else {
    console.error("Error creating folder:", error);
    Deno.exit(1);
  }
}

// Create main.ts with boilerplate code
const boilerplate = `// Advent of Code ${year} - Day ${args.day}

const input = await Deno.readTextFile("./input.txt");
const testinput = await Deno.readTextFile("./test.txt");


// Split the input into lines and skip the first line (AOC INPUT FETCHED marker)
const lines = input.split("\\n");
const testlines = testinput.split("\\n");

// Your code here
for (const line of lines) {
  // Process each line of the input
  console.log(line);
}

// Part 1 solution
console.log("Part 1:", "TODO");

// Part 2 solution
console.log("Part 2:", "TODO");
`;

const mainFile = `${dayFolder}/main.ts`;
await Deno.writeTextFile(mainFile, boilerplate);
console.log(`Created ${mainFile}`);

// Create empty input.txt
const inputFile = `${dayFolder}/input.txt`;
await Deno.writeTextFile(inputFile, "");
console.log(`Created ${inputFile}`);

// Create empty test.txt
const testFile = `${dayFolder}/test.txt`;
await Deno.writeTextFile(testFile, "");
console.log(`Created ${testFile}`);
