import { getRedirect, RedirectRecord } from "../getRedirect"

describe("getRedirect", () => {
  const aNonMatchingPredicate = ({}) => null
  function aMatchingPredicateWithResult(matchedValue) {
    return ({}) => ({ path: matchedValue, reason: "reason" })
  }
  function aRuleWithChildren(
    children: Array<RedirectRecord<{}>>
  ): RedirectRecord<{}> {
    return {
      path: "",
      rules: [aNonMatchingPredicate],
      children: [...children],
    }
  }

  it("returns null when the root rule doesn`t match", () => {
    const rule: RedirectRecord<{}> = {
      path: "",
      rules: [aNonMatchingPredicate],
    }
    const result = getRedirect(rule, "some-path", {})

    expect(result).toEqual(null)
  })

  it("returns the root path when the root rule matches", () => {
    const rule: RedirectRecord<{}> = {
      path: "",
      rules: [aMatchingPredicateWithResult("the-root")],
    }
    const result = getRedirect(rule, "some-path", {})

    expect(result.path).toEqual("the-root")
  })

  it("passes the arguments through to the rules", () => {
    const data = {}
    const isData = arg => {
      expect(arg).toBe(data)
      return null
    }
    const rule: RedirectRecord<{}> = {
      path: "",
      rules: [isData],
      children: [
        {
          path: "hello",
          rules: [isData],
        },
      ],
    }

    getRedirect(rule, "/hello", data)

    expect.assertions(2)
  })

  it("takes the first matching redirect if multiple rules are present", () => {
    const rule: RedirectRecord<number> = {
      path: "",
      rules: [
        n => (n === 1 ? { path: "/one", reason: "first" } : null),
        n => (n === 2 ? { path: "/two", reason: "second" } : null),
        n => (n === 3 ? { path: "/three", reason: "third" } : null),
      ],
    }

    expect(getRedirect(rule, "/hello", 1)).toEqual({
      path: "/one",
      reason: "first",
    })
    expect(getRedirect(rule, "/hello", 2)).toEqual({
      path: "/two",
      reason: "second",
    })
    expect(getRedirect(rule, "/hello", 3)).toEqual({
      path: "/three",
      reason: "third",
    })
    expect(getRedirect(rule, "/hello", 4)).toBe(null)
  })

  describe("matching child rules", () => {
    it("doesn't match child routes when the user isn't in this section of the app", () => {
      const rule = aRuleWithChildren([
        {
          path: "some-other-section",
          rules: [aMatchingPredicateWithResult("some-other-section-route")],
        },
      ])

      const result = getRedirect(rule, "this-section", {})

      expect(result).toEqual(null)
    })

    it("matches child routes when the user is in this section of the app", () => {
      const rule = aRuleWithChildren([
        {
          path: "this-section",
          rules: [aMatchingPredicateWithResult("this-section-route")],
        },
      ])

      const result = getRedirect(rule, "this-section", {})

      expect(result.path).toEqual("this-section-route")
    })

    it("matches child routes when the user is deep in this section", () => {
      const rule = aRuleWithChildren([
        {
          path: "this-section",
          rules: [aMatchingPredicateWithResult("this-section-route")],
        },
      ])

      const result = getRedirect(rule, "this-section/and/this/page", {})

      expect(result.path).toEqual("this-section-route")
    })

    it("chooses the most specific matching child (i.e. longest path match", () => {
      const rule = aRuleWithChildren([
        {
          path: "this-section",
          rules: [aMatchingPredicateWithResult("losing-route")],
        },
        {
          path: "this-section/and/this",
          rules: [aMatchingPredicateWithResult("winning-route")],
        },
      ])

      const result = getRedirect(rule, "this-section/and/this/page", {})

      expect(result.path).toEqual("winning-route")
    })

    it("matches child routes despite slashes in current location", () => {
      const rule = aRuleWithChildren([
        {
          path: "this-section/this-subsection",
          rules: [aMatchingPredicateWithResult("this-section-route")],
        },
      ])

      const result = getRedirect(
        rule,
        "///this-section/this-subsection/this-page",
        {}
      )

      expect(result.path).toEqual("this-section-route")
    })
  })
})
