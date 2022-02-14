export type FeatureFlag = string
export type FeatureFlags = Array<string>

export type FeatureFlagContext = Record<string, any>

export interface FeatureFlagProvider {
  init: () => void
  getFeatures: () => FeatureFlags
  enabled: (name: string, context?: FeatureFlagContext) => boolean
}

const registeredFeatureFlagProviders = new Map<symbol, any>()

export async function createFeatureFlagService(
  type: symbol
): Promise<FeatureFlagProvider> {
  if (!registeredFeatureFlagProviders.has(type)) {
    throw new Error(`The type provider ${type.toString()} is not registered.`)
  }

  // Check if provider has been registered with registerFeatureFlagService()
  const featureFlagClass = registeredFeatureFlagProviders.get(type)
  if (typeof featureFlagClass !== undefined) {
    /*
     ** Instantiate a new feature flag provider instance. Uses a custom
     ** configuration if provided, otherwise use default config from passed in
     ** featureFlagProviderClass.
     */
    const featureFlagProvider = new featureFlagClass!()

    // initialize featureFlag client
    await featureFlagProvider.init()
    return featureFlagProvider
  } else {
    throw new Error("FeatureFlagProvider was defined as null")
  }
}

type ConstructorType<T> = Function & { prototype: T }

export function registerFeatureFlagService<T extends FeatureFlagProvider>(
  type: symbol,
  featureFlagClass: ConstructorType<T>
) {
  registeredFeatureFlagProviders.set(type, featureFlagClass)
}
