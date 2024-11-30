// start.ts
import { parseArgs } from "@std/cli/parse-args";
import { ensureFileSync } from "@std/fs/ensure-file";

const args = parseArgs(Deno.args);

if (!args.day) {
  console.error("Please specify the day using --day=<day_number>");
  Deno.exit(1);
}

const day = String(args.day).padStart(2, "0");
const dayFolder = `days/day${day}`;
const filePath = `${dayFolder}/main.ts`;

// ensure main.ts exists
ensureFileSync(filePath);

// change working directory to day folder
Deno.chdir(dayFolder);

const command = new Deno.Command(Deno.execPath(), {
  args: ["run", "--allow-read", "--allow-write", "main.ts"],
});

try {
  const child = command.spawn();
  const status = await child.status;

  if (!status.success) {
    console.error(`Process exited with code ${status.code}`);
    Deno.exit(status.code);
  }
} catch (error) {
  console.error("Error while running the file: ", error);
  Deno.exit(4);
}
