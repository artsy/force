import {
  useFlag as useUnleashFlag,
  useVariant as useUnleashVariant,
} from "@unleash/proxy-client-react"
import { getOverride } from "System/FeatureFlags/featureFlagOverrides"

/**
 * Wrapper around Unleash's `useFlag` that supports URL-based overrides.
 *
 * Override values: `"true"` → true, anything else → false.
 *
 * @see docs/using_unleash.md for override usage.
 */
export function useFlag(flagName: string): boolean {
  const unleashValue = useUnleashFlag(flagName)
  const override = getOverride(flagName)

  if (override !== undefined) {
    return override === "true"
  }

  return unleashValue
}

/**
 * Wrapper around Unleash's `useVariant` that supports URL-based overrides.
 *
 * The override value becomes the variant name with `enabled: true`.
 * Use `"disabled"` or `"false"` as the override value to get the disabled
 * variant shape.
 *
 * @see docs/using_unleash.md for override usage.
 */
export function useVariant(flagName: string) {
  const unleashValue = useUnleashVariant(flagName)
  const override = getOverride(flagName)

  if (override !== undefined) {
    if (override === "disabled" || override === "false") {
      return {
        name: "disabled",
        enabled: false,
        feature_enabled: false,
        payload: undefined,
      }
    }

    return {
      name: override,
      enabled: true,
      feature_enabled: true,
      payload: unleashValue.payload,
    }
  }

  return unleashValue
}
