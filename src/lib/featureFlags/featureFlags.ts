import {
  FeatureFlagConfig,
  FeatureFlagProvider,
} from "./featureFlagProviderShared"

const registeredFeatureFlagProviders = new Map<symbol, any>()

export async function createFeatureFlagProvider<T extends FeatureFlagConfig>(
  type: symbol,
  config?: T
): Promise<FeatureFlagProvider> {
  if (!registeredFeatureFlagProviders.has(type)) {
    throw new Error(`The type provider ${type.toString()} is not registered.`)
  }

  // Check if provider has been registered with registerFeatureFlagProvider()
  const featureFlagClass = registeredFeatureFlagProviders.get(type)
  if (typeof featureFlagClass !== undefined) {
    /*
     ** Instantiate a new feature flag provider instance. Uses a custom
     ** configuration if provided, otherwise use default config from passed in
     ** featureFlagProviderClass.
     */
    const featureFlagProvider = config
      ? new featureFlagClass!(...config)
      : new featureFlagClass!()

    // initialize featureFlag client
    await featureFlagProvider.init()
    return featureFlagProvider
  } else {
    throw new Error("FeatureFlagProvider was defined as null")
  }
}

type ConstructorType<T> = Function & { prototype: T }

export function registerFeatureFlagProvider<T extends FeatureFlagProvider>(
  type: symbol,
  featureFlagClass: ConstructorType<T>
) {
  registeredFeatureFlagProviders.set(type, featureFlagClass)
}
