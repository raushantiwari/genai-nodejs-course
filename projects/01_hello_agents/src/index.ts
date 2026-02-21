import { loadEnv } from "./env";
import { selectAndHello } from "./Provider";
async function main() {
  loadEnv();
  try {
    const output = await selectAndHello();
    process.stdout.write(JSON.stringify(output) + "\n");
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("Error in main:", message);
  }
}

main();
