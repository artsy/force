import {
  FeatureFlagContext,
  FeatureFlagService,
  createFeatureFlagService,
  registerFeatureFlagService,
} from "lib/featureFlags/featureFlagService"

const TestServiceSymbol = Symbol("TestServiceSymbol")

class TestFeatureFlagService implements FeatureFlagService {
  init() {}

  getFeatures() {
    return ["feature-a"]
  }

  enabled(name: string, context?: FeatureFlagContext) {
    return name === "feature-a"
  }

  getVariant: (name: string, context?: FeatureFlagContext | undefined) => any
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
