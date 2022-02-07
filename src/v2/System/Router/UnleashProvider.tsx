import { FeatureFlags } from "lib/featureFlags/featureFlagProvider"
import * as React from "react"

const FeatureFlagContext = React.createContext<FeatureFlagProviderInterface>({
  featureFlags: [],
})

interface FeatureFlagProviderInterface {
  featureFlags: FeatureFlags
}

function FeatureFlagProvider({ featureFlags, children }) {
  return (
    <FeatureFlagContext.Provider value={featureFlags}>
      {children}
    </FeatureFlagContext.Provider>
  )
}

function useFlag(flagName) {
  const context = React.useContext(FeatureFlagContext)
  if (context === undefined) {
    throw new Error("useFlag must be used within a FeatureFlagProvider")
  }

  if (!flagName) {
    return null
  }

  return Object.keys(context).indexOf(flagName) !== -1 && context[flagName]
}

export { FeatureFlagProvider, useFlag }
