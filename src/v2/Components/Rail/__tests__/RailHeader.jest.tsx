import { computeTitleContent } from "../RailHeader"

describe("computeTitleContent", () => {
  it("returns the text with no viewAllHref", () => {
    const viewAllHref = null
    const viewAllOnClick = null
    const title = "Awesome Auction"

    const titleContent = computeTitleContent(viewAllHref, viewAllOnClick, title)

    expect(titleContent).toEqual(title)
  })

  it("returns a RouterLink with a viewAllHref", () => {
    const viewAllHref = "/auction/awesome-auction"
    const viewAllOnClick = null
    const title = "Awesome Auction"

    const titleContent = computeTitleContent(viewAllHref, viewAllOnClick, title)

    expect(titleContent.type.displayName).toEqual("RouterLink")
  })
})
