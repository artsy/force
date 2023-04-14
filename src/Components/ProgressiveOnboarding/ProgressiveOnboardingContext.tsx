import * as Yup from "yup"
import { useDidMount } from "@artsy/palette"
import {
  createContext,
  FC,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react"
import { uniqBy } from "lodash"
import { useFeatureFlag } from "System/useFeatureFlag"
import { useSystemContext } from "System/SystemContext"

interface DismissedKey {
  key: ProgressiveOnboardingKey
  timestamp: number
}

interface DismissedKeyStatus {
  status: boolean
  timestamp: number
}

const ProgressiveOnboardingContext = createContext<{
  dismissed: DismissedKey[]
  dismiss: (
    key: ProgressiveOnboardingKey | readonly ProgressiveOnboardingKey[]
  ) => void
  isDismissed: (key: ProgressiveOnboardingKey) => DismissedKeyStatus
}>({
  dismissed: [],
  dismiss: () => {},
  isDismissed: _key => ({ status: false, timestamp: 0 }),
})

export const ProgressiveOnboardingProvider: FC = ({ children }) => {
  const { user } = useSystemContext()

  const id = user?.id ?? "user"

  const [dismissed, setDismissed] = useState<DismissedKey[]>([])

  const dismiss = useCallback(
    (key: ProgressiveOnboardingKey | ProgressiveOnboardingKey[]) => {
      const keys = Array.isArray(key) ? key : [key]
      const timestamp = Date.now()

      __dismiss__(id, timestamp, keys)

      setDismissed(prevDismissed =>
        uniqBy(
          [...prevDismissed, ...keys.map(k => ({ key: k, timestamp }))],
          d => d.key
        )
      )
    },
    [id]
  )

  useEffect(() => {
    setDismissed(get(id))
  }, [id])

  const mounted = useDidMount()

  const isDismissed = useCallback(
    (key: ProgressiveOnboardingKey) => {
      if (!mounted) return { status: false, timestamp: 0 }

      const dismissedKey = dismissed.find(d => d.key === key)

      return dismissedKey
        ? { status: true, timestamp: dismissedKey.timestamp }
        : { status: false, timestamp: 0 }
    },
    [dismissed, mounted]
  )

  // Ensure that the dismissed state stays in sync incase the user
  // has multiple tabs open.
  useEffect(() => {
    const handleFocus = () => {
      setDismissed(get(id))
    }

    window.addEventListener("focus", handleFocus)

    return () => {
      window.removeEventListener("focus", handleFocus)
    }
  }, [id])

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
] as const

// Saves
export const PROGRESSIVE_ONBOARDING_SAVE_ARTWORK = "save-artwork"
export const PROGRESSIVE_ONBOARDING_SAVE_FIND = "save-find"
export const PROGRESSIVE_ONBOARDING_SAVE_HIGHLIGHT = "save-highlight"
export const PROGRESSIVE_ONBOARDING_SAVE_CHAIN = [
  PROGRESSIVE_ONBOARDING_SAVE_ARTWORK,
  PROGRESSIVE_ONBOARDING_SAVE_FIND,
  PROGRESSIVE_ONBOARDING_SAVE_HIGHLIGHT,
] as const

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
] as const

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

const schema = Yup.object().shape({
  key: Yup.string().oneOf([...PROGRESSIVE_ONBOARDING_KEYS]),
  timestamp: Yup.number(),
})

const isValid = (value: any): value is DismissedKey => {
  return schema.isValidSync(value)
}

export const parse = (value: string | null): DismissedKey[] => {
  if (!value) return []

  try {
    const parsed = JSON.parse(value)

    return parsed.filter((obj: any) => {
      return isValid(obj) && PROGRESSIVE_ONBOARDING_KEYS.includes(obj.key)
    })
  } catch (err) {
    return []
  }
}

export const __dismiss__ = (
  id: string,
  timestamp: number,
  key: ProgressiveOnboardingKey | ProgressiveOnboardingKey[]
) => {
  const keys = Array.isArray(key) ? key : [key]

  keys.forEach(key => {
    const item = localStorage.getItem(localStorageKey(id))
    const dismissed = parse(item)

    localStorage.setItem(
      localStorageKey(id),
      JSON.stringify(
        uniqBy([...dismissed, { key, timestamp }], ({ key }) => key)
      )
    )
  })
}

export const get = (id: string) => {
  const item = localStorage.getItem(localStorageKey(id))

  return parse(item)
}

export const reset = (id: string) => {
  localStorage.removeItem(localStorageKey(id))
}
