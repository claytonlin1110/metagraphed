export const CONTRACT_VERSION = "2026-06-06.1";
export const SCHEMA_VERSION = 1;
export const PRIMARY_DOMAIN = "metagraph.sh";
export const API_BASE_PATH = "/api/v1";
export const ARTIFACT_BASE_PATH = "/metagraph";

export const CACHE_SECONDS = {
  short: 60,
  standard: 300,
  static: 600,
};

export const PUBLIC_ARTIFACTS = [
  artifact(
    "providers",
    "/metagraph/providers.json",
    "Provider/source registry.",
    "ProvidersArtifact",
  ),
  artifact(
    "api-index",
    "/metagraph/api-index.json",
    "Clean API route index for metagraph.sh consumers.",
    "ApiIndexArtifact",
  ),
  artifact(
    "openapi",
    "/metagraph/openapi.json",
    "OpenAPI 3.1 contract for the metagraph.sh backend API.",
    "OpenApiArtifact",
  ),
  artifact(
    "changelog",
    "/metagraph/changelog.json",
    "Reviewable generated artifact and subnet-change summary.",
    "ChangelogArtifact",
  ),
  artifact(
    "subnets",
    "/metagraph/subnets.json",
    "All active Finney subnets with compact registry metadata.",
    "SubnetsArtifact",
  ),
  artifact(
    "subnet-detail",
    "/metagraph/subnets/{netuid}.json",
    "Per-subnet detail payload.",
    "SubnetDetailArtifact",
  ),
  artifact(
    "surfaces",
    "/metagraph/surfaces.json",
    "Curated public interface surfaces only.",
    "SurfacesArtifact",
  ),
  artifact(
    "candidates",
    "/metagraph/candidates.json",
    "Unpromoted candidate surfaces from public discovery.",
    "CandidatesArtifact",
  ),
  artifact(
    "review-queue",
    "/metagraph/review-queue.json",
    "Candidate surfaces queued for maintainer review.",
    "ReviewQueueArtifact",
  ),
  artifact(
    "search",
    "/metagraph/search.json",
    "Compact search index for subnets, surfaces, and providers.",
    "SearchArtifact",
  ),
  artifact(
    "coverage",
    "/metagraph/coverage.json",
    "Registry coverage counts and source precedence.",
    "CoverageArtifact",
  ),
  artifact(
    "curation",
    "/metagraph/curation.json",
    "Curation state and gaps for every active subnet.",
    "CurationArtifact",
  ),
  artifact(
    "gaps",
    "/metagraph/gaps.json",
    "Missing public interface facets by subnet.",
    "GapsArtifact",
  ),
  artifact(
    "verification",
    "/metagraph/verification/latest.json",
    "Latest candidate verification snapshot.",
    "VerificationArtifact",
  ),
  artifact(
    "freshness",
    "/metagraph/freshness.json",
    "Freshness and staleness summary for generated backend data.",
    "FreshnessArtifact",
  ),
  artifact(
    "source-health",
    "/metagraph/source-health.json",
    "Upstream source and provider health summary.",
    "SourceHealthArtifact",
  ),
  artifact(
    "source-snapshots",
    "/metagraph/source-snapshots.json",
    "Compact hashes and counts for canonical source inputs.",
    "SourceSnapshotsArtifact",
  ),
  artifact(
    "evidence-ledger",
    "/metagraph/evidence-ledger.json",
    "Public evidence ledger for subnet and surface claims.",
    "EvidenceLedgerArtifact",
  ),
  artifact(
    "health-latest",
    "/metagraph/health/latest.json",
    "Latest surface health snapshot.",
    "HealthLatestArtifact",
  ),
  artifact(
    "health-summary",
    "/metagraph/health/summary.json",
    "Global and per-subnet health rollup.",
    "HealthSummaryArtifact",
  ),
  artifact(
    "health-subnet",
    "/metagraph/health/subnets/{netuid}.json",
    "Per-subnet health payload for metagraph.sh consumers.",
    "HealthSubnetArtifact",
  ),
  artifact(
    "health-badge",
    "/metagraph/health/badges/{netuid}.json",
    "Badge data contract for status rendering.",
    "HealthBadgeArtifact",
  ),
  artifact(
    "rpc-endpoints",
    "/metagraph/rpc-endpoints.json",
    "Bittensor base-layer RPC endpoint registry and probe status.",
    "RpcEndpointsArtifact",
  ),
  artifact(
    "rpc-pools",
    "/metagraph/rpc/pools.json",
    "Endpoint pool scoring for future read-only RPC routing.",
    "RpcPoolsArtifact",
  ),
  artifact(
    "schema-drift",
    "/metagraph/schema-drift.json",
    "OpenAPI schema snapshot/drift status.",
    "SchemaDriftArtifact",
  ),
  artifact(
    "schema-index",
    "/metagraph/schemas/index.json",
    "Index of captured machine-readable schemas.",
    "SchemaIndexArtifact",
  ),
  artifact(
    "adapter",
    "/metagraph/adapters/{slug}.json",
    "Adapter-backed public metrics by subnet slug.",
    "AdapterArtifact",
  ),
  artifact(
    "r2-manifest",
    "/metagraph/r2-manifest.json",
    "R2 upload manifest for generated artifact history.",
    "R2ManifestArtifact",
  ),
  artifact(
    "review-curation",
    "/metagraph/review/curation.json",
    "Maintainer curation and adapter candidate report.",
    "ReviewCurationArtifact",
  ),
  artifact(
    "review-gap-priorities",
    "/metagraph/review/gap-priorities.json",
    "Subnet interface gap priorities.",
    "ReviewGapPrioritiesArtifact",
  ),
  artifact(
    "review-adapter-candidates",
    "/metagraph/review/adapter-candidates.json",
    "Subnets worth deeper adapter work.",
    "ReviewAdapterCandidatesArtifact",
  ),
  artifact(
    "review-decisions",
    "/metagraph/review/maintainer-decisions.json",
    "Public-safe maintainer review decision ledger.",
    "ReviewDecisionsArtifact",
  ),
  artifact(
    "build-summary",
    "/metagraph/build-summary.json",
    "Generated build summary.",
    "BuildSummaryArtifact",
  ),
];

