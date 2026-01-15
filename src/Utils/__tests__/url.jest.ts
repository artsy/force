import {
  getInternalHref,
  getPageNumber,
  getURLHost,
  buildPageQuery,
  getPrimaryRouteSegment,
} from "Utils/url"

describe("getURLHost", () => {
  it("returns host for url with host", () => {
    const url = "https://cms.artsy.net"
    expect(getURLHost(url)).toEqual("cms.artsy.net")
  })
  it("returns host for url with host and path", () => {
    const url = "https://cms.artsy.net/foo"
    expect(getURLHost(url)).toEqual("cms.artsy.net")
  })
  it("returns empty string for empty string", () => {
    const url = ""
    expect(getURLHost(url)).toEqual("")
  })
  it("returns empty string for non-url", () => {
    const url = "!@#123"
    expect(getURLHost(url)).toEqual("")
  })
})

describe("getInternalHref", () => {
  it("should return the path from a given artsy.net URL", () => {
    const url = "https://artsy.net/artist/banksy"
    const result = getInternalHref(url)
    expect(result).toBe("/artist/banksy")
  })

  it("should return the path from a given staging.artsy.net URL", () => {
    const url = "https://staging.artsy.net/artist/banksy"
    const result = getInternalHref(url)
    expect(result).toBe("/artist/banksy")
  })

  it("should return the path even for an HTTP artsy.net URL", () => {
    const url = "http://artsy.net/artist/banksy"
    const result = getInternalHref(url)
    expect(result).toBe("/artist/banksy")
  })

  it("should return the path even for an HTTP staging.artsy.net URL", () => {
    const url = "http://staging.artsy.net/artist/banksy"
    const result = getInternalHref(url)
    expect(result).toBe("/artist/banksy")
  })

  it("should not alter URLs that do not match artsy.net or staging.artsy.net", () => {
    const url = "https://otherwebsite.com/artist/banksy"
    const result = getInternalHref(url)
    expect(result).toBe(url)
  })

  it("should handle URLs with query strings and fragments", () => {
    const url = "https://artsy.net/artist/banksy?sort=asc#bio"
    const result = getInternalHref(url)
    expect(result).toBe("/artist/banksy?sort=asc#bio")
  })

  it('should return "/" if the URL is just the domain', () => {
    const url = "https://artsy.net"
    const result = getInternalHref(url)
    expect(result).toBe(url)
  })
})

describe("getPageNumber", () => {
  it("should return 1 when location is undefined", () => {
    const result = getPageNumber(undefined)
    expect(result).toBe(1)
  })

  it("should return 1 when location has no query", () => {
    const location = { pathname: "/artists" }
    const result = getPageNumber(location)
    expect(result).toBe(1)
  })

  it("should return 1 when query has no page parameter", () => {
    const location = { pathname: "/artists", query: { sort: "name" } }
    const result = getPageNumber(location)
    expect(result).toBe(1)
  })

  it("should return the page number when page parameter exists", () => {
    const location = { pathname: "/artists", query: { page: "3" } }
    const result = getPageNumber(location)
    expect(result).toBe(3)
  })

  it("should handle numeric page parameter", () => {
    const location = { pathname: "/artists", query: { page: 5 } }
    const result = getPageNumber(location)
    expect(result).toBe(5)
  })

  it("should return 1 for invalid page parameter", () => {
    const location = { pathname: "/artists", query: { page: "invalid" } }
    const result = getPageNumber(location)
    expect(result).toBe(1)
  })

  it("should handle page parameter with other query params", () => {
    const location = {
      pathname: "/artists",
      query: { page: "2", sort: "name", utm_source: "google" },
    }
    const result = getPageNumber(location)
    expect(result).toBe(2)
  })
})

