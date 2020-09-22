// Requiring all desktop apps takes a long time, probably due to transpilation.
// Since we are not interested in testing them, let's mock it.
// https://github.com/artsy/force/blob/b607b3b2bd9459981203c879ae3b3a3b04e9e587/src/lib/setup.js#L284
jest.mock("../../desktop", () => {
  return jest.fn()
})

const express = require("express")
const artsyPassport = require("@artsy/passport")

describe("setup", () => {
  describe("artsyPassport", () => {
    const originalEnv = process.env

    afterEach(() => {
      process.env = originalEnv
    })

    it("sets ARTSY_ID/ARTSY_SECRET with CLIENT_ID/CLIENT_SECRET from env vars", () => {
      process.env = Object.assign({}, originalEnv, {
        CLIENT_ID: "client-id-123",
        CLIENT_SECRET: "client-secret-123",
      })

      const app = express()
      const setup = require("../setup").default
      setup(app)

      expect(artsyPassport.options.ARTSY_ID).toEqual("client-id-123")
      expect(artsyPassport.options.ARTSY_SECRET).toEqual("client-secret-123")
    })
  })
})
