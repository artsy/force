import { createContext, useContext, useMemo, useRef } from "react"
import type * as React from "react"

export interface RailImpressionDedupeContextValue {
  /** Whether a `railViewed` event has already fired for `key` this page view. */
  hasRailFired: (key: string) => boolean
  /** Record that `railViewed` has fired for `key` this page view. */
  markRailFired: (key: string) => void
}

/**
 * Default (no provider) value: never deduped. This preserves the once-per-mount
 * behavior of {@link useRailImpressionTracking} everywhere the provider is
 * absent, so the dedupe scope only applies where a provider is mounted.
 */
const DEFAULT_VALUE: RailImpressionDedupeContextValue = {
  hasRailFired: () => false,
  markRailFired: () => {},
}

const RailImpressionDedupeContext =
  createContext<RailImpressionDedupeContextValue>(DEFAULT_VALUE)

/**
 * Scopes `railViewed` deduping to the provider's lifetime — one "page view".
 *
 * A rail mounted inside a tab bar (Palette `Tabs` only renders the active tab)
 * remounts every time the user returns to its tab, which would otherwise refire
 * `railViewed`. Mounting this provider at the page boundary (e.g. `HomeApp`,
 * which remounts on navigation) lets each rail fire at most once per page view
 * while still firing again on a fresh visit.
 */
export const RailImpressionDedupeProvider: React.FC<
  React.PropsWithChildren
> = ({ children }) => {
  const firedKeysRef = useRef<Set<string>>(new Set())

  const value = useMemo<RailImpressionDedupeContextValue>(
    () => ({
      hasRailFired: key => firedKeysRef.current.has(key),
      markRailFired: key => {
        firedKeysRef.current.add(key)
      },
    }),
    [],
  )

  return (
    <RailImpressionDedupeContext.Provider value={value}>
      {children}
    </RailImpressionDedupeContext.Provider>
  )
}

export const useRailImpressionDedupe = (): RailImpressionDedupeContextValue => {
  return useContext(RailImpressionDedupeContext)
}
