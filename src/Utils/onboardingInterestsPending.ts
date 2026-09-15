import { useSyncExternalStore } from "react"
import * as Yup from "yup"

const PENDING_KEY = "onboarding-interests-pending"

export const ONBOARDING_INTERESTS = [
  "Buying art",
  "Discovering art for inspiration",
  "Reading about art and artists",
  "Tracking prices and results at auction",
  "Browsing for fun",
] as const

// Yup 0.32's types expect a mutable array; `ONBOARDING_INTERESTS` is `as const`
// (readonly), so we spread into a new array to satisfy .oneOf()'s signature.
export const pendingInterestsSchema = Yup.array()
  .of(
    Yup.string()
      .oneOf([...ONBOARDING_INTERESTS])
      .required(),
  )
  .required()

const readPending = (): string[] => {
  try {
    const raw = sessionStorage.getItem(PENDING_KEY)

    if (!raw) return []

    return pendingInterestsSchema.validateSync(JSON.parse(raw), {
      strict: true,
    })
  } catch {
    return []
  }
}

const listeners = new Set<() => void>()

let snapshot: string[] = readPending()

const setSnapshot = (next: string[]) => {
  snapshot = next
  listeners.forEach(listener => listener())
}

export const markOnboardingInterestsPending = (interests: string[]): void => {
  try {
    sessionStorage.setItem(PENDING_KEY, JSON.stringify(interests))
  } catch {}

  setSnapshot(interests)
}

export const clearOnboardingInterestsPending = (): void => {
  try {
    sessionStorage.removeItem(PENDING_KEY)
  } catch {}

  setSnapshot([])
}

const subscribe = (onChange: () => void): (() => void) => {
  listeners.add(onChange)

  return () => listeners.delete(onChange)
}

const getSnapshot = (): string[] => snapshot

const getServerSnapshot = (): string[] => []

export const useOnboardingInterestsPending = (): string[] => {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}
