/* eslint-env mocha */
import { setup, teardown } from "./helpers"

describe("Home page", () => {
  let gravity, positron, metaphysics, browser

  before(async () => {
    ;({ gravity, positron, metaphysics, browser } = await setup())
    gravity.get("/api/v1/set/529939e2275b245e290004a0/items", (req, res) => {
      res.send(require("./fixtures/gravity/home"))
    })
    gravity.get("/api/v1/set/530ebe92139b21efd6000071/items", (req, res) => {
      res.send(require("./fixtures/gravity/home1"))
    })
    positron.get("/api/articles", (req, res) => {
      res.send(require("./fixtures/gravity/home"))
    })
    metaphysics.post("/", (req, res) => {
      res.send(require("./fixtures/metaphysics/home"))
    })
  })

  after(teardown)

  it('renders "Browse Works for Sale"', async () => {
    const $ = await browser.page("/")
    $.html().should.containEql("Browse Works for Sale")
  })

  it("renders the email confirmed banner when flash_message is confirmed", async () => {
    const $ = await browser.page("/?flash_message=confirmed")

    $("div[class*=Banner__Wrapper]").should.have.length(1)
    $.html().should.containEql("Your email has been confirmed")
  })

  it("ignores flash_message that isn't explicitly supported", async () => {
    const $ = await browser.page("/?flash_message=l33thaxor")

    $("div[class*=Banner__Wrapper]").should.have.length(0)
  })
})
