/* eslint-env mocha */
import { setup, teardown } from "./helpers"

describe("Page", () => {
  let gravity, browser

  before(async () => {
    ;({ gravity, browser } = await setup())
    gravity.get("/api/v1/page/:id", (req, res) => {
      res.send(require("./fixtures/gravity/page"))
    })
    gravity.get("/api/v1/filter/artworks", (req, res) => {
      res.send(require("./fixtures/gravity/tag"))
    })
  })

  after(teardown)

  describe("/terms", () => {
    it("renders a markdown page of terms and conditions", async () => {
      const $ = await browser.page("/terms")
      $("body").html().should.containEql("These Terms of Use")
    })
  })

  describe("/dev/blank", () => {
    it("renders a blank page for Eigen", async () => {
      const $ = await browser.page("/dev/blank")
      $("body").html().should.containEql("page intentionally left blank")
    })
  })

  context("with a mobile browser", () => {
    before(async () => {
      await browser.useragent("iPhone")
    })

    describe("/terms", () => {
      it("renders a markdown page of terms and conditions", async () => {
        const $ = await browser.page("/terms")
        $("#page-markdown-content.main-side-margin")
          .html()
          .should.containEql("These Terms of Use")
      })
    })
  })
})
