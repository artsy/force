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
  dismiss: (key: ProgressiveOnboardingKey) => void
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
    (key: ProgressiveOnboardingKey) => {
      __dismiss__(id, key)
      setDismissed(prevDismissed => [...prevDismissed, key])
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

// TODO: Update prefixing to nest actions SaveArtworkFind, FollowArtistFind, etc.

// Follows
export const PROGRESSIVE_ONBOARDING_FOLLOW_ARTIST = "follow-artist"
export const PROGRESSIVE_ONBOARDING_FIND_FOLLOWS = "find-follows"
export const PROGRESSIVE_ONBOARDING_FOLLOWS_HIGHLIGHT = "follows-highlight"
// Saves
export const PROGRESSIVE_ONBOARDING_SAVE_ARTWORK = "save-artwork"
export const PROGRESSIVE_ONBOARDING_FIND_SAVES = "find-saves"
export const PROGRESSIVE_ONBOARDING_SAVES_HIGHLIGHT = "saves-highlight"

// Alerts
export const PROGRESSIVE_ONBOARDING_ALERT_CREATE = "alert-create"
export const PROGRESSIVE_ONBOARDING_ALERT_SELECT_FILTER = "alert-select-filter"
export const PROGRESSIVE_ONBOARDING_ALERT_READY = "alert-ready"
export const PROGRESSIVE_ONBOARDING_ALERT_FIND = "alert-find"

export const PROGRESSIVE_ONBOARDING_KEYS = [
  PROGRESSIVE_ONBOARDING_FOLLOW_ARTIST,
  PROGRESSIVE_ONBOARDING_FIND_FOLLOWS,
  PROGRESSIVE_ONBOARDING_FOLLOWS_HIGHLIGHT,
  PROGRESSIVE_ONBOARDING_SAVE_ARTWORK,
  PROGRESSIVE_ONBOARDING_FIND_SAVES,
  PROGRESSIVE_ONBOARDING_SAVES_HIGHLIGHT,
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

export const __dismiss__ = (id: string, key: ProgressiveOnboardingKey) => {
  const item = localStorage.getItem(localStorageKey(id))
  const dismissed = parse(id, item)

  localStorage.setItem(
    localStorageKey(id),
    JSON.stringify(uniq([...dismissed, key]))
  )
}

export const get = (id: string) => {
  const item = localStorage.getItem(localStorageKey(id))

  return parse(id, item)
}

export const reset = (id: string) => {
  localStorage.removeItem(localStorageKey(id))
}