export const API_ROUTES = [
  route(
    "api-index",
    "GET",
    "/api/v1",
    "/metagraph/api-index.json",
    "List backend API routes and response envelope metadata.",
    "standard",
    ["contracts"],
  ),
  route(
    "subnets",
    "GET",
    "/api/v1/subnets",
    "/metagraph/subnets.json",
    "List active Finney subnets.",
    "standard",
    ["subnets"],
    query(
      "netuid",
      "coverage_level",
      "curation_level",
      "status",
      "subnet_type",
    ),
  ),
  route(
    "subnet-detail",
    "GET",
    "/api/v1/subnets/{netuid}",
    "/metagraph/subnets/{netuid}.json",
    "Fetch per-subnet detail.",
    "standard",
    ["subnets"],
    [],
    [{ name: "netuid", schema: { type: "integer", minimum: 0 } }],
  ),
  route(
    "surfaces",
    "GET",
    "/api/v1/surfaces",
    "/metagraph/surfaces.json",
    "List curated public surfaces.",
    "standard",
    ["surfaces"],
    query("netuid", "kind", "provider", "status", "classification"),
  ),
  route(
    "candidates",
    "GET",
    "/api/v1/candidates",
    "/metagraph/candidates.json",
    "List unpromoted candidate surfaces.",
    "standard",
    ["candidates"],
    query("netuid", "kind", "provider", "state"),
  ),
  route(
    "providers",
    "GET",
    "/api/v1/providers",
    "/metagraph/providers.json",
    "List providers and sources.",
    "standard",
    ["providers"],
    query("id", "kind", "authority"),
  ),
  route(
    "coverage",
    "GET",
    "/api/v1/coverage",
    "/metagraph/coverage.json",
    "Fetch registry coverage summary.",
    "standard",
    ["registry"],
  ),
  route(
    "curation",
    "GET",
    "/api/v1/curation",
    "/metagraph/curation.json",
    "Fetch curation states by subnet.",
    "standard",
    ["registry"],
    query("netuid", "coverage_level"),
  ),
  route(
    "gaps",
    "GET",
    "/api/v1/gaps",
    "/metagraph/gaps.json",
    "Fetch interface gap report.",
    "standard",
    ["registry"],
    query("netuid", "coverage_level", "curation_level"),
  ),
  route(
    "health",
    "GET",
    "/api/v1/health",
    "/metagraph/health/summary.json",
    "Fetch global health summary.",
    "short",
    ["health"],
  ),
  route(
    "freshness",
    "GET",
    "/api/v1/freshness",
    "/metagraph/freshness.json",
    "Fetch freshness and staleness state.",
    "short",
    ["operations"],
  ),
  route(
    "source-health",
    "GET",
    "/api/v1/source-health",
    "/metagraph/source-health.json",
    "Fetch upstream source health.",
    "short",
    ["operations"],
  ),
  route(
    "evidence",
    "GET",
    "/api/v1/evidence",
    "/metagraph/evidence-ledger.json",
    "Fetch public evidence ledger.",
    "standard",
    ["evidence"],
    query("q"),
  ),
  route(
    "changelog",
    "GET",
    "/api/v1/changelog",
    "/metagraph/changelog.json",
    "Fetch latest generated change summary.",
    "short",
    ["operations"],
  ),
  route(
    "source-snapshots",
    "GET",
    "/api/v1/source-snapshots",
    "/metagraph/source-snapshots.json",
    "Fetch source input hashes and counts.",
    "standard",
    ["operations"],
    query("q"),
  ),
  route(
    "rpc-endpoints",
    "GET",
    "/api/v1/rpc/endpoints",
    "/metagraph/rpc-endpoints.json",
    "Fetch Bittensor RPC endpoint status.",
    "short",
    ["rpc"],
    query("kind", "provider", "status"),
  ),
  route(
    "rpc-pools",
    "GET",
    "/api/v1/rpc/pools",
    "/metagraph/rpc/pools.json",
    "Fetch endpoint pool scores.",
    "short",
    ["rpc"],
  ),
  route(
    "schemas",
    "GET",
    "/api/v1/schemas",
    "/metagraph/schemas/index.json",
    "Fetch captured schema index.",
    "standard",
    ["schemas"],
  ),
  route(
    "adapter",
    "GET",
    "/api/v1/adapters/{slug}",
    "/metagraph/adapters/{slug}.json",
    "Fetch adapter-backed public metrics.",
    "short",
    ["adapters"],
    [],
    [{ name: "slug", schema: { type: "string", pattern: "^[a-z0-9-]+$" } }],
  ),
  route(
    "search",
    "GET",
    "/api/v1/search",
    "/metagraph/search.json",
    "Fetch compact search index.",
    "standard",
    ["search"],
    query("q"),
  ),
  route(
    "contracts",
    "GET",
    "/api/v1/contracts",
    "/metagraph/contracts.json",
    "Fetch artifact contract metadata.",
    "standard",
    ["contracts"],
  ),
  route(
    "openapi",
    "GET",
    "/api/v1/openapi.json",
    "/metagraph/openapi.json",
    "Fetch OpenAPI 3.1 contract.",
    "standard",
    ["contracts"],
  ),
  route(
    "build",
    "GET",
    "/api/v1/build",
    "/metagraph/build-summary.json",
    "Fetch generated build summary.",
    "short",
    ["operations"],
  ),
];

