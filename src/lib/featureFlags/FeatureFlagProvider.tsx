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

export function useFeatureFlag(flagName) {
  const context = React.useContext(FeatureFlagContext)
  if (context === undefined) {
    throw new Error("useFeatureFlag must be used within a FeatureFlagProvider")
  }

  if (!flagName) {
    return null
  }

  return Object.keys(context).indexOf(flagName) !== -1 && context[flagName]
}

export function useFeatureFlagVariant(flagName) {
  const context = React.useContext(FeatureFlagContext)

  if (context === undefined) {
    throw new Error(
      "useFeatureVariant must be used within a FeatureFlagProvider"
    )
  }

  if (!flagName) {
    return null
  }

  if (!context[flagName]) {
    throw new Error(
      "the argument for flagName is not in the FeatureFlagContext"
    )
  }

  return context[flagName]
}
