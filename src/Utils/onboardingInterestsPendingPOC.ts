import { useSyncExternalStore } from "react"

const PENDING_KEY = "onboarding-interests-pending"

const readPending = (): string[] => {
  try {
    const raw = sessionStorage.getItem(PENDING_KEY)

    return raw ? JSON.parse(raw) : []
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

export const useOnboardingInterestsPendingPOC = (): string[] => {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}
