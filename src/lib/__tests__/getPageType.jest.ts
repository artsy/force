import {
  formatOwnerTypes,
  getPageTypeFromClient,
  getPageTypeFromReq,
} from "lib/getPageType"
import { Request } from "express"
import { OwnerType } from "@artsy/cohesion"

describe("getPageTypeFromReq", () => {
  it("returns expected values", () => {
    const page = getPageTypeFromReq({
      path: "/artist/test-artist",
    } as Request)

    expect(page.pageParts).toEqual(["", "artist", "test-artist"])
    expect(page.pageType).toEqual("artist")
    expect(page.pageSlug).toEqual("test-artist")
  })

  it("handles camelcasing", () => {
    const page = getPageTypeFromReq({
      path: "/artist-series/test-artist-series",
    } as Request)

    expect(page.pageParts).toEqual(["", "artist-series", "test-artist-series"])
    expect(page.pageType).toEqual("artistSeries")
    expect(page.pageSlug).toEqual("test-artist-series")
  })
})

describe("getPageTypeFromClient", () => {
  it("returns correct props", () => {
    delete window.location
    // @ts-ignore
    window.location = new URL("https://artsy.net/artist/test-artist")
    const page = getPageTypeFromClient()

    expect(page.pageParts).toEqual(["", "artist", "test-artist"])
    expect(page.pageType).toEqual("artist")
    expect(page.pageSlug).toEqual("test-artist")
  })

  it("handles camelcasing", () => {
    delete window.location
    // @ts-ignore
    window.location = new URL(
      "https://artsy.net/artist-series/test-artist-series"
    )
    const page = getPageTypeFromClient()

    expect(page.pageParts).toEqual(["", "artist-series", "test-artist-series"])
    expect(page.pageType).toEqual("artistSeries")
    expect(page.pageSlug).toEqual("test-artist-series")
  })
})

describe("formatOwnerTypes", () => {
  it("handles article path types", () => {
    expect(formatOwnerTypes("news")).toBe(OwnerType.article)
    expect(formatOwnerTypes("series")).toBe(OwnerType.article)
    expect(formatOwnerTypes("video")).toBe(OwnerType.article)
  })

  it("handles auction page types", () => {
    expect(formatOwnerTypes("auction")).toBe(OwnerType.sale)
  })
})
