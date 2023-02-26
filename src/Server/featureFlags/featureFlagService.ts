import { Variant } from "unleash-client"

export type FeatureFlags = Array<string>

export type FeatureFlagContext = Record<string, any>

export interface FeatureFlagService {
  init: () => void
  getFeatures: () => FeatureFlags
  enabled: (name: string, context?: FeatureFlagContext) => boolean
  getVariant: (name: string, context?: FeatureFlagContext) => Variant
}

const registeredFeatureFlagService = new Map<symbol, any>()

export async function createFeatureFlagService(
  type: symbol
): Promise<FeatureFlagService> {
  if (!registeredFeatureFlagService.has(type)) {
    throw new Error(`The type provider ${type.toString()} is not registered.`)
  }

  // Check if provider has been registered with registerFeatureFlagService()
  const featureFlagClass = registeredFeatureFlagService.get(type)
  if (typeof featureFlagClass !== undefined) {
    // Instantiate a new feature flag provider instance
    const featureFlagService = new featureFlagClass!()

    // initialize featureFlag client
    await featureFlagService.init()
    return featureFlagService
  } else {
    throw new Error("FeatureFlagProvider was defined as null")
  }
}

type ConstructorType<T> = Function & { prototype: T }

export function registerFeatureFlagService<T extends FeatureFlagService>(
  type: symbol,
  featureFlagClass: ConstructorType<T>
) {
  registeredFeatureFlagService.set(type, featureFlagClass)
}
