/* eslint-env mocha */
import { setup, teardown } from "./helpers"

describe("Artist page", () => {
  let metaphysics, browser

  before(async () => {
    ;({ metaphysics, browser } = await setup())
    metaphysics.post("/", (req, res) => {
      res.send(require("./fixtures/metaphysics/artist"))
    })
  })

  after(teardown)

  it("renders an artist name and some biographical info", async () => {
    const $ = await browser.page(
      "/artist/pablo-picasso?split_test[artist_insights]=v1"
    )
    $.html().should.containEql("Pablo Picasso")
    $.html().should.containEql("Spanish")
    $.html().should.containEql("1881-1973")
  })

  it("renders an artist name and some biographical info with artist insights v2 enabled", async () => {
    const $ = await browser.page(
      "/artist/pablo-picasso?split_test[artist_insights]=v2"
    )
    $.html().should.containEql("Pablo Picasso")
    $.html().should.containEql("Spanish")
    $.html().should.containEql("1881-1973")
  })
})
