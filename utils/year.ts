import { parseArgs } from "jsr:@std/cli/parse-args";

const args = parseArgs(Deno.args);

if (!args.year) {
  console.error("Please specify the year using --year=<year>");
  Deno.exit(1);
}

const year = args.year;

await Deno.writeTextFile(".aocrc", year);
console.log(`Year set to ${year} in .aocrc`);
