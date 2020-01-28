/* eslint-env mocha */
import { setup, teardown } from "./helpers"
import { server as antigravity } from "@artsy/antigravity"
import sinon from "sinon"

describe("Partner profile page", () => {
  let gravity, positron, browser
  const systemProfileStub = sinon.stub()

  before(async () => {
    ;({ gravity, positron, browser } = await setup())
    gravity.get("/api/v1/shortcut/:id", (req, res) => {
      res.res.sendStatus(404)
    })
    gravity.get("/api/v1/profile/system", systemProfileStub)
    gravity.use(antigravity)
  })

  after(teardown)

  context("desktop", () => {
    it("shows the overview", async () => {
      const $ = await browser.page("/gagosian-gallery")
      $.html().should.containEql(
        '<h1 class="partner-name">Gagosian Gallery</h1>'
      )
      $.html().should.containEql('<p class="partner-bio">Living the dream as')
    })

    it("should not render a page for /system/up healthcheck endpoint", async () => {
      const $ = await browser.page("/system/up")

      $.html().should.containEql(
        '<head></head><body><pre style="word-wrap: break-word; white-space: pre-wrap;">{&quot;nodejs&quot;:true}</pre></body>'
      )

      sinon.assert.notCalled(systemProfileStub)
    })
  })

  context("iPhone", () => {
    before(() => {
      browser.useragent("iPhone")
      positron.get("/api/articles", (req, res) => {
        res.send(require("./fixtures/gravity/home"))
      })
    })

    it("shows the overview", async () => {
      const $ = await browser.page("/gagosian-gallery?_")
      $.html().should.containEql(
        '<h1 class="avant-garde-header">Gagosian Gallery</h1>'
      )
      $.html().should.containEql("Living the dream as")
    })

    it("shows the list of shows", async () => {
      const $ = await browser.page("/gagosian-gallery/shows")
      $.html().should.containEql("Upcoming Shows")
    })

    it("shows partner articles", async () => {
      const $ = await browser.page("/gagosian-gallery/articles")
      $.html().should.containEql("Articles")
    })

    it("does not show contact information for non-active partner", async () => {
      const $ = await browser.page("/gagosian-gallery/contact")
      $.html().should.containEql(
        "Sorry, the page you were looking for doesn&#x2019;t exist at this URL."
      )
    })

    it("show contact information for active partner", async () => {
      const $ = await browser.page("/pace-gallery/contact")
      $.html().should.containEql("Contact")
      $.html().should.containEql("New York")
    })

    it("should not render a page for /system/up healthcheck endpoint", async () => {
      const $ = await browser.page("/system/up")

      $.html().should.containEql(
        '<head></head><body><pre style="word-wrap: break-word; white-space: pre-wrap;">{&quot;nodejs&quot;:true}</pre></body>'
      )

      sinon.assert.notCalled(systemProfileStub)
    })
  })
})
