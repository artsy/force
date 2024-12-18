import { createFeatureFlagsCachePrefix } from "../featureFlagMiddleware"

let featureFlags

describe("createFeatureFlagsCachePrefix", () => {
  beforeEach(() => {
    featureFlags = {
      "feature-a": {
        flagEnabled: true,
        variant: {
          enabled: true,
          name: "variant-a",
        },
      },
      "feature-b": {
        flagEnabled: false,
        variant: {
          enabled: false,
          name: "disabled",
        },
      },
      "feature-c": {
        flagEnabled: true,
        variant: {
          enabled: true,
          name: "variant-c",
        },
      },
    }
  })

  it("returns a string of enabled feature flags and variants", () => {
    const cachePrefix = createFeatureFlagsCachePrefix(featureFlags)
    expect(cachePrefix).toBe("feature-a:variant-a|feature-c:variant-c")
  })

  it("returns an empty string when there are no feature flags enabled", () => {
    featureFlags["feature-a"] = undefined
    featureFlags["feature-c"] = undefined

    const cachePrefix = createFeatureFlagsCachePrefix(featureFlags)
    expect(cachePrefix).toBe("")
  })
})