describe("buildPageQuery", () => {
  it("should remove page parameter when page is 1", () => {
    const query = { sort: "name", page: "2" }
    const result = buildPageQuery(query, 1)
    expect(result).toEqual({ sort: "name" })
  })

  it("should preserve page parameter when page is greater than 1", () => {
    const query = { sort: "name" }
    const result = buildPageQuery(query, 3)
    expect(result).toEqual({ sort: "name", page: "3" })
  })

  it("should preserve other query parameters", () => {
    const query = { sort: "name", medium: "painting", utm_source: "google" }
    const result = buildPageQuery(query, 2)
    expect(result).toEqual({
      sort: "name",
      medium: "painting",
      utm_source: "google",
      page: "2",
    })
  })

  it("should handle empty query object", () => {
    const query = {}
    const result = buildPageQuery(query, 1)
    expect(result).toEqual({})
  })

  it("should handle empty query object with page > 1", () => {
    const query = {}
    const result = buildPageQuery(query, 4)
    expect(result).toEqual({ page: "4" })
  })

  it("should replace existing page parameter", () => {
    const query = { page: "5", sort: "name" }
    const result = buildPageQuery(query, 2)
    expect(result).toEqual({ sort: "name", page: "2" })
  })

  it("should convert page number to string", () => {
    const query = { sort: "name" }
    const result = buildPageQuery(query, 10)
    expect(result.page).toBe("10")
    expect(typeof result.page).toBe("string")
  })
})

describe("getPrimaryRouteSegment", () => {
  it("should extract the primary route segment from a nested path", () => {
    const pathname = "/artist/picasso/articles/123"
    const basePath = "/artist/picasso"
    const result = getPrimaryRouteSegment(pathname, basePath)
    expect(result).toBe("articles")
  })

  it("should extract the primary route segment from a simple subroute", () => {
    const pathname = "/artist/picasso/cv"
    const basePath = "/artist/picasso"
    const result = getPrimaryRouteSegment(pathname, basePath)
    expect(result).toBe("cv")
  })

  it("should return undefined when pathname matches basePath exactly", () => {
    const pathname = "/artist/picasso"
    const basePath = "/artist/picasso"
    const result = getPrimaryRouteSegment(pathname, basePath)
    expect(result).toBeUndefined()
  })

  it("should handle paths with trailing slashes", () => {
    const pathname = "/artist/picasso/shows/"
    const basePath = "/artist/picasso"
    const result = getPrimaryRouteSegment(pathname, basePath)
    expect(result).toBe("shows")
  })

  it("should handle basePath with trailing slash", () => {
    const pathname = "/artist/picasso/series"
    const basePath = "/artist/picasso/"
    const result = getPrimaryRouteSegment(pathname, basePath)
    expect(result).toBe("series")
  })

  it("should strip query parameters before extracting route", () => {
    const pathname = "/artist/picasso/articles?page=2&sort=recent"
    const basePath = "/artist/picasso"
    const result = getPrimaryRouteSegment(pathname, basePath)
    expect(result).toBe("articles")
  })

  it("should handle deeply nested routes and return only first segment", () => {
    const pathname = "/artist/picasso/articles/2024/january/post-123"
    const basePath = "/artist/picasso"
    const result = getPrimaryRouteSegment(pathname, basePath)
    expect(result).toBe("articles")
  })

  it("should return undefined for basePath with only trailing slash difference", () => {
    const pathname = "/artist/picasso/"
    const basePath = "/artist/picasso"
    const result = getPrimaryRouteSegment(pathname, basePath)
    expect(result).toBeUndefined()
  })

  it("should handle all artist subroutes", () => {
    const basePath = "/artist/andy-warhol"

    expect(
      getPrimaryRouteSegment("/artist/andy-warhol/articles", basePath),
    ).toBe("articles")
    expect(getPrimaryRouteSegment("/artist/andy-warhol/cv", basePath)).toBe(
      "cv",
    )
    expect(getPrimaryRouteSegment("/artist/andy-warhol/series", basePath)).toBe(
      "series",
    )
    expect(getPrimaryRouteSegment("/artist/andy-warhol/shows", basePath)).toBe(
      "shows",
    )
  })

  it("should handle query parameters with fragments", () => {
    const pathname = "/artist/picasso/cv?view=grid#exhibitions"
    const basePath = "/artist/picasso"
    const result = getPrimaryRouteSegment(pathname, basePath)
    expect(result).toBe("cv")
  })

  it("should return undefined when only query params differ", () => {
    const pathname = "/artist/picasso?utm_source=email"
    const basePath = "/artist/picasso"
    const result = getPrimaryRouteSegment(pathname, basePath)
    expect(result).toBeUndefined()
  })
})
