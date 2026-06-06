import path from "node:path";
import { buildOpenApiArtifact } from "../src/contracts.mjs";
import {
  buildTimestamp,
  repoRoot,
  stableStringify,
  writeJson,
} from "./lib.mjs";

const args = new Set(process.argv.slice(2));
const shouldWrite = args.has("--write");
const openapi = buildOpenApiArtifact(buildTimestamp());
const outputPath = path.join(repoRoot, "public/metagraph/openapi.json");

if (shouldWrite) {
  await writeJson(outputPath, openapi);
}

console.log(
  stableStringify({
    mode: shouldWrite ? "write" : "dry-run",
    path_count: Object.keys(openapi.paths || {}).length,
    schema_count: Object.keys(openapi.components?.schemas || {}).length,
    output_path: "/metagraph/openapi.json",
  }),
);
