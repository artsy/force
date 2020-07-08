/* eslint-env mocha */
import { setup, teardown } from "./helpers"

describe("Artist page", () => {
  let metaphysics, browser

  before(async () => {
    ;({ metaphysics, browser } = await setup())
    metaphysics.post("/v2", (req, res) => {
      res.send(require("./fixtures/metaphysics/artist"))
    })
  })

  after(teardown)

  it("renders an artist name and some biographical info", async () => {
    const $ = await browser.page("/artist/pablo-picasso")
    $.html().should.containEql("Pablo Picasso")
    $.html().should.containEql("Spanish")
    $.html().should.containEql("1881-1973")
  })
})
