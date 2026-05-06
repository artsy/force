/* eslint-disable no-restricted-imports */
const serializers = require("../serializers")
const { serialize, deserialize } = serializers

import { requestGravity } from "../../http"

jest.mock("../../http")

const mockRequestGravity = requestGravity as jest.Mock

/* eslint-disable jest/no-done-callback */

describe("#serialize", () => {
  beforeEach(() => {
    mockRequestGravity.mockReset()
  })

  it("only stores select data in the session", done => {
    mockRequestGravity
      .mockResolvedValueOnce({ body: { id: "craig", foo: "baz" } })
      .mockResolvedValueOnce({ body: [{ provider: "facebook" }] })

    const user = { id: "craig", foo: "baz", bam: "bop" }
    serialize({}, user, (_err, data) => {
      expect(data.foo != null).not.toBeTruthy()
      expect(data.id).toEqual("craig")
      done()
    })
  })

  it("add authentications", done => {
    mockRequestGravity
      .mockResolvedValueOnce({ body: { id: "craig", foo: "baz" } })
      .mockResolvedValueOnce({ body: [{ provider: "facebook" }] })

    const user = { id: "craig", foo: "baz", bam: "bop" }
    serialize({}, user, (_err, data) => {
      expect(data.authentications[0].provider).toEqual("facebook")
      done()
    })
  })

  it("works when there's an error from Gravity", done => {
    mockRequestGravity
      .mockResolvedValueOnce({ body: { id: "craig", foo: "baz" } })
      .mockRejectedValueOnce(new Error("fail"))

    const user = { id: "craig", foo: "baz", bam: "bop" }
    serialize({}, user, err => {
      expect(err.message).toEqual("fail")
      done()
    })
  })

  it("glues the user onto the request", done => {
    mockRequestGravity
      .mockResolvedValueOnce({ body: { id: "craig", foo: "baz" } })
      .mockResolvedValueOnce({ body: [{ provider: "facebook" }] })

    const user = { id: "craig", foo: "baz", bam: "bop" }
    const req = { user: null }
    serialize(req, user, (_err, _data) => {
      expect((req.user as any).id).toEqual(user.id)
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
