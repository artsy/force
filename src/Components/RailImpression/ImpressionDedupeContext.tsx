import { createContext, useContext, useMemo, useRef } from "react"
import type * as React from "react"

export interface ImpressionDedupeContextValue {
  /** Whether an impression event has already fired for `key` this page view. */
  hasFired: (key: string) => boolean
  /** Record that an impression event has fired for `key` this page view. */
  markFired: (key: string) => void
}

/**
 * Default (no provider) value: never deduped. This preserves the once-per-mount
 * behavior of the impression hooks everywhere the provider is absent, so the
 * dedupe scope only applies where a provider is mounted.
 */
const DEFAULT_VALUE: ImpressionDedupeContextValue = {
  hasFired: () => false,
  markFired: () => {},
}

const ImpressionDedupeContext =
  createContext<ImpressionDedupeContextValue>(DEFAULT_VALUE)

/**
 * Scopes impression deduping (`railViewed`, `itemViewed`) to the provider's
 * lifetime — one "page view".
 *
 * Rails and their items mounted inside a tab bar (Palette `Tabs` only renders
 * the active tab) remount every time the user returns to a tab, which would
 * otherwise refire their impression events. Mounting this provider at the page
 * boundary (e.g. `HomeApp`, which remounts on navigation) lets each rail/item
 * fire at most once per page view while still firing again on a fresh visit.
 */
export const ImpressionDedupeProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const firedKeysRef = useRef<Set<string>>(new Set())

  const value = useMemo<ImpressionDedupeContextValue>(
    () => ({
      hasFired: key => firedKeysRef.current.has(key),
      markFired: key => {
        firedKeysRef.current.add(key)
      },
    }),
    [],
  )

  return (
    <ImpressionDedupeContext.Provider value={value}>
      {children}
    </ImpressionDedupeContext.Provider>
  )
}

export const useImpressionDedupe = (): ImpressionDedupeContextValue => {
  return useContext(ImpressionDedupeContext)
}
