import { Box, Clickable, Text, useMutationObserver } from "@artsy/palette"
import { Z } from "Apps/Components/constants"
import { useGeometry } from "Components/ProgressiveOnboarding/Hooks/useGeometry"
import { reset } from "Components/ProgressiveOnboarding/ProgressiveOnboardingTip"
import {
  getTip,
  TIPS,
} from "Components/ProgressiveOnboarding/ProgressiveOnboardingTips"
import {
  createContext,
  FC,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react"
import { graphql } from "react-relay"
import { useQuery } from "Utils/Hooks/useQuery"
import { ProgressiveOnboardingContextQuery } from "__generated__/ProgressiveOnboardingContextQuery.graphql"

const PROGRESSIVE_ONBOARDING_QUERY = graphql`
  query ProgressiveOnboardingContextQuery {
    me {
      ...ProgressiveOnboardingTipsFollowArtist_me @relay(mask: false)
      ...ProgressiveOnboardingTipsSaveArtwork_me @relay(mask: false)
      ...ProgressiveOnboardingTipsUserProfile_me @relay(mask: false)
    }
  }
`

const ProgressiveOnboardingContext = createContext<{
  active: string
  close: () => void
}>({
  active: "",
  close: () => {},
})

/**
 * TODO:
 * - Prevent all execution when logged out
 * - Prevent all execution if you've seen all tips
 * - A possible way to eliminate extracting the data conditions would be if
 * each tip independently communicated its data status back to the context store,
 * and the context store made decisions about which to display once they all report back in.
 * (They would have to execute their own queries.)
 */
export const ProgressiveOnboardingContextProvider: FC = ({ children }) => {
  const { data } = useQuery<ProgressiveOnboardingContextQuery>(
    PROGRESSIVE_ONBOARDING_QUERY
  )

  const [active, setActive] = useState("")

  const activeTip = useMemo(() => getTip(active), [active])

  const { selector, delay, Component } = activeTip

  const { geometry, queryGeometry } = useGeometry({ selector, delay })

  const rootRef = useRef<HTMLElement | null>(null)

  const check = useCallback(() => {
    TIPS.forEach(tip => {
      const node = document.querySelector(tip.selector)

      if (node instanceof HTMLElement) {
        tip.node = node
      } else {
        tip.node = null
      }
    })
  }, [])

  const activate = useCallback(() => {
    if (!data) return

    TIPS.find(tip => {
      if (tip.isVisible(data)) {
        setActive(tip.key)
        return true
      }
    })
  }, [data])

  useEffect(() => {
    rootRef.current = document.body

    check()
  }, [check])

  useMutationObserver({
    ref: rootRef,
    onMutate: mutations => {
      if (mutations.some(mutation => mutation.type === "childList")) {
        check()
        queryGeometry()
        activate()
      }
    },
  })

  useEffect(activate, [activate, data])

  const close = useCallback(() => {
    setActive("")
    activeTip.dismiss()
  }, [activeTip])

  return (
    <ProgressiveOnboardingContext.Provider value={{ active, close }}>
      {children}

      {/* Debugger */}
      <Box position="fixed" zIndex={Z.onboarding} top={0} left={0} bg="yellow">
        <Text variant="xs" px={1} py={0.5}>
          <div>active: {active}</div>

          <div>geometry: {JSON.stringify(geometry)}</div>

          <Clickable
            textDecoration="underline"
            onClick={() => {
              reset()
              window.location.reload()
            }}
          >
            reset
          </Clickable>
        </Text>
      </Box>

      {geometry && (
        <Box
          position="fixed"
          zIndex={Z.onboarding}
          top={geometry.top}
          left={geometry.left}
          width={geometry.width}
          height={geometry.height}
          style={{ pointerEvents: "none" }}
        >
          <Component />
        </Box>
      )}
    </ProgressiveOnboardingContext.Provider>
  )
}

export const useProgressiveOnboarding = () => {
  return useContext(ProgressiveOnboardingContext)
}
