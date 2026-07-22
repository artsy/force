import { THEME } from "@artsy/palette"
import { useJump } from "Utils/Hooks/useJump"
import { __internal__useMatchMedia } from "Utils/Hooks/useMatchMedia"

export const RESPOND_SUBMIT_JUMP_ID = "respond-submit-cta"

const OFFSET = 30

export const useScrollToRespondSubmit = () => {
  const { jumpTo } = useJump({ behavior: "smooth" })
  const isXs = __internal__useMatchMedia(THEME.mediaQueries.xs)
  const isSm = __internal__useMatchMedia(THEME.mediaQueries.sm)
  const isMobileLayout = !!isXs || !!isSm

  const scrollToSubmitCTA = () => {
    if (!isMobileLayout) {
      return
    }

    setTimeout(() => {
      jumpTo(RESPOND_SUBMIT_JUMP_ID, { behavior: "smooth", offset: OFFSET })
    }, 100)
  }

  return { scrollToSubmitCTA }
}
