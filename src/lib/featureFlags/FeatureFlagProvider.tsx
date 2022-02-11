import * as React from "react"

const FeatureFlagContext = React.createContext<EnabledFeatureFlags>({})

export type EnabledFeatureFlags = Record<string, boolean>

export function FeatureFlagProvider({
  featureFlags,
  children,
}: {
  featureFlags: EnabledFeatureFlags
  children: any
}) {
  return (
    <FeatureFlagContext.Provider value={featureFlags}>
      {children}
    </FeatureFlagContext.Provider>
  )
}

export function useFlag(flagName) {
  const context = React.useContext(FeatureFlagContext)
  if (context === undefined) {
    throw new Error("useFlag must be used within a FeatureFlagProvider")
  }

  if (!flagName) {
    return null
  }

  return Object.keys(context).indexOf(flagName) !== -1 && context[flagName]
}
