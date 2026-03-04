const STORAGE_KEY = "unleash_overrides"

type Overrides = Record<string, string>

/**
 * Parse the `unleash` URL parameter into a map of flag-name → value.
 *
 * Example: "some-flag:true,some-experiment:experiment"
 *   => { "some-flag": "true", "some-experiment": "experiment" }
 */
export function parseUnleashParam(param: string): Overrides {
  if (!param) return {}

  const overrides: Overrides = {}

  for (const pair of param.split(",")) {
    const [name, ...rest] = pair.split(":")
    const value = rest.join(":")

    if (name?.trim() && value) {
      overrides[name.trim()] = value.trim()
    }
  }

  return overrides
}

/**
 * Read `?unleash=` from the current URL and sync into sessionStorage.
 *
 * - New overrides are merged with existing ones so you can build up
 *   overrides across multiple navigations.
 * - An empty value (`?unleash=`) clears all overrides.
 *
 * Safe to call server-side (no-ops when `window` is unavailable).
 */
export function syncOverridesFromURL(): void {
  if (typeof window === "undefined") return

  const params = new URLSearchParams(window.location.search)
  if (!params.has("unleash")) return

  const raw = params.get("unleash") ?? ""

  if (raw === "") {
    sessionStorage.removeItem(STORAGE_KEY)
    return
  }

  const parsed = parseUnleashParam(raw)
  const existing = getOverrides()
  const merged = { ...existing, ...parsed }
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(merged))
}

export function getOverrides(): Overrides {
  if (typeof window === "undefined") return {}

  try {
    const stored = sessionStorage.getItem(STORAGE_KEY)
    return stored ? JSON.parse(stored) : {}
  } catch {
    return {}
  }
}

export function getOverride(flagName: string): string | undefined {
  return getOverrides()[flagName]
}
