// fetch.ts
import { parseArgs } from "jsr:@std/cli/parse-args";
import { existsSync } from "jsr:@std/fs/exists";

const AOC_SESSION = Deno.env.get("AOC_SESSION");

if (!AOC_SESSION) {
  console.error(
    "Session token not found. Please set AOC_SESSION in your .env file.",
  );
  Deno.exit(1);
}

const args = parseArgs(Deno.args);

if (!args.day) {
  console.error("Please specify the day using --day=<day_number>");
  Deno.exit(1);
}

let year: string;
if (existsSync(".aocrc")) {
  year = await Deno.readTextFile(".aocrc");
  year = year.trim();
} else {
  console.error(
    "Year not specified. Set it using 'deno task year --year=<year>'.",
  );
  Deno.exit(1);
}

const day = String(args.day).padStart(2, "0");

const dayFolder = `days/day${day}`;
const inputFile = `${dayFolder}/input.txt`;

// Check if input file already exists
if (existsSync(inputFile)) {
  console.log(`Input file for day ${args.day} already exists.`);
  // Checking if input has been fetched before
  const content = await Deno.readTextFile(inputFile);
  if (content.length !== 0 && content.startsWith("AOC INPUT FETCHED")) {
    console.log(
      `Input file for day ${args.day} is already fetched. Skipping fetch.`,
    );
    Deno.exit(0);
  }
} else {
  const startCommand = new Deno.Command(Deno.execPath(), {
    args: [
      "run",
      "--allow-read",
      "--allow-write",
      "--allow-run",
      "utils/start.ts",
      `--day=${args.day}`,
    ],
  });

  try {
    const child = startCommand.spawn();
    const status = await child.status;

    if (!status.success) {
      console.error(`Process exited with code ${status.code}`);
      Deno.exit(status.code);
    }
  } catch (error) {
    console.error("Error while running the start.ts: ", error);
    Deno.exit(4);
  }
}

const url = `https://adventofcode.com/${year}/day/${args.day}/input`;

const response = await fetch(url, {
  headers: {
    "Cookie": `session=${AOC_SESSION}`,
    "User-Agent": "github.com/adit-bala/aoc-2024 (aditbala@berkeley.edu)",
  },
});

if (!response.ok) {
  console.error(`Failed to fetch input: ${response.statusText}`);
  Deno.exit(1);
}

const inputText = await response.text();

try {
  const markedInput = `AOC INPUT FETCHED\n${inputText}`;
  await Deno.writeTextFile(inputFile, markedInput);
  console.log(`Fetched input for day ${args.day} and saved to ${inputFile}`);
} catch (error) {
  console.error("Error writing input file:", error);
  Deno.exit(1);
}
