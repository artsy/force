import { Box } from "@artsy/palette"
import {
  Children,
  FC,
  createContext,
  isValidElement,
  useContext,
  useRef,
  useState,
} from "react"

const TransitionPanelContext = createContext<{
  active: number
  navigateTo: (index: number) => void
}>({
  active: 0,
  navigateTo: () => {},
})

interface TransitionPanelProviderProps {
  children: JSX.Element[]
}

export const TransitionPanelProvider: FC<TransitionPanelProviderProps> = ({
  children,
}) => {
  const screens = Children.toArray(children).filter(isValidElement)

  const [active, setActive] = useState(0)
  const [prevActive, setPrevActive] = useState(0)

  const containerRef = useRef<HTMLDivElement | null>(null)
  const railRef = useRef<HTMLDivElement | null>(null)
  const activeRef = useRef<HTMLDivElement | null>(null)
  const prevRef = useRef<HTMLDivElement | null>(null)

  const [mode, setMode] = useState<"Idle" | "Transitioning">("Idle")

  const navigateTo = (index: number) => {
    if (index < 0 || index >= screens.length) {
      throw new Error(`Invalid index: ${index}`)
    }

    setMode("Transitioning")
    setActive(index)

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

      setMode("Idle")
      setPrevActive(index)
    })
  }

  return (
    <TransitionPanelContext.Provider value={{ navigateTo, active }}>
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
    </TransitionPanelContext.Provider>
  )
}

export const useTransitionPanel = () => {
  return useContext(TransitionPanelContext)
}
