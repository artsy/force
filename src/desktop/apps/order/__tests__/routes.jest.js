import { stitch } from "@artsy/stitch"
import { buildServerApp } from "reaction/Artsy/Router/server"
import { checkoutFlow } from "../routes"

jest.mock("@artsy/stitch", () => ({
  stitch: jest.fn(),
}))

jest.mock("reaction/Artsy/Router/server", () => ({
  buildServerApp: jest.fn(),
}))

describe("Request for order", () => {
  let req
  let res
  let next
  const sendMock = jest.fn()

  describe("/orders/:orderID", () => {
    beforeEach(() => {
      req = {
        path: "/orders/123",
        originalUrl: "/orders/123",
        query: {},
        header: () => "referrer",
      }
      res = {
        locals: {
          sd: {
            CURRENT_USER: null,
          },
        },
        status: jest.fn(() => ({ send: sendMock })),
        redirect: jest.fn(),
      }
      next = jest.fn()
      stitch.mockReset()
      buildServerApp.mockReset()
      sendMock.mockReset()
    })

    it("redirects an unauthenticated user to log in", done => {
      checkoutFlow(req, res, next).then(() => {
        expect(res.redirect).toHaveBeenCalledWith(
          "/login?redirectTo=%2Forders%2F123"
        )
        done()
      })
    })

    it("permits an authenticated user access", done => {
      res.locals.sd.CURRENT_USER = {
        id: "user1234",
      }
      buildServerApp.mockResolvedValue({})

      checkoutFlow(req, res, next).then(() => {
        expect(res.redirect).not.toHaveBeenCalled()
        expect(buildServerApp).toHaveBeenCalled()
        done()
      })
    })

    it("serves a 404 when an order is not found", done => {
      res.locals.sd.CURRENT_USER = {
        id: "user1234",
      }
      buildServerApp.mockRejectedValue({
        message: "asdfadsfsda Received status code 404 adsfasd",
      })

      checkoutFlow(req, res, next).then(() => {
        expect(buildServerApp).toHaveBeenCalled()
        expect(next).toHaveBeenCalledWith(
          expect.objectContaining({
            message: "Order Not Found",
            status: 404,
          })
        )
        done()
      })
    })
  })
})
