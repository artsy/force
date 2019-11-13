/* eslint-env mocha */
import { setup, teardown } from "./helpers"

xdescribe("Collect page", () => {
  let metaphysics, browser

  before(async () => {
    ;({ metaphysics, browser } = await setup())
    metaphysics.post("/v2", (req, res) => {
      res.send(require("./fixtures/metaphysics/collect"))
    })
  })

  after(teardown)

  it("renders expected meta", async () => {
    const $ = await browser.page("/collect")
    $.html().should.containEql("Collect | Artsy")
    $.html().should.containEql(
      "Find artworks by subject matter, style/technique, movement, price, and gallery/institution."
    )
  })

  it("renders a title and header info", async () => {
    const $ = await browser.page("/collect")
    $.html().should.containEql("Collect art and design online")
  })

  it("renders artwork grid", async () => {
    const $ = await browser.page("/collect")
    $.html().should.containEql("Hoth I")
    $.html().should.containEql(
      "Unique ink drawing on Vincent Van Gogh card from Spoleto, Italy"
    )
    $.html().should.containEql("Chum (Pink)")
  })
})
