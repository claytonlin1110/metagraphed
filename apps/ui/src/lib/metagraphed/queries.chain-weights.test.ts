import { beforeEach, describe, expect, it, vi } from "vitest";
import type { ApiResult } from "./client";
import { apiFetch } from "./client";
import { chainWeightsQuery, normalizeChainWeights } from "./queries";

vi.mock("./client", async (importOriginal) => {
  const actual = await importOriginal<typeof import("./client")>();
  return { ...actual, apiFetch: vi.fn() };
});

const mockedApiFetch = vi.mocked(apiFetch);

function resolveWith(data: unknown): void {
  mockedApiFetch.mockResolvedValue({
    data,
    meta: {} as ApiResult<unknown>["meta"],
    url: "/api/v1/chain/weights",
  });
}

async function runQuery(window?: string, limit?: number) {
  const opts = chainWeightsQuery(window, limit);
  if (!opts.queryFn) throw new Error("expected a queryFn");
  return opts.queryFn({
    signal: new AbortController().signal,
    queryKey: opts.queryKey,
    meta: undefined,
  } as unknown as Parameters<NonNullable<typeof opts.queryFn>>[0]);
}

describe("normalizeChainWeights", () => {
  it("passes a well-formed leaderboard through", () => {
    expect(
      normalizeChainWeights({
        schema_version: 1,
        window: "7d",
        observed_at: "2026-07-01T00:00:00Z",
        subnet_count: 2,
        network: { distinct_setters: 5, weight_sets: 70, sets_per_setter: 14 },
        intensity_distribution: {
          count: 2,
          mean: 12.5,
          min: 10,
          p25: 10,
          median: 10,
          p75: 15,
          p90: 15,
          max: 15,
        },
        subnets: [
          { netuid: 1, distinct_setters: 4, weight_sets: 40, sets_per_setter: 10 },
          { netuid: 2, distinct_setters: 2, weight_sets: 30, sets_per_setter: 15 },
        ],
      }),
    ).toEqual({
      schema_version: 1,
      window: "7d",
      observed_at: "2026-07-01T00:00:00Z",
      subnet_count: 2,
      network: { distinct_setters: 5, weight_sets: 70, sets_per_setter: 14 },
      intensity_distribution: {
        count: 2,
        mean: 12.5,
        min: 10,
        p25: 10,
        median: 10,
        p75: 15,
        p90: 15,
        max: 15,
      },
      subnets: [
        { netuid: 1, distinct_setters: 4, weight_sets: 40, sets_per_setter: 10 },
        { netuid: 2, distinct_setters: 2, weight_sets: 30, sets_per_setter: 15 },
      ],
    });
  });

  it("degrades a cold / junk store to a schema-stable zeroed leaderboard", () => {
    for (const raw of [{}, null, "x", { subnet_count: "nope" }]) {
      const card = normalizeChainWeights(raw);
      expect(card.subnet_count).toBe(0);
      expect(card.subnets).toEqual([]);
      expect(card.network).toEqual({
        distinct_setters: 0,
        weight_sets: 0,
        sets_per_setter: null,
      });
      expect(card.intensity_distribution).toBeNull();
    }
  });

  it("drops malformed subnet rows and coerces a junk sets_per_setter to null", () => {
    const card = normalizeChainWeights({
      network: { sets_per_setter: { pct: 1 } },
      subnets: [{ distinct_setters: 4 }, { netuid: 2, weight_sets: 30 }],
    });
    expect(card.subnets).toHaveLength(1);
    expect(card.subnets[0]?.netuid).toBe(2);
    expect(card.subnets[0]?.sets_per_setter).toBeNull();
    expect(card.network.sets_per_setter).toBeNull();
  });
});

describe("chainWeightsQuery", () => {
  beforeEach(() => {
    mockedApiFetch.mockReset();
  });

  it("passes window and limit params and normalizes the leaderboard", async () => {
    resolveWith({
      window: "30d",
      subnet_count: 1,
      network: { distinct_setters: 4, weight_sets: 40, sets_per_setter: 10 },
      subnets: [{ netuid: 1, distinct_setters: 4, weight_sets: 40, sets_per_setter: 10 }],
    });
    const res = await runQuery("30d", 5);
    expect(mockedApiFetch).toHaveBeenCalledWith(
      "/api/v1/chain/weights",
      expect.objectContaining({ params: { window: "30d", limit: 5 } }),
    );
    expect(res.data.subnet_count).toBe(1);
    expect(res.data.subnets).toHaveLength(1);
  });

  it("defaults to the 7d window and limit 20", async () => {
    resolveWith({});
    await runQuery();
    expect(mockedApiFetch).toHaveBeenCalledWith(
      "/api/v1/chain/weights",
      expect.objectContaining({ params: { window: "7d", limit: 20 } }),
    );
  });
});
