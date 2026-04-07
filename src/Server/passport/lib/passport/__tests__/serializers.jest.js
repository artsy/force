/* eslint-disable no-restricted-imports */
const serializers = require("../serializers")
const { serialize, deserialize } = serializers

import options from "Server/passport/lib/options"
import passport from "passport"
import request from "superagent"

jest.mock("superagent")

/* eslint-disable jest/no-done-callback */

describe("#serialize", () => {
  it("only stores select data in the session", done => {
    const setMock = jest.fn()
    setMock
      .mockResolvedValueOnce({ body: { id: "craig", foo: "baz" } })
      .mockResolvedValueOnce({ body: [{ provider: "facebook" }] })
    request.get = jest.fn().mockReturnValue({ set: setMock })

    const user = { id: "craig", foo: "baz", bam: "bop" }
    serialize({}, user, (_err, data) => {
      expect(data.foo != null).not.toBeTruthy()
      expect(data.id).toEqual("craig")
      done()
    })
  })

  it("add authentications", done => {
    const setMock = jest.fn()
    setMock
      .mockResolvedValueOnce({ body: { id: "craig", foo: "baz" } })
      .mockResolvedValueOnce({ body: [{ provider: "facebook" }] })
    request.get = jest.fn().mockReturnValue({ set: setMock })

    const user = { id: "craig", foo: "baz", bam: "bop" }
    serialize({}, user, (_err, data) => {
      expect(data.authentications[0].provider).toEqual("facebook")
      done()
    })
  })

  it("works when there's an error from Gravity", done => {
    const setMock = jest.fn()
    setMock
      .mockResolvedValueOnce({ body: { id: "craig", foo: "baz" } })
      .mockRejectedValueOnce(new Error("fail"))
    request.get = jest.fn().mockReturnValue({ set: setMock })

    const user = { id: "craig", foo: "baz", bam: "bop" }
    serialize({}, user, err => {
      expect(err.message).toEqual("fail")
      done()
    })
  })

  it("glues the user onto the request", done => {
    const setMock = jest.fn()
    setMock
      .mockResolvedValueOnce({ body: { id: "craig", foo: "baz" } })
      .mockResolvedValueOnce({ body: [{ provider: "facebook" }] })
    request.get = jest.fn().mockReturnValue({ set: setMock })

    const user = { id: "craig", foo: "baz", bam: "bop" }
    const req = { user: null }
    serialize(req, user, (_err, _data) => {
      expect(req.user.id).toEqual(user.id)
      done()
    })
  })
})

describe("#deserialize", () => {
  it("passes the user data through", done => {
    deserialize({ id: "craig", name: "Craig" }, (_err, user) => {
      expect(user.name).toEqual("Craig")
      done()
    })
  })
})
