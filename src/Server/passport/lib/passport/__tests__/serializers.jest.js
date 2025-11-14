const serializers = require("../serializers")
const { serialize, deserialize } = serializers

// biome-ignore lint/style/noRestrictedImports: ignore
import request from "superagent"

jest.mock("superagent")

/* eslint-disable jest/no-done-callback */

describe("#serialize", () => {
  let resolveSerialize

  beforeEach(() => {
    for (const method of ["get", "end", "set", "post", "send", "status"]) {
      request[method] = jest.fn().mockReturnValue(request)
    }
    resolveSerialize = () => {
      request.end.mock.calls[0][0](null, { body: { id: "craig", foo: "baz" } })
      request.end.mock.calls[1][0](null, { body: [{ provider: "facebook" }] })
    }
  })

  it("only stores select data in the session", done => {
    const user = { id: "craig", foo: "baz", bam: "bop" }
    serialize({}, user, (_err, data) => {
      expect(data.foo != null).not.toBeTruthy()
      expect(data.id).toEqual("craig")
      done()
    })
    resolveSerialize()
  })

  it("add authentications", done => {
    const user = { id: "craig", foo: "baz", bam: "bop" }
    serialize({}, user, (_err, data) => {
      expect(data.authentications[0].provider).toEqual("facebook")
      done()
    })
    resolveSerialize()
  })

  it("works when there's an error from Gravity", done => {
    const user = { id: "craig", foo: "baz", bam: "bop" }
    serialize({}, user, err => {
      expect(err.message).toEqual("fail")
      done()
    })
    request.end.mock.calls[0][0](null, { body: { id: "craig", foo: "baz" } })
    request.end.mock.calls[1][0](new Error("fail"), null)
  })

  it("glues the user onto the request", done => {
    const user = { id: "craig", foo: "baz", bam: "bop" }
    const req = { user: null }
    serialize(req, user, (_err, _data) => {
      expect(req.user.id).toEqual(user.id)
      done()
    })
    resolveSerialize()
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
