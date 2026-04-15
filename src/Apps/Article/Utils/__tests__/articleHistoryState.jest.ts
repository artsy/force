import {
  getArticleNavState,
  hasArticleNavState,
  pushArticleState,
  replaceScrollY,
} from "../articleHistoryState"

describe("articleHistoryState", () => {
  const originalState = window.history.state

  afterEach(() => {
    window.history.replaceState(originalState, "")
  })

  describe("getArticleNavState", () => {
    it("returns null for null state", () => {
      expect(getArticleNavState(null)).toBeNull()
    })

    it("returns null for empty object", () => {
      expect(getArticleNavState({})).toBeNull()
    })

    it("returns null when articleNav has no scrollY", () => {
      expect(
        getArticleNavState({ articleNav: { kind: "article-boundary" } }),
      ).toBeNull()
    })

    it("extracts boundary state", () => {
      const nav = {
        kind: "article-boundary",
        articleHref: "/article/a",
        articleSlug: "a",
        scrollY: 100,
      }
      const result = getArticleNavState({ articleNav: nav })

      expect(result).toEqual(nav)
    })

    it("extracts jump state", () => {
      const nav = {
        kind: "toc-jump",
        articleHref: "/article/a",
        articleSlug: "a",
        scrollY: 200,
        targetId: "a--heading",
      }
      const result = getArticleNavState({ articleNav: nav })

      expect(result).toEqual(nav)
    })

    it("extracts scroll-only state (no kind)", () => {
      const result = getArticleNavState({ articleNav: { scrollY: 400 } })

      expect(result).toEqual({ scrollY: 400 })
    })
  })

  describe("pushArticleState", () => {
    it("pushes state namespaced under articleNav", () => {
      const state = {
        kind: "article-boundary" as const,
        articleHref: "/article/b",
        articleSlug: "b",
        scrollY: 600,
      }

      pushArticleState(state)

      expect(window.history.state.articleNav).toEqual(state)
    })

    it("preserves existing history state", () => {
      window.history.replaceState({ existing: true }, "")

      const state = {
        kind: "article-boundary" as const,
        articleHref: "/article/b",
        articleSlug: "b",
        scrollY: 600,
      }

      pushArticleState(state)

      expect(window.history.state.existing).toBe(true)
      expect(window.history.state.articleNav).toEqual(state)
    })
  })

  describe("replaceScrollY", () => {
    it("creates articleNav with scrollY when none exists", () => {
      window.history.replaceState({}, "")

      replaceScrollY(750)

      expect(window.history.state.articleNav).toEqual({ scrollY: 750 })
    })

    it("updates scrollY on existing articleNav state", () => {
      window.history.replaceState(
        {
          articleNav: {
            kind: "article-boundary",
            articleHref: "/article/a",
            articleSlug: "a",
            scrollY: 100,
          },
        },
        "",
      )

      replaceScrollY(999)

      expect(window.history.state.articleNav.scrollY).toBe(999)
      expect(window.history.state.articleNav.kind).toBe("article-boundary")
    })
  })

  describe("hasArticleNavState", () => {
    it("returns false when no articleNav exists", () => {
      window.history.replaceState({}, "")

      expect(hasArticleNavState()).toBe(false)
    })

    it("returns true when articleNav exists", () => {
      window.history.replaceState({ articleNav: { scrollY: 0 } }, "")

      expect(hasArticleNavState()).toBe(true)
    })
  })
})
