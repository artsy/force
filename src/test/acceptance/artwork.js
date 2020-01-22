/* eslint-env mocha */
import { setup, teardown } from "./helpers"

describe("Artwork page", () => {
  let metaphysics, browser

  before(async () => {
    ;({ metaphysics, browser } = await setup())
    metaphysics.post("/v2", (req, res) => {
      res.send(require("./fixtures/metaphysics/artwork"))
    })
  })

  after(teardown)

  it("renders an artwork title and partner name", async () => {
    const $ = await browser.page("/artwork/andy-warhol-skull")
    $.html().should.containEql("Skull")
    $.html().should.containEql("Gagosian")
  })
})
