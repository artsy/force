import {
  FeatureFlagContext,
  FeatureFlagProvider,
} from "lib/featureFlags/featureFlagProviderShared"
import {
  createFeatureFlagProvider,
  registerFeatureFlagProvider,
} from "lib/featureFlags/featureFlags"

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
    registerFeatureFlagProvider<TestFeatureFlagProvider>(
      TestProviderSymbol,
      TestFeatureFlagProvider
    )

    const provider = await createFeatureFlagProvider(TestProviderSymbol)

    expect(provider.enabled("feature-a")).toBeTruthy()
    expect(provider.enabled("feature-b")).toBeFalsy()
  })
})
