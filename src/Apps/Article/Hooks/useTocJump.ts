import { createJumpHash } from "Apps/Article/Components/Utils/extractHeadings"
import { pushTocJumpEntry } from "Apps/Article/Utils/articleHistoryState"
import { useCurrentSession } from "System/Router/Utils/PopStateHandlerContext"
import { useJump } from "Utils/Hooks/useJump"
import { useCallback } from "react"

const JUMP_BEHAVIOR: ScrollBehavior = "smooth"

interface UseTocJumpResult {
  /**
   * Returns the URL hash to use as the `<a href>` for a TOC link. Allows
   * native behaviors like right-click "open in new tab" to keep working.
   */
  getHref: (headingSlug: string) => string

  /**
   * Performs the in-page jump: stamps the current entry with `scrollY`,
   * pushes a new entry at the heading hash with `targetId`, and scrolls.
   */
  jump: (headingSlug: string) => void
}

/**
 * Hook for the TOC component to drive in-page heading navigation. Pairs
 * with `useArticleTocHistory` (mounted once on the article page) which
 * handles the back/forward and direct-hash-load cases.
 */
export const useTocJump = (articleSlug: string): UseTocJumpResult => {
  const { jumpTo } = useJump({ offset: 20, behavior: JUMP_BEHAVIOR })
  const getSession = useCurrentSession()

  const getHref = useCallback(
    (headingSlug: string) => createJumpHash({ articleSlug, slug: headingSlug }),
    [articleSlug],
  )

  const jump = useCallback(
    (headingSlug: string) => {
      const targetId = `${articleSlug}--${headingSlug}`

      pushTocJumpEntry({
        scrollY: window.scrollY,
        targetId,
        session: getSession(),
        hash: getHref(headingSlug),
      })

      jumpTo(targetId)
    },
    [articleSlug, getHref, getSession, jumpTo],
  )

  return { getHref, jump }
}
