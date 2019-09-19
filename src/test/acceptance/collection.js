/* eslint-env mocha */
import { setup, teardown } from "./helpers"

describe("Collection page", () => {
  let metaphysics, browser

  before(async () => {
    ;({ metaphysics, browser } = await setup())
    metaphysics.post("/", (req, res) => {
      res.send(require("./fixtures/metaphysics/collection"))
    })
  })

  after(teardown)

  it("renders a title and header info", async () => {
    const $ = await browser.page("/collection/kaws-companions")
    $.html().should.containEql("KAWS: Companions")
    $.html().should.containEql("Collectible Sculptures")
    $.html().should.containEql("Brian Donnelly, better known as KAWS")
  })

  it("renders artwork grid", async () => {
    const $ = await browser.page("/collection/kaws-companions")
    $.html().should.containEql("KAWS, Pinocchio, 2018")
    $.html().should.containEql("IDEA")
  })
})
