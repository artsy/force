/* eslint-env mocha */
import { setup, teardown } from "./helpers"

describe("Collections index", () => {
  let metaphysics, browser

  before(async () => {
    ;({ metaphysics, browser } = await setup())
    metaphysics.post("/v2", (req, res) => {
      res.send(require("./fixtures/metaphysics/collections"))
    })
  })

  after(teardown)

  it("renders expected metadata", async () => {
    const $ = await browser.page("/collections")
    $.html().should.containEql("Collections | Artsy")
    $.html().should.containEql(
      "Discover collections of art curated by Artsy Specialists. From iconic artist series to trending design, shop collections"
    )
  })

  it("renders a title and header info", async () => {
    const $ = await browser.page("/collections")
    $.html().should.containEql("Collections")
    $.html().should.containEql("View works")
  })

  it("renders collection categories", async () => {
    const $ = await browser.page("/collections")
    $.html().should.containEql("Collectible Sculptures")
    $.html().should.containEql("Abstract Art")
    $.html().should.containEql("Contemporary")
  })

  it("renders collections", async () => {
    const $ = await browser.page("/collections")
    $.html().should.containEql("KAWS: Toys")
    $.html().should.containEql("Josef Albers: Homage to the Square")
    $.html().should.containEql("Chuck Close: Self-Portraits")
  })
})
