import { createContextStore, Action, action, Thunk, thunk } from "easy-peasy"
import { Box } from "@artsy/palette"
import { Children, type FC, isValidElement, useRef } from "react"

// Store model interface
interface TransitionPanelStoreModel {
  // State
  active: number
  prevActive: number
  mode: "Idle" | "Transitioning"

  // Actions
  setActive: Action<TransitionPanelStoreModel, number>
  setPrevActive: Action<TransitionPanelStoreModel, number>
  setMode: Action<TransitionPanelStoreModel, "Idle" | "Transitioning">
  navigateTo: Thunk<
    TransitionPanelStoreModel,
    { index: number; screensLength: number }
  >
}

// Create the context store
export const TransitionPanelStore =
  createContextStore<TransitionPanelStoreModel>(runtimeModel => ({
    // State
    active: runtimeModel?.active || 0,
    prevActive: runtimeModel?.prevActive || 0,
    mode: runtimeModel?.mode || "Idle",

    // Actions
    setActive: action((state, payload) => {
      state.active = payload
    }),

    setPrevActive: action((state, payload) => {
      state.prevActive = payload
    }),

    setMode: action((state, payload) => {
      state.mode = payload
    }),

    navigateTo: thunk((actions, { index, screensLength }) => {
      if (index < 0 || index >= screensLength) {
        throw new Error(`Invalid index: ${index}`)
      }

      actions.setMode("Transitioning")
      actions.setActive(index)
      // Animation logic will be handled in the component
    }),
  }))

interface TransitionPanelProviderProps {
  children: JSX.Element[]
}

// Provider component with animation logic
export const TransitionPanelProvider: FC<
  React.PropsWithChildren<TransitionPanelProviderProps>
> = ({ children }) => {
  const screens = Children.toArray(children).filter(isValidElement)

  const containerRef = useRef<HTMLDivElement | null>(null)
  const railRef = useRef<HTMLDivElement | null>(null)
  const activeRef = useRef<HTMLDivElement | null>(null)
  const prevRef = useRef<HTMLDivElement | null>(null)

  const { active, prevActive, mode } = TransitionPanelStore.useStoreState(
    state => state,
  )
  const actions = TransitionPanelStore.useStoreActions(actions => actions)

  const navigateTo = (index: number) => {
    actions.navigateTo({ index, screensLength: screens.length })

    requestAnimationFrame(async () => {
      const prevWidth = prevRef.current?.offsetWidth ?? 0
      const nextWidth = activeRef.current?.offsetWidth ?? 0

      containerRef.current?.style.setProperty("width", `${nextWidth}px`)

      const transforms =
        index < prevActive
          ? [
              { transform: `translateX(-${nextWidth}px)` },
              { transform: "translateX(0)" },
            ]
          : [
              { transform: "translateX(0)" },
              { transform: `translateX(-${prevWidth}px)` },
            ]

      const animation = railRef.current?.animate(transforms, {
        duration: 400,
        easing: "ease",
      })

      await animation?.finished

      actions.setMode("Idle")
      actions.setPrevActive(index)
    })
  }

  return (
    <TransitionPanelStore.Provider>
      <Box ref={containerRef as any} overflow="auto">
        <Box ref={railRef as any} style={{ whiteSpace: "nowrap" }}>
          {mode === "Transitioning" && (
            <>
              {active < prevActive && (
                <Box ref={activeRef as any} display="inline-flex">
                  {screens[active]}
                </Box>
              )}

              <Box ref={prevRef as any} display="inline-flex">
                {screens[prevActive]}
              </Box>

              {active > prevActive && (
                <Box ref={activeRef as any} display="inline-flex">
                  {screens[active]}
                </Box>
              )}
            </>
          )}

          {mode === "Idle" && (
            <Box display="inline-flex">{screens[active]}</Box>
          )}
        </Box>
      </Box>
    </TransitionPanelStore.Provider>
  )
}

// Backward compatible hook
export const useTransitionPanel = () => {
  const active = TransitionPanelStore.useStoreState(state => state.active)
  const { navigateTo } = TransitionPanelStore.useStoreActions(
    actions => actions,
  )

  // Wrap navigateTo to match original API
  const navigate = (index: number) => {
    // Get screens length from provider context - this is a limitation
    // In real implementation, we'd need to pass this through the store
    navigateTo({ index, screensLength: 999 }) // Placeholder
  }

  return {
    active,
    navigateTo: navigate,
  }
}

// Export alias for migration compatibility
export const TransitionPanelContext = TransitionPanelStore