export function buildContractsArtifact(generatedAt) {
  return {
    schema_version: SCHEMA_VERSION,
    contract_version: CONTRACT_VERSION,
    generated_at: generatedAt,
    name: "Metagraphed public backend artifact contract",
    primary_domain: PRIMARY_DOMAIN,
    status_domain: null,
    base_path: ARTIFACT_BASE_PATH,
    openapi_url: `${ARTIFACT_BASE_PATH}/openapi.json`,
    notes: [
      "Native Bittensor chain data is canonical for active subnet existence.",
      "Curated overlays are canonical for public interface metadata.",
      "Candidate surfaces are discovery records only and are not published as verified registry surfaces.",
      "Health and schema artifacts are operational observations, not protocol authority.",
    ],
    artifacts: PUBLIC_ARTIFACTS.map((entry) => ({
      id: entry.id,
      path: entry.path,
      description: entry.description,
      content_type: "application/json",
      schema_ref: `#/components/schemas/${entry.schema_ref}`,
      contract_version: CONTRACT_VERSION,
    })),
  };
}

export function buildApiIndexArtifact(generatedAt, contractsArtifact) {
  return {
    schema_version: SCHEMA_VERSION,
    contract_version: CONTRACT_VERSION,
    generated_at: generatedAt,
    primary_domain: PRIMARY_DOMAIN,
    base_path: API_BASE_PATH,
    openapi_url: `${API_BASE_PATH}/openapi.json`,
    response_envelope: {
      schema_version: SCHEMA_VERSION,
      fields: ["ok", "data", "meta", "error"],
      success_schema_ref: "#/components/schemas/SuccessEnvelope",
      error_schema_ref: "#/components/schemas/ErrorEnvelope",
      notes:
        "Worker API routes wrap canonical /metagraph artifacts without changing artifact truth.",
    },
    routes: API_ROUTES.map((entry) => ({
      artifact_path: entry.artifact_path,
      cache: entry.cache,
      description: entry.description,
      id: entry.id,
      method: entry.method,
      path: entry.path,
      public: true,
      query_parameters: entry.query_parameters || [],
    })),
    artifact_contracts: contractsArtifact.artifacts.map((entry) => ({
      id: entry.id,
      path: entry.path,
      contract_version: entry.contract_version,
      schema_ref: entry.schema_ref,
    })),
  };
}

