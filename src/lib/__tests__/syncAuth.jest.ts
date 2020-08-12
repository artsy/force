import $ from "jquery"
import syncAuth from "lib/syncAuth"

jest.mock("sharify", () => {
  return {
    data: {
      API_URL: "testingapi",
    },
  }
})
const sd = require("sharify").data

$.ajax = jest.fn()

describe("#syncAuth", () => {
  beforeEach(() => {
    sd.CURRENT_USER = { id: "123", email: "user@email.com" }
    $.ajax.mockReset()
  })

  it("does nothing for logged out users", () => {
    sd.CURRENT_USER = null
    syncAuth()
    expect($.ajax).not.toHaveBeenCalled()
  })

  it("makes a request to /me", () => {
    syncAuth()
    expect($.ajax.mock.calls[0][0]["url"]).toBe("testingapi/api/v1/me")
  })

  it("logs out the user on receiving a 401 response", () => {
    syncAuth()
    $.ajax.mock.calls[0][0]["statusCode"][401]()
    expect($.ajax.mock.calls[1][0]).toMatchObject({
      method: "DELETE",
      url: "/users/sign_out",
    })
  })
})
