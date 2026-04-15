import { useJump } from "Utils/Hooks/useJump"
import { scrollToAwaitable } from "Utils/scrollToAwaitable"
import {
  getArticleNavState,
  pushArticleState,
  replaceScrollY,
} from "Apps/Article/Utils/articleHistoryState"
import {
  createJumpHash,
  extractJumpTargetIDFromHash,
} from "./Utils/extractHeadings"
import {
  type FC,
  type ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
} from "react"

interface ArticleScrollHistoryContextType {
  isRestoring: () => boolean
  onArticleVisible: (href: string, slug: string) => void
  pushJump: (params: {
    articleHref: string
    articleSlug: string
    headingSlug: string
  }) => void
}

const NOOP_CONTEXT: ArticleScrollHistoryContextType = {
  isRestoring: () => false,
  onArticleVisible: () => {},
  pushJump: () => {},
}

const ArticleScrollHistoryContext =
  createContext<ArticleScrollHistoryContextType>(NOOP_CONTEXT)

export const useArticleScrollHistory = (): ArticleScrollHistoryContextType => {
  return useContext(ArticleScrollHistoryContext)
}

interface ArticleScrollHistoryProviderProps {
  children: ReactNode
}

export const ArticleScrollHistoryProvider: FC<
  ArticleScrollHistoryProviderProps
> = ({ children }) => {
  const { jumpTo } = useJump({ offset: 20 })
  const jumpToRef = useRef(jumpTo)
  jumpToRef.current = jumpTo

  const visibleArticleHrefRef = useRef<string | null>(null)
  const isRestoringRef = useRef(false)

  const onArticleVisible = useCallback((href: string, slug: string) => {
    if (visibleArticleHrefRef.current === href) return

    const isFirstArticle = visibleArticleHrefRef.current === null
    visibleArticleHrefRef.current = href

    if (isFirstArticle || isRestoringRef.current) return

    replaceScrollY(window.scrollY)

    pushArticleState({
      kind: "article-boundary",
      articleHref: href,
      articleSlug: slug,
      scrollY: window.scrollY,
    })
  }, [])

  const pushJump = useCallback(
    (params: {
      articleHref: string
      articleSlug: string
      headingSlug: string
    }) => {
      const targetId = `${params.articleSlug}--${params.headingSlug}`
      const hash = createJumpHash({
        articleSlug: params.articleSlug,
        slug: params.headingSlug,
      })

      replaceScrollY(window.scrollY)

      pushArticleState(
        {
          kind: "toc-jump",
          articleHref: params.articleHref,
          articleSlug: params.articleSlug,
          scrollY: window.scrollY,
          targetId,
        },
        hash,
      )

      jumpToRef.current(targetId)
    },
    [],
  )

  // Handle popstate (back/forward)
  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      const state = getArticleNavState(event.state)
      if (!state) return

      isRestoringRef.current = true

      if (state.kind === "toc-jump" && state.targetId) {
        visibleArticleHrefRef.current = state.articleHref

        jumpToRef.current(state.targetId, {
          onComplete: () => {
            isRestoringRef.current = false
          },
        })
        return
      }

      if (typeof state.scrollY === "number") {
        if (state.kind === "article-boundary") {
          visibleArticleHrefRef.current = state.articleHref
        }

        scrollToAwaitable({
          target: state.scrollY,
          behavior: "smooth",
          onComplete: () => {
            isRestoringRef.current = false
          },
        })
      }
    }

    window.addEventListener("popstate", handlePopState)
    return () => window.removeEventListener("popstate", handlePopState)
  }, [])

  // Handle initial hash on mount (e.g. direct link to #JUMP--article--heading)
  useEffect(() => {
    const { hash } = window.location
    if (!hash) return

    const targetId = extractJumpTargetIDFromHash(hash)
    if (!targetId) return

    const frame = requestAnimationFrame(() => {
      jumpToRef.current(targetId, { behavior: "instant" })
    })

    return () => cancelAnimationFrame(frame)
  }, [])

  const isRestoring = useCallback(() => isRestoringRef.current, [])

  return (
    <ArticleScrollHistoryContext.Provider
      value={{ isRestoring, onArticleVisible, pushJump }}
    >
      {children}
    </ArticleScrollHistoryContext.Provider>
  )
}