export function buildOpenApiArtifact(generatedAt) {
  const paths = {};
  for (const entry of API_ROUTES) {
    const openApiPath = entry.path
      .replace(/\{netuid\}/g, "{netuid}")
      .replace(/\{slug\}/g, "{slug}");
    paths[openApiPath] = {
      ...(paths[openApiPath] || {}),
      [entry.method.toLowerCase()]: {
        operationId: entry.id.replace(
          /[^a-z0-9]+([a-z0-9])/gi,
          (_, character) => character.toUpperCase(),
        ),
        summary: entry.description,
        tags: entry.tags,
        parameters: [
          ...entry.path_parameters.map((parameter) => ({
            ...parameter,
            in: "path",
            required: true,
          })),
          ...entry.query_parameters.map((parameter) => ({
            ...parameter,
            in: "query",
            required: false,
          })),
        ],
        responses: {
          200: {
            description:
              "Canonical artifact wrapped in the Metagraphed API envelope.",
            headers: apiResponseHeaders(),
            content: {
              "application/json": {
                schema: {
                  allOf: [
                    { $ref: "#/components/schemas/SuccessEnvelope" },
                    {
                      type: "object",
                      properties: {
                        data: {
                          $ref: `#/components/schemas/${schemaRefForArtifactPath(entry.artifact_path)}`,
                        },
                      },
                    },
                  ],
                },
              },
            },
          },
          304: {
            description: "ETag matched and the cached response is still valid.",
          },
          404: {
            description: "Artifact or API route was not found.",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ErrorEnvelope" },
              },
            },
          },
          405: {
            description: "HTTP method is not supported.",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ErrorEnvelope" },
              },
            },
          },
          500: {
            description: "Unexpected backend error.",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ErrorEnvelope" },
              },
            },
          },
        },
      },
    };
  }

  return {
    openapi: "3.1.0",
    info: {
      title: "Metagraphed API",
      version: CONTRACT_VERSION,
      description:
        "Backend API over canonical Metagraphed registry artifacts for Bittensor subnet interfaces.",
    },
    servers: [
      {
        url: `https://${PRIMARY_DOMAIN}`,
        description: "Production",
      },
    ],
    paths,
    components: {
      schemas: openApiSchemas(generatedAt),
      headers: {
        ETag: { schema: { type: "string" } },
        CacheControl: { schema: { type: "string" } },
        ContractVersion: { schema: { type: "string" } },
      },
    },
    "x-metagraphed": {
      schema_version: SCHEMA_VERSION,
      contract_version: CONTRACT_VERSION,
      generated_at: generatedAt,
      canonical_artifact_base_path: ARTIFACT_BASE_PATH,
      notes:
        "OpenAPI describes Worker response envelopes and canonical artifact payloads. Raw /metagraph JSON remains the reviewed source contract.",
    },
  };
}

