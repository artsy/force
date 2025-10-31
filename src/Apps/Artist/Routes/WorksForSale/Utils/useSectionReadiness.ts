import { useCallback, useMemo, useReducer, useRef } from "react"

type SectionMap<TSectionKey extends string, TValue> = Record<
  TSectionKey,
  TValue
>

type SectionMode = "Idle" | "Loading" | "Ready"

type State<TSectionKey extends string> = {
  lazy: SectionMap<TSectionKey, boolean>
  mode: SectionMap<TSectionKey, SectionMode>
  isNavigating: boolean
  navigationTarget: TSectionKey | null
}

type Action<TSectionKey extends string> =
  | { type: "EAGER_LOAD_KEYS"; keys: TSectionKey[] }
  | { type: "MARK_READY"; key: TSectionKey }
  | { type: "BEGIN_NAVIGATION"; target: TSectionKey }
  | { type: "END_NAVIGATION" }

const buildInitialState = <TSectionKey extends string>(
  orderedKeys: TSectionKey[],
): State<TSectionKey> => {
  const lazy = orderedKeys.reduce<SectionMap<TSectionKey, boolean>>(
    (acc, key) => {
      acc[key] = true
      return acc
    },
    {} as SectionMap<TSectionKey, boolean>,
  )

  const mode = orderedKeys.reduce<SectionMap<TSectionKey, SectionMode>>(
    (acc, key) => {
      acc[key] = "Idle"
      return acc
    },
    {} as SectionMap<TSectionKey, SectionMode>,
  )

  return { lazy, mode, isNavigating: false, navigationTarget: null }
}

const reducer = <TSectionKey extends string>(
  state: State<TSectionKey>,
  action: Action<TSectionKey>,
): State<TSectionKey> => {
  switch (action.type) {
    case "EAGER_LOAD_KEYS": {
      const nextLazy = { ...state.lazy }
      const nextMode = { ...state.mode }

      action.keys.forEach(key => {
        nextLazy[key] = false
        if (nextMode[key] !== "Ready") nextMode[key] = "Loading"
      })

      return { ...state, lazy: nextLazy, mode: nextMode }
    }

    case "MARK_READY": {
      if (state.mode[action.key] === "Ready") return state

      return {
        ...state,
        mode: { ...state.mode, [action.key]: "Ready" },
      }
    }

    case "BEGIN_NAVIGATION": {
      return { ...state, isNavigating: true, navigationTarget: action.target }
    }

    case "END_NAVIGATION": {
      return { ...state, isNavigating: false, navigationTarget: null }
    }

    default: {
      return state
    }
  }
}

type UseSectionReadinessReturn<TSectionKey extends string> = {
  /** Maps each section key to whether it should be lazily loaded (true) or eagerly loaded (false) */
  lazy: SectionMap<TSectionKey, boolean>
  /** Maps each section key to its current readiness state: "Idle", "Loading", or "Ready" */
  mode: SectionMap<TSectionKey, SectionMode>
  /** Maps each section key to whether navigation is currently targeting that section */
  navigating: SectionMap<TSectionKey, boolean>
  /** Callback function to mark a section as ready. Call this when a section finishes loading. */
  markReady: (key: TSectionKey) => void
  /** Wait for one or more sections to become ready. Returns a promise that resolves when all specified sections are ready. */
  waitFor: (keys: TSectionKey[]) => Promise<void>
  /** Get all section keys that come before the target section in the order */
  priorTo: (target: TSectionKey) => TSectionKey[]
  /** Wait for all sections up to (and optionally including) a target section to be ready. This will trigger eager loading of those sections. */
  waitUntil: (
    target: TSectionKey,
    options?: { includeTarget?: boolean },
  ) => Promise<void>
  /** The original ordered array of section keys */
  order: TSectionKey[]
  /** Mark sections as needing to be eagerly loaded (sets lazy to false and mode to "Loading") */
  eagerLoad: (keys: TSectionKey[]) => void
}

export const useSectionReadiness = <TSectionKey extends string>(
  orderedKeys: TSectionKey[],
): UseSectionReadinessReturn<TSectionKey> => {
  const [{ lazy, mode, isNavigating, navigationTarget }, dispatch] = useReducer(
    reducer<TSectionKey>,
    orderedKeys,
    buildInitialState,
  )

  const waitersRef = useRef<SectionMap<TSectionKey, Array<() => void>>>(
    orderedKeys.reduce<SectionMap<TSectionKey, Array<() => void>>>(
      (acc, key) => {
        acc[key] = []
        return acc
      },
      {} as SectionMap<TSectionKey, Array<() => void>>,
    ),
  )

  const markReady = useCallback(
    (key: TSectionKey) => {
      if (mode[key] !== "Ready") {
        const waiters = waitersRef.current[key]
        waiters.forEach(resolve => resolve())
        waitersRef.current[key] = []
      }

      dispatch({ type: "MARK_READY", key })
    },
    [mode],
  )

  const waitFor = useCallback(
    async (keys: TSectionKey[]) => {
      await Promise.all(
        keys.map(key => {
          return new Promise<void>(resolve => {
            if (mode[key] === "Ready") return resolve()

            waitersRef.current[key].push(resolve)
          })
        }),
      )
    },
    [mode],
  )

  const priorTo = useCallback(
    (target: TSectionKey) => orderedKeys.slice(0, orderedKeys.indexOf(target)),
    [orderedKeys],
  )

  const eagerLoad = useCallback((keys: TSectionKey[]) => {
    dispatch({ type: "EAGER_LOAD_KEYS", keys })
  }, [])

  const waitUntil = useCallback(
    async (target: TSectionKey, options?: { includeTarget?: boolean }) => {
      const index = orderedKeys.indexOf(target)
      const end = index + (options?.includeTarget ? 1 : 0)
      const keys = orderedKeys.slice(0, Math.max(0, end))

      if (keys.length === 0) return

      dispatch({ type: "BEGIN_NAVIGATION", target })
      eagerLoad(keys)

      try {
        await waitFor(keys)
      } finally {
        dispatch({ type: "END_NAVIGATION" })
      }
    },
    [orderedKeys, eagerLoad, waitFor],
  )

  const navigating = useMemo(() => {
    return orderedKeys.reduce<SectionMap<TSectionKey, boolean>>(
      (acc, key) => {
        acc[key] = isNavigating && navigationTarget === key
        return acc
      },
      {} as SectionMap<TSectionKey, boolean>,
    )
  }, [orderedKeys, isNavigating, navigationTarget])

  return {
    lazy,
    mode,
    navigating,
    markReady,
    waitFor,
    priorTo,
    waitUntil,
    order: orderedKeys,
    eagerLoad,
  }
}

type UseSectionReadyProps = {
  onReady?: () => void
}

export const useSectionReady = ({ onReady }: UseSectionReadyProps) => {
  const rendered = useRef(false)

  const handleReady = () => {
    if (rendered.current) return
    rendered.current = true
    onReady?.()
  }

  return { handleReady }
}
