const STATE_KEY = "articleNav"

interface ArticleBoundaryState {
  kind: "article-boundary"
  articleHref: string
  articleSlug: string
  scrollY: number
}

interface ArticleJumpState {
  kind: "toc-jump"
  articleHref: string
  articleSlug: string
  scrollY: number
  targetId: string
}

export type ArticleHistoryState = ArticleBoundaryState | ArticleJumpState

/**
 * Reads and validates the article navigation state from a history entry.
 * Returns null if the entry has no article state or is malformed.
 */
export const getArticleNavState = (
  historyState: unknown,
): (ArticleHistoryState | { kind?: undefined; scrollY: number }) | null => {
  if (!historyState || typeof historyState !== "object") return null

  const state = (historyState as Record<string, unknown>)[STATE_KEY]
  if (!state || typeof state !== "object") return null
  if (typeof (state as Record<string, unknown>).scrollY !== "number") {
    return null
  }

  return state as ArticleHistoryState | { kind?: undefined; scrollY: number }
}

export const pushArticleState = (
  state: ArticleHistoryState,
  url?: string,
): void => {
  window.history.pushState(
    { ...window.history.state, [STATE_KEY]: state },
    "",
    url,
  )
}

export const hasArticleNavState = (): boolean => {
  return !!window.history.state?.[STATE_KEY]
}

/**
 * Saves the current scroll position on the current history entry so it can
 * be restored when the user navigates back. Merges into any existing
 * articleNav state, or creates a minimal one if none exists.
 */
export const replaceScrollY = (scrollY: number): void => {
  const existing =
    (window.history.state?.[STATE_KEY] as Record<string, unknown>) ?? {}

  window.history.replaceState(
    {
      ...window.history.state,
      [STATE_KEY]: { ...existing, scrollY },
    },
    "",
  )
}
