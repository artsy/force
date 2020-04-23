import { getPageType } from "../getPageType"
import { Request } from "express"

describe("getPageType", () => {
  it("returns correct props", () => {
    const { pageParts, pageType } = getPageType({
      path: "/artist/test-artist",
    } as Request)

    expect(pageParts).toEqual(["", "artist", "test-artist"])
    expect(pageType).toEqual("artist")
  })
})
