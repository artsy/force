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
  syncFromLoggedOutUser: () => void
}>({
  dismissed: [],
  dismiss: () => {},
  isDismissed: _key => ({ status: false, timestamp: 0 }),
  syncFromLoggedOutUser: () => {},
})

export const ProgressiveOnboardingProvider: FC = ({ children }) => {
  const { user } = useSystemContext()

  const id = user?.id ?? PROGRESSIVE_ONBOARDING_LOGGED_OUT_USER_ID

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

  /**
   * If the user is logged out, and performs some action which causes them
   * to login, we need to sync up the dismissed state from the logged out user
   */
  const syncFromLoggedOutUser = useCallback(() => {
    if (id === PROGRESSIVE_ONBOARDING_LOGGED_OUT_USER_ID) return

    const loggedOutDismissals = get(PROGRESSIVE_ONBOARDING_LOGGED_OUT_USER_ID)
    const loggedInDismissals = get(id)

    const dismissals = uniqBy(
      [...loggedOutDismissals, ...loggedInDismissals],
      d => d.key
    )

    setDismissed(dismissals)

    localStorage.setItem(localStorageKey(id), JSON.stringify(dismissals))
    localStorage.removeItem(
      localStorageKey(PROGRESSIVE_ONBOARDING_LOGGED_OUT_USER_ID)
    )
  }, [id])

  // Ensure that the dismissed state stays in sync incase the user
  // has multiple tabs open.
  useEffect(() => {
    const current = get(id)

    if (current.length === 0) return

    const handleFocus = () => {
      setDismissed(current)
    }

    window.addEventListener("focus", handleFocus)

    return () => {
      window.removeEventListener("focus", handleFocus)
    }
  }, [id])

  return (
    <ProgressiveOnboardingContext.Provider
      value={{ dismissed, dismiss, isDismissed, syncFromLoggedOutUser }}
    >
      {children}
    </ProgressiveOnboardingContext.Provider>
  )
}

export const useProgressiveOnboarding = () => {
  return useContext(ProgressiveOnboardingContext)
}

export const PROGRESSIVE_ONBOARDING_LOGGED_OUT_USER_ID = "user" as const

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
export const PROGRESSIVE_ONBOARDING_ALERT_HIGHLIGHT = "alert-highlight"
export const PROGRESSIVE_ONBOARDING_ALERT_CHAIN = [
  PROGRESSIVE_ONBOARDING_ALERT_CREATE,
  PROGRESSIVE_ONBOARDING_ALERT_SELECT_FILTER,
  PROGRESSIVE_ONBOARDING_ALERT_READY,
  PROGRESSIVE_ONBOARDING_ALERT_FIND,
  PROGRESSIVE_ONBOARDING_ALERT_HIGHLIGHT,
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
  PROGRESSIVE_ONBOARDING_ALERT_HIGHLIGHT,
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
