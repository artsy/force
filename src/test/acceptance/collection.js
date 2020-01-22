/* eslint-env mocha */
import { setup, teardown } from "./helpers"

describe("Collection page", () => {
  let metaphysics, browser

  before(async () => {
    ;({ metaphysics, browser } = await setup())
    metaphysics.post("/v2", (req, res) => {
      res.send(require("./fixtures/metaphysics/collection"))
    })
  })

  after(teardown)

  it("renders a title and header info", async () => {
    const $ = await browser.page("/collection/abstract-expressionism")
    $.html().should.containEql("Abstract Expressionism")
    $.html().should.containEql(
      "Though Abstract Expressionists are best known for large-scale paintings"
    )
  })

  it("renders artwork grid", async () => {
    const $ = await browser.page("/collection/kaws-companions")
    $.html().should.containEql("Intimate Lighting")
    $.html().should.containEql("Magnificent Jungle Cats")
  })
})
