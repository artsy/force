import { createContextStore, Action, action } from "easy-peasy"
import { compound } from "@artsy/palette"
import { uniqBy } from "lodash"
import { useCallback, useMemo, useRef } from "react"
import type * as React from "react"

export type TSticky = {
  id: string
  height: number
  status: "FIXED" | "ORIGINAL" | "RELEASED"
}

// Easy-peasy store model interface
interface StickyStoreModel {
  // State
  stickies: TSticky[]

  // Actions
  registerSticky: Action<StickyStoreModel, TSticky>
  deregisterSticky: Action<StickyStoreModel, Pick<TSticky, "id">>
  updateSticky: Action<
    StickyStoreModel,
    { id: string; payload: Partial<TSticky> }
  >
}

// Create the context store
export const StickyStore = createContextStore<StickyStoreModel>(
  runtimeModel => ({
    // State - sorted by place in React tree (lower on the page = later in the array)
    stickies: runtimeModel?.stickies || [],

    // Actions
    registerSticky: action((state, sticky) => {
      state.stickies = uniqBy([...state.stickies, sticky], "id")
    }),

    deregisterSticky: action((state, sticky) => {
      state.stickies = state.stickies.filter(({ id }) => id !== sticky.id)
    }),

    updateSticky: action((state, { id, payload }) => {
      const index = state.stickies.findIndex(sticky => sticky.id === id)
      if (index !== -1) {
        state.stickies[index] = {
          ...state.stickies[index],
          ...payload,
        }
      }
    }),
  }),
)

/**
 * Imported once in Boot.tsx.
 * You do NOT need to import this to use a `Sticky` component.
 * Provider component with backward compatibility
 */
export const StickyProvider: React.FC<
  React.PropsWithChildren<Partial<StickyStoreModel>>
> = ({ children, ...props }) => {
  return (
    <StickyStore.Provider runtimeModel={props}>{children}</StickyStore.Provider>
  )
}

const generateId = () => Math.random().toString(26).slice(2)

/**
 * Given a sticky ID; find the distance from the top it should sit in relation
 * to any existing stickies.
 */
export const getOffsetTopForSticky = ({
  id,
  stickies,
}: {
  id: string
  stickies: TSticky[]
}) => {
  const relevant = stickies.filter(sticky => sticky.status !== "RELEASED")
  const index = relevant.findIndex(sticky => sticky.id === id)

  return compound([0, ...relevant.map(({ height }) => height).slice(0, -1)])[
    index
  ]
}

/**
 * Hook for backward compatibility that matches original API exactly
 */
export const useSticky = ({ id: _id }: { id?: string } = {}) => {
  const stickies = StickyStore.useStoreState(state => state.stickies)
  const actions = StickyStore.useStoreActions(actions => actions)

  const id = useRef(_id ?? generateId())

  const registerSticky = useCallback(
    (height: number) => {
      if (height === undefined) return
      actions.registerSticky({ id: id.current, height, status: "ORIGINAL" })
    },
    [actions],
  )

  const deregisterSticky = useCallback(() => {
    actions.deregisterSticky({ id: id.current })
  }, [actions])

  const updateSticky = useCallback(
    (payload: Partial<TSticky>) => {
      actions.updateSticky({ id: id.current, payload })
    },
    [actions],
  )

  const offsetTop = useMemo(
    () => getOffsetTopForSticky({ id: id.current, stickies }) ?? 0,
    [stickies],
  )

  return {
    id: id.current,
    deregisterSticky,
    offsetTop,
    registerSticky,
    stickies,
    updateSticky,
  }
}

// Export original context name for migration compatibility
export const StickyContext = StickyStore
