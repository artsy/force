import {
  FeatureFlagContext,
  FeatureFlagService,
  createFeatureFlagService,
  registerFeatureFlagService,
} from "Server/featureFlags/featureFlagService"
import { Variant } from "unleash-client"

const TestServiceSymbol = Symbol("TestServiceSymbol")

class TestFeatureFlagService implements FeatureFlagService {
  init() {}

  getFeatures() {
    return ["feature-a"]
  }

  enabled(name: string, context?: FeatureFlagContext) {
    return name === "feature-a"
  }

  getVariant(name: string, context?: FeatureFlagContext): Variant {
    return {
      name: "feature-a",
      enabled: true,
    }
  }
}

describe("featureFlag tests", () => {
  it("feature is enabled", async () => {
    registerFeatureFlagService<TestFeatureFlagService>(
      TestServiceSymbol,
      TestFeatureFlagService
    )

    const service = await createFeatureFlagService(TestServiceSymbol)

    expect(service.enabled("feature-a")).toBeTruthy()
    expect(service.enabled("feature-b")).toBeFalsy()
  })
})