export function artifactPathFromTemplate(template, params = {}) {
  return template
    .replace("{netuid}", String(params.netuid ?? ""))
    .replace("{slug}", String(params.slug ?? ""));
}

export function compileRoutePattern(pathTemplate) {
  const tokenized = pathTemplate
    .replace(/\{netuid\}/g, "__METAGRAPH_NETUID__")
    .replace(/\{slug\}/g, "__METAGRAPH_SLUG__");
  const pattern = tokenized
    .replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
    .replace(/__METAGRAPH_NETUID__/g, "(?<netuid>\\d+)")
    .replace(/__METAGRAPH_SLUG__/g, "(?<slug>[a-z0-9-]+)");
  return new RegExp(`^${pattern}\\/?$`);
}

function artifact(id, pathValue, description, schemaRef) {
  return {
    id,
    path: pathValue,
    description,
    schema_ref: schemaRef,
  };
}

function route(
  id,
  method,
  pathValue,
  artifactPath,
  description,
  cache,
  tags,
  queryParameters = [],
  pathParameters = [],
) {
  return {
    id,
    method,
    path: pathValue,
    artifact_path: artifactPath,
    description,
    cache,
    tags,
    query_parameters: queryParameters,
    path_parameters: pathParameters,
  };
}

function query(...names) {
  return names.map((name) => ({
    name,
    schema:
      name === "netuid" ? { type: "integer", minimum: 0 } : { type: "string" },
  }));
}

function schemaRefForArtifactPath(artifactPath) {
  const contract = PUBLIC_ARTIFACTS.find((entry) =>
    pathTemplatesMatch(entry.path, artifactPath),
  );
  return contract?.schema_ref || "JsonObject";
}

function pathTemplatesMatch(contractPath, artifactPath) {
  if (contractPath === artifactPath) {
    return true;
  }
  const contractPattern = contractPath
    .replace("{netuid}", ":netuid")
    .replace("{slug}", ":slug");
  const artifactPattern = artifactPath
    .replace("{netuid}", ":netuid")
    .replace("{slug}", ":slug");
  return contractPattern === artifactPattern;
}

function apiResponseHeaders() {
  return {
    etag: { $ref: "#/components/headers/ETag" },
    "cache-control": { $ref: "#/components/headers/CacheControl" },
    "x-metagraph-contract-version": {
      $ref: "#/components/headers/ContractVersion",
    },
  };
}

