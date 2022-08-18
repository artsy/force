/* eslint-disable no-restricted-imports */
const sinon = require("sinon")
const serializers = require("../../lib/passport/serializers")
const { serialize, deserialize } = serializers

import options from "Server/passport/lib/options"
import request from "superagent"
import passport from "passport"

jest.mock("superagent")

/* eslint-disable jest/no-done-callback */

describe("#serialize", function () {
  let resolveSerialize

  beforeEach(function () {
    for (let method of ["get", "end", "set", "post", "send", "status"]) {
      request[method] = sinon.stub().returns(request)
    }
    resolveSerialize = () => {
      request.end.args[0][0](null, { body: { id: "craig", foo: "baz" } })
      request.end.args[1][0](null, { body: [{ provider: "facebook" }] })
    }
  })

  it("only stores select data in the session", function (done) {
    const user = { id: "craig", foo: "baz", bam: "bop" }
    serialize({}, user, function (_err, data) {
      expect(data.foo != null).not.toBeTruthy()
      expect(data.id).toEqual("craig")
      done()
    })
    resolveSerialize()
  })

  it("add authentications", function (done) {
    const user = { id: "craig", foo: "baz", bam: "bop" }
    serialize({}, user, function (_err, data) {
      expect(data.authentications[0].provider).toEqual("facebook")
      done()
    })
    resolveSerialize()
  })

  it("works when theres an error from Gravity", function (done) {
    const user = { id: "craig", foo: "baz", bam: "bop" }
    serialize({}, user, function (err) {
      expect(err.message).toEqual("fail")
      done()
    })
    request.end.args[0][0](null, { body: { id: "craig", foo: "baz" } })
    request.end.args[1][0](new Error("fail"), null)
  })

  it("glues the user onto the request", function (done) {
    const user = { id: "craig", foo: "baz", bam: "bop" }
    const req = { user: null }
    serialize(req, user, (_err, _data) => {
      expect(req.user.id).toEqual(user.id)
      done()
    })
    resolveSerialize()
  })
})

describe("#deserialize", function () {
  it("passes the user data through", function (done) {
    deserialize({ id: "craig", name: "Craig" }, function (_err, user) {
      expect(user.name).toEqual("Craig")
      done()
    })
  })
})
