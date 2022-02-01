jest.mock("../../desktop", () => jest.fn())

const express = require("express")
const artsyPassport = require("lib/passport")

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
      const { initializeMiddleware } = require("../../middleware")
      initializeMiddleware(app)

      expect(artsyPassport.options.ARTSY_ID).toEqual("client-id-123")
      expect(artsyPassport.options.ARTSY_SECRET).toEqual("client-secret-123")
    })
  })
})
