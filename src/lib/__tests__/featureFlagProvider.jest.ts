import {
  FeatureFlagContext,
  FeatureFlagProvider,
  createFeatureFlagService,
  registerFeatureFlagService,
} from "lib/featureFlags/featureFlagService"

const TestProviderSymbol = Symbol("TestProviderSymbol")

class TestFeatureFlagProvider implements FeatureFlagProvider {
  init() {}

  getFeatures() {
    return ["feature-a"]
  }

  enabled(name: string, context?: FeatureFlagContext) {
    return name === "feature-a"
  }
}

describe("featureFlag tests", () => {
  it("feature is enabled", async () => {
    registerFeatureFlagService<TestFeatureFlagProvider>(
      TestProviderSymbol,
      TestFeatureFlagProvider
    )

    const provider = await createFeatureFlagService(TestProviderSymbol)

    expect(provider.enabled("feature-a")).toBeTruthy()
    expect(provider.enabled("feature-b")).toBeFalsy()
  })
})
