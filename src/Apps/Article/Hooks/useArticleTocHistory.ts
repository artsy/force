import { extractJumpTargetIDFromHash } from "Apps/Article/Components/Utils/extractHeadings"
import { getTocJumpState } from "Apps/Article/Utils/articleHistoryState"
import {
  useCurrentSession,
  usePopStateHandler,
} from "System/Router/Utils/PopStateHandlerContext"
import { useJump } from "Utils/Hooks/useJump"
import { scrollToAwaitable } from "Utils/scrollToAwaitable"
import { useCallback, useEffect, useRef } from "react"

const JUMP_BEHAVIOR: ScrollBehavior = "smooth"
const RESTORE_BEHAVIOR: ScrollBehavior = "smooth"

/**
 * Side-effect-only hook that owns the article-level back/forward and
 * direct-hash-load behavior for in-page TOC jumps. Mount once at the top
 * of an article page (alongside other side-effect hooks).
 *
 * Pop-state handling:
 *   - Reads the TOC marker from `event.state` and short-circuits Farce
 *     when the marker matches the current router session.
 *   - On a forward (target marker) → re-jumps to the heading.
 *   - On a back (scrollY marker) → restores the stamped scroll position.
 *
 * Hash-on-mount:
 *   - Briefly strips `#JUMP--…` from the URL so the browser does not
 *     compete with `useJump`'s offset-aware scroll, jumps once, then
 *     restores the hash.
 *
 * Pairs with `useTocJump`, which is what TOC clicks call into.
 */
export const useArticleTocHistory = (): void => {
  const getSession = useCurrentSession()
  const { jumpTo } = useJump({ offset: 20, behavior: JUMP_BEHAVIOR })

  const jumpToRef = useRef(jumpTo)
  jumpToRef.current = jumpTo

  const popStateHandler = useCallback(
    (state: unknown): boolean => {
      const marker = getTocJumpState(state)
      if (!marker || marker.session !== getSession()) return false

      if (typeof marker.targetId === "string") {
        jumpToRef.current(marker.targetId)
        return true
      }

      if (typeof marker.scrollY === "number") {
        scrollToAwaitable({
          target: marker.scrollY,
          behavior: RESTORE_BEHAVIOR,
        })
        return true
      }

      return false
    },
    [getSession],
  )
  usePopStateHandler(popStateHandler)

  useEffect(() => {
    const { hash, pathname, search } = window.location
    if (!hash) return

    const targetId = extractJumpTargetIDFromHash(hash)
    if (!targetId) return

    const hashlessPath = `${pathname}${search}`
    const pathWithHash = `${hashlessPath}${hash}`

    window.history.replaceState(window.history.state, "", hashlessPath)

    const frame = requestAnimationFrame(() => {
      jumpToRef.current(targetId, { behavior: JUMP_BEHAVIOR })
      window.history.replaceState(window.history.state, "", pathWithHash)
    })

    return () => cancelAnimationFrame(frame)
  }, [])
}
