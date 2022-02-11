export type FeatureFlag = string
export type FeatureFlags = Array<string>

export interface FeatureFlagConfig extends Iterable<string> {}

export type FeatureFlagContext = Record<string, any>

export interface FeatureFlagProvider {
  init: () => void
  getFeatures: () => FeatureFlags
  enabled: (name: string, context?: FeatureFlagContext) => boolean
}
