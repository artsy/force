/* eslint-env mocha */
import { setup, teardown } from "./helpers"
import allSettled from "promise.allsettled"

// Nightmare uses an old version of electron running Node v8, we need to
// polyfill Promise.allSettled so the tests pass.
allSettled.shim()

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
    metaphysics.post("/v2", (req, res) => {
      res.send(require("./fixtures/metaphysics/home"))
    })
  })

  after(teardown)

  it('renders "Browse Works for Sale"', async () => {
    const $ = await browser.page("/")
    $.html().should.containEql("Browse Works for Sale")
  })
})
