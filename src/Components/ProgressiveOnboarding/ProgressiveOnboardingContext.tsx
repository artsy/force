import { useDidMount } from "@artsy/palette"
import {
  createContext,
  FC,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react"
import { uniq } from "lodash"
import { useFeatureFlag } from "System/useFeatureFlag"
import { useSystemContext } from "System/SystemContext"

const ProgressiveOnboardingContext = createContext<{
  dismissed: ProgressiveOnboardingKey[]
  dismiss: (key: ProgressiveOnboardingKey | ProgressiveOnboardingKey[]) => void
  isDismissed: (key: ProgressiveOnboardingKey) => boolean
}>({
  dismissed: [],
  dismiss: () => {},
  isDismissed: () => false,
})

export const ProgressiveOnboardingProvider: FC = ({ children }) => {
  const { user } = useSystemContext()
  const id = user?.id ?? "user"

  const [dismissed, setDismissed] = useState<ProgressiveOnboardingKey[]>([])

  const dismiss = useCallback(
    (key: ProgressiveOnboardingKey | ProgressiveOnboardingKey[]) => {
      const keys = Array.isArray(key) ? key : [key]
      __dismiss__(id, keys)
      setDismissed(prevDismissed => uniq([...prevDismissed, ...keys]))
    },
    [id]
  )

  useEffect(() => {
    setDismissed(get(id))
  }, [id])

  const mounted = useDidMount()

  const isDismissed = useCallback(
    (key: ProgressiveOnboardingKey) => {
      return !mounted || dismissed.includes(key)
    },
    [dismissed, mounted]
  )

  return (
    <ProgressiveOnboardingContext.Provider
      value={{ dismissed, dismiss, isDismissed }}
    >
      {children}
    </ProgressiveOnboardingContext.Provider>
  )
}

const FEATURE_FLAG_FOLLOW_KEY = "progressive-onboarding-artist"
const FEATURE_FLAG_SAVE_KEY = "progressive-onboarding-artist"
const FEATURE_FLAG_ALERT_KEY = "grow_progressive-onboarding-alerts"

type Kind = "follows" | "saves" | "alerts"

export const useProgressiveOnboarding = () => {
  const { dismiss, dismissed, isDismissed } = useContext(
    ProgressiveOnboardingContext
  )

  const followEnabled = useFeatureFlag(FEATURE_FLAG_FOLLOW_KEY)
  const saveEnabled = useFeatureFlag(FEATURE_FLAG_SAVE_KEY)
  const alertEnabled = useFeatureFlag(FEATURE_FLAG_ALERT_KEY)

  const isEnabledFor = (kind: Kind) => {
    switch (kind) {
      case "follows":
        return followEnabled
      case "saves":
        return saveEnabled
      case "alerts":
        return alertEnabled
    }
  }

  return {
    dismiss,
    dismissed,
    isEnabledFor,
    isDismissed,
  }
}

export const localStorageKey = (id: string) => {
  return `progressive-onboarding.dismissed.${id}`
}

// Follows
export const PROGRESSIVE_ONBOARDING_FOLLOW_ARTIST = "follow-artist"
export const PROGRESSIVE_ONBOARDING_FOLLOW_FIND = "follow-find"
export const PROGRESSIVE_ONBOARDING_FOLLOW_HIGHLIGHT = "follow-highlight"
export const PROGRESSIVE_ONBOARDING_FOLLOW_CHAIN = [
  PROGRESSIVE_ONBOARDING_FOLLOW_ARTIST,
  PROGRESSIVE_ONBOARDING_FOLLOW_FIND,
  PROGRESSIVE_ONBOARDING_FOLLOW_HIGHLIGHT,
]

// Saves
export const PROGRESSIVE_ONBOARDING_SAVE_ARTWORK = "save-artwork"
export const PROGRESSIVE_ONBOARDING_SAVE_FIND = "save-find"
export const PROGRESSIVE_ONBOARDING_SAVE_HIGHLIGHT = "save-highlight"
export const PROGRESSIVE_ONBOARDING_SAVE_CHAIN = [
  PROGRESSIVE_ONBOARDING_SAVE_ARTWORK,
  PROGRESSIVE_ONBOARDING_SAVE_FIND,
  PROGRESSIVE_ONBOARDING_SAVE_HIGHLIGHT,
]

// Alerts
export const PROGRESSIVE_ONBOARDING_ALERT_CREATE = "alert-create"
export const PROGRESSIVE_ONBOARDING_ALERT_SELECT_FILTER = "alert-select-filter"
export const PROGRESSIVE_ONBOARDING_ALERT_READY = "alert-ready"
export const PROGRESSIVE_ONBOARDING_ALERT_FIND = "alert-find"
export const PROGRESSIVE_ONBOARDING_ALERT_CHAIN = [
  PROGRESSIVE_ONBOARDING_ALERT_CREATE,
  PROGRESSIVE_ONBOARDING_ALERT_SELECT_FILTER,
  PROGRESSIVE_ONBOARDING_ALERT_READY,
  PROGRESSIVE_ONBOARDING_ALERT_FIND,
]

export const PROGRESSIVE_ONBOARDING_KEYS = [
  PROGRESSIVE_ONBOARDING_FOLLOW_ARTIST,
  PROGRESSIVE_ONBOARDING_FOLLOW_FIND,
  PROGRESSIVE_ONBOARDING_FOLLOW_HIGHLIGHT,
  PROGRESSIVE_ONBOARDING_SAVE_ARTWORK,
  PROGRESSIVE_ONBOARDING_SAVE_FIND,
  PROGRESSIVE_ONBOARDING_SAVE_HIGHLIGHT,
  PROGRESSIVE_ONBOARDING_ALERT_CREATE,
  PROGRESSIVE_ONBOARDING_ALERT_SELECT_FILTER,
  PROGRESSIVE_ONBOARDING_ALERT_READY,
  PROGRESSIVE_ONBOARDING_ALERT_FIND,
] as const

export type ProgressiveOnboardingKey = typeof PROGRESSIVE_ONBOARDING_KEYS[number]

export const parse = (
  id: string,
  value: string | null
): ProgressiveOnboardingKey[] => {
  if (!value) return []

  try {
    const parsed = JSON.parse(value)

    return parsed.filter((key: any) => {
      return PROGRESSIVE_ONBOARDING_KEYS.includes(key)
    })
  } catch (err) {
    return []
  }
}

export const __dismiss__ = (
  id: string,
  key: ProgressiveOnboardingKey | ProgressiveOnboardingKey[]
) => {
  const keys = Array.isArray(key) ? key : [key]

  keys.forEach(key => {
    const item = localStorage.getItem(localStorageKey(id))
    const dismissed = parse(id, item)

    localStorage.setItem(
      localStorageKey(id),
      JSON.stringify(uniq([...dismissed, key]))
    )
  })
}

export const get = (id: string) => {
  const item = localStorage.getItem(localStorageKey(id))

  return parse(id, item)
}

export const reset = (id: string) => {
  localStorage.removeItem(localStorageKey(id))
}