function openApiSchemas(generatedAt) {
  const artifactBase = {
    type: "object",
    required: ["schema_version", "generated_at"],
    properties: {
      schema_version: { const: SCHEMA_VERSION },
      contract_version: { type: "string" },
      generated_at: { type: "string" },
      notes: {
        oneOf: [
          { type: "string" },
          { type: "array", items: { type: "string" } },
        ],
      },
    },
  };

  return {
    JsonObject: {
      type: "object",
      additionalProperties: true,
    },
    SuccessEnvelope: {
      type: "object",
      required: ["ok", "schema_version", "data", "meta"],
      properties: {
        ok: { const: true },
        schema_version: { const: SCHEMA_VERSION },
        data: { type: "object", additionalProperties: true },
        meta: { $ref: "#/components/schemas/ResponseMeta" },
      },
      additionalProperties: false,
    },
    ErrorEnvelope: {
      type: "object",
      required: ["ok", "schema_version", "data", "error", "meta"],
      properties: {
        ok: { const: false },
        schema_version: { const: SCHEMA_VERSION },
        data: { type: "null" },
        error: {
          type: "object",
          required: ["code", "message"],
          properties: {
            code: { type: "string" },
            message: { type: "string" },
          },
          additionalProperties: false,
        },
        meta: { $ref: "#/components/schemas/ResponseMeta" },
      },
      additionalProperties: false,
    },
    ResponseMeta: {
      type: "object",
      required: ["contract_version"],
      properties: {
        artifact_path: { type: "string" },
        cache: { enum: Object.keys(CACHE_SECONDS) },
        contract_version: { type: "string" },
        generated_at: { type: ["string", "null"] },
        source: { type: "string" },
      },
      additionalProperties: true,
    },
    ArtifactBase: artifactBase,
    ProvidersArtifact: objectArtifact("providers", {
      providers: {
        type: "array",
        items: { type: "object", additionalProperties: true },
      },
    }),
    ApiIndexArtifact: objectArtifact("routes", {
      routes: {
        type: "array",
        items: { type: "object", additionalProperties: true },
      },
    }),
    OpenApiArtifact: {
      type: "object",
      required: ["openapi", "info", "paths"],
      properties: {
        openapi: { const: "3.1.0" },
        info: { type: "object", additionalProperties: true },
        servers: {
          type: "array",
          items: { type: "object", additionalProperties: true },
        },
        paths: { type: "object", additionalProperties: true },
        components: { type: "object", additionalProperties: true },
        "x-metagraphed": { type: "object", additionalProperties: true },
      },
      additionalProperties: true,
    },
    ChangelogArtifact: objectArtifact("summary", {
      summary: { type: "object", additionalProperties: true },
    }),
    SubnetsArtifact: objectArtifact("subnets", {
      subnets: {
        type: "array",
        items: { $ref: "#/components/schemas/SubnetIndexEntry" },
      },
    }),
    SubnetDetailArtifact: objectArtifact("subnet", {
      subnet: { type: "object", additionalProperties: true },
      surfaces: {
        type: "array",
        items: { $ref: "#/components/schemas/Surface" },
      },
      candidate_surfaces: {
        type: "array",
        items: { type: "object", additionalProperties: true },
      },
      gaps: { type: "object", additionalProperties: true },
    }),
    SurfacesArtifact: objectArtifact("surfaces", {
      surfaces: {
        type: "array",
        items: { $ref: "#/components/schemas/Surface" },
      },
    }),
    CandidatesArtifact: objectArtifact("candidates", {
      candidates: {
        type: "array",
        items: { type: "object", additionalProperties: true },
      },
    }),
    ReviewQueueArtifact: objectArtifact("candidates", {
      candidates: {
        type: "array",
        items: { type: "object", additionalProperties: true },
      },
    }),
    SearchArtifact: objectArtifact("documents", {
      documents: {
        type: "array",
        items: { type: "object", additionalProperties: true },
      },
    }),
    CoverageArtifact: objectArtifact("chain_subnet_count", {
      chain_subnet_count: { type: "integer", minimum: 0 },
    }),
    CurationArtifact: objectArtifact("curation", {
      curation: {
        type: "array",
        items: { type: "object", additionalProperties: true },
      },
    }),
    GapsArtifact: objectArtifact("gaps", {
      gaps: {
        type: "array",
        items: { type: "object", additionalProperties: true },
      },
    }),
    VerificationArtifact: objectArtifact("results", {
      results: {
        type: "array",
        items: { type: "object", additionalProperties: true },
      },
    }),
    FreshnessArtifact: objectArtifact("sources", {
      sources: {
        type: "array",
        items: { type: "object", additionalProperties: true },
      },
    }),
    SourceHealthArtifact: objectArtifact("providers", {
      providers: {
        type: "array",
        items: { type: "object", additionalProperties: true },
      },
    }),
    SourceSnapshotsArtifact: objectArtifact("sources", {
      sources: {
        type: "array",
        items: { type: "object", additionalProperties: true },
      },
    }),
    EvidenceLedgerArtifact: objectArtifact("claims", {
      claims: {
        type: "array",
        items: { type: "object", additionalProperties: true },
      },
    }),
    HealthLatestArtifact: objectArtifact("surfaces", {
      surfaces: {
        type: "array",
        items: { $ref: "#/components/schemas/HealthSurface" },
      },
    }),
    HealthSummaryArtifact: objectArtifact("subnets", {
      subnets: {
        type: "array",
        items: { type: "object", additionalProperties: true },
      },
    }),
    HealthSubnetArtifact: objectArtifact("summary", {
      summary: { type: "object", additionalProperties: true },
    }),
    HealthBadgeArtifact: objectArtifact("status", {
      status: { type: "string" },
    }),
    RpcEndpointsArtifact: objectArtifact("endpoints", {
      endpoints: {
        type: "array",
        items: { type: "object", additionalProperties: true },
      },
    }),
    RpcPoolsArtifact: objectArtifact("pools", {
      pools: {
        type: "array",
        items: { type: "object", additionalProperties: true },
      },
    }),
    SchemaDriftArtifact: objectArtifact("surfaces", {
      surfaces: {
        type: "array",
        items: { type: "object", additionalProperties: true },
      },
    }),
    SchemaIndexArtifact: objectArtifact("schemas", {
      schemas: {
        type: "array",
        items: { type: "object", additionalProperties: true },
      },
    }),
    AdapterArtifact: objectArtifact("slug", {
      slug: { type: "string" },
      snapshot: { type: ["object", "null"], additionalProperties: true },
    }),
    R2ManifestArtifact: objectArtifact("artifacts", {
      artifacts: {
        type: "array",
        items: { type: "object", additionalProperties: true },
      },
    }),
    ReviewCurationArtifact: objectArtifact("summary", {
      summary: { type: "object", additionalProperties: true },
    }),
    ReviewGapPrioritiesArtifact: objectArtifact("priorities", {
      priorities: {
        type: "array",
        items: { type: "object", additionalProperties: true },
      },
    }),
    ReviewAdapterCandidatesArtifact: objectArtifact("candidates", {
      candidates: {
        type: "array",
        items: { type: "object", additionalProperties: true },
      },
    }),
    ReviewDecisionsArtifact: objectArtifact("decisions", {
      decisions: {
        type: "array",
        items: { type: "object", additionalProperties: true },
      },
    }),
    BuildSummaryArtifact: objectArtifact("artifact_count", {
      artifact_count: { type: "integer", minimum: 0 },
    }),
    SubnetIndexEntry: {
      type: "object",
      required: [
        "netuid",
        "name",
        "slug",
        "coverage_level",
        "curation_level",
        "surface_count",
      ],
      properties: {
        netuid: { type: "integer", minimum: 0 },
        name: { type: "string" },
        slug: { type: "string" },
        coverage_level: { type: "string" },
        curation_level: { type: "string" },
        surface_count: { type: "integer", minimum: 0 },
      },
      additionalProperties: true,
    },
    Surface: {
      type: "object",
      required: ["id", "netuid", "kind", "url", "provider", "public_safe"],
      properties: {
        id: { type: "string" },
        netuid: { type: "integer", minimum: 0 },
        kind: { type: "string" },
        url: { type: "string", format: "uri" },
        provider: { type: "string" },
        public_safe: { type: "boolean" },
      },
      additionalProperties: true,
    },
    HealthSurface: {
      type: "object",
      required: ["surface_id", "netuid", "status", "classification", "url"],
      properties: {
        surface_id: { type: "string" },
        netuid: { type: "integer", minimum: 0 },
        status: { enum: ["ok", "degraded", "failed", "unknown"] },
        classification: { type: "string" },
        url: { type: "string", format: "uri" },
      },
      additionalProperties: true,
    },
    GeneratedOpenApiMarker: {
      type: "object",
      properties: {
        generated_at: { const: generatedAt },
      },
    },
  };
}

function objectArtifact(requiredKey, properties) {
  return {
    allOf: [
      { $ref: "#/components/schemas/ArtifactBase" },
      {
        type: "object",
        required: [requiredKey],
        properties,
        additionalProperties: true,
      },
    ],
  };
}
