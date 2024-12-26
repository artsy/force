import { getENV } from "Utils/getENV"
import { warnInDevelopment } from "Utils/warnInDevelopment"

export const getFeatureFlag = (featureName: string): boolean | null => {
  const featureFlags = getENV("FEATURE_FLAGS")
  const flagEnabled = featureFlags?.[featureName]?.flagEnabled

  if (flagEnabled === undefined) {
    warnInDevelopment(
      `[Force] Warning: cannot find ${featureName} in featureFlags: `,
      featureFlags,
    )

    return null
  }

  return flagEnabled
}
