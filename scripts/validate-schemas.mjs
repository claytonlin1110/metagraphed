import Ajv2020 from "ajv/dist/2020.js";
import addFormats from "ajv-formats";
import path from "node:path";
import { PUBLIC_ARTIFACTS } from "../src/contracts.mjs";
import {
  listJsonFiles,
  loadCandidates,
  loadProviders,
  loadSubnets,
  readJson,
  repoRoot,
} from "./lib.mjs";

const ajv = new Ajv2020({
  allErrors: true,
  allowUnionTypes: true,
  strict: false,
  validateFormats: true,
});
addFormats(ajv);

const providerSchema = await readJson(
  path.join(repoRoot, "schemas/provider.schema.json"),
);
const subnetSchema = await readJson(
  path.join(repoRoot, "schemas/subnet-manifest.schema.json"),
);
const candidateSchema = await readJson(
  path.join(repoRoot, "schemas/candidate-surface.schema.json"),
);
const openapi = await readJson(
  path.join(repoRoot, "public/metagraph/openapi.json"),
);

for (const schema of [providerSchema, subnetSchema, candidateSchema]) {
  ajv.addSchema(schema, schema.$id);
}
ajv.addSchema(
  {
    $id: "https://metagraph.sh/openapi-components.schema.json",
    components: openapi.components,
  },
  "https://metagraph.sh/openapi-components.schema.json",
);

const validators = {
  provider: ajv.getSchema(providerSchema.$id),
  subnet: ajv.getSchema(subnetSchema.$id),
  candidate: ajv.getSchema(candidateSchema.$id),
};

const errors = [];

for (const provider of await loadProviders()) {
  validate(validators.provider, provider, `provider:${provider.id}`);
}

for (const subnet of await loadSubnets()) {
  validate(validators.subnet, subnet, `subnet:${subnet.slug}`);
}

for (const candidate of await loadCandidates()) {
  validate(validators.candidate, candidate, `candidate:${candidate.id}`);
}

for (const artifact of await artifactValidationTargets()) {
  const validator = compileComponentValidator(artifact.schema_ref);
  validate(
    validator,
    await readJson(artifact.file_path),
    `artifact:${artifact.label}`,
  );
}

if (errors.length > 0) {
  console.error(`Schema validation failed with ${errors.length} issue(s):`);
  for (const error of errors.slice(0, 80)) {
    console.error(`- ${error}`);
  }
  if (errors.length > 80) {
    console.error(`- ... ${errors.length - 80} more`);
  }
  process.exit(1);
}

console.log("JSON Schema validation passed.");

async function artifactValidationTargets() {
  const targets = [];
  for (const artifact of PUBLIC_ARTIFACTS) {
    if (artifact.path.includes("{netuid}")) {
      const directory =
        artifact.id === "subnet-detail"
          ? path.join(repoRoot, "public/metagraph/subnets")
          : artifact.id === "health-subnet"
            ? path.join(repoRoot, "public/metagraph/health/subnets")
            : path.join(repoRoot, "public/metagraph/health/badges");
      for (const filePath of await listJsonFiles(directory)) {
        targets.push({
          file_path: filePath,
          label: `${artifact.id}:${path.basename(filePath)}`,
          schema_ref: artifact.schema_ref,
        });
      }
      continue;
    }

    if (artifact.path.includes("{slug}")) {
      for (const filePath of await listJsonFiles(
        path.join(repoRoot, "public/metagraph/adapters"),
      )) {
        targets.push({
          file_path: filePath,
          label: `${artifact.id}:${path.basename(filePath)}`,
          schema_ref: artifact.schema_ref,
        });
      }
      continue;
    }

    targets.push({
      file_path: path.join(
        repoRoot,
        "public",
        artifact.path.replace(/^\/+/, ""),
      ),
      label: artifact.id,
      schema_ref: artifact.schema_ref,
    });
  }
  return targets.sort((a, b) => a.label.localeCompare(b.label));
}

function compileComponentValidator(schemaRef) {
  const schemaName = schemaRef.replace("#/components/schemas/", "");
  return ajv.compile({
    $ref: `https://metagraph.sh/openapi-components.schema.json#/components/schemas/${schemaName}`,
  });
}

function validate(validator, value, label) {
  if (!validator(value)) {
    for (const error of validator.errors || []) {
      errors.push(`${label}${error.instancePath}: ${error.message}`);
    }
  }
}
