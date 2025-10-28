import { useRouter } from "System/Hooks/useRouter"

/**
 * Custom hook to get feature flag value that works with SSR.
 * This uses the router context which has server-evaluated flags,
 * avoiding hydration mismatches.
 */
export function useFeatureFlag(flagName: string): boolean {
  const { match } = useRouter()

  if (!match?.context?.featureFlags) {
    console.warn(
      `[useFeatureFlag] No feature flags context available for flag: ${flagName}`,
    )
    return false
  }

  return match.context.featureFlags.isEnabled(flagName)
}
