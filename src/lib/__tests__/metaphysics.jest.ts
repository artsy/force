import Backbone from "backbone"
import { metaphysics } from "lib/metaphysics"

jest.mock("sharify", () => ({
  data: {
    METAPHYSICS_ENDPOINT: "https://metaphysics.test",
  },
}))
jest.mock("superagent", () => ({
  end: jest.fn(cb => cb()),
  get: jest.fn(),
  post: jest.fn(),
  query: jest.fn(),
  send: jest.fn(),
  set: jest.fn(),
  timeout: jest.fn(),
}))
const request = require("superagent")

describe("metaphysics", () => {
  beforeEach(() => {
    request.set = jest.fn().mockReturnValue(request)
    request.post.mockReturnValue(request)
    request.send.mockReturnValue(request)
    request.set.mockReturnValue(request)
    request.timeout.mockReturnValue(request)
    request.end.mockImplementation(cb =>
      cb(null, { body: { data: {} }, ok: true })
    )
  })

  it("accepts a query and variables and makes a request to the METAPHYSICS_ENDPOINT", async () => {
    const query = `\
query artist($id: String!) { \
artist(id: $id) { \
id \
} \
}\
`
    const variables = { id: "foo-bar", size: 3 }
    request.end.mockImplementationOnce(cb =>
      cb(null, {
        body: { data: { artist: { id: "foo-bar" } } },
        ok: true,
      })
    )

    await metaphysics({
      query,
      variables,
    })
    expect(request.set).toBeCalledWith("Accept", "application/json")
    expect(request.set).toBeCalledWith("X-Request-Id", "implement-me")
    expect(request.get).not.toBeCalled()
    expect(request.post).toBeCalledWith("https://metaphysics.test")
    expect(request.send).toBeCalledWith({ query, variables })
  })

  describe("success", () => {
    it("yields with the data", async () => {
      request.end.mockImplementationOnce(cb =>
        cb(null, {
          body: { data: { artist: { id: "foo-bar" } } },
          ok: true,
        })
      )

      await metaphysics({
        query: `\
query artist($id: String!) { \
artist(id: $id) { \
id \
} \
}\
`,
        variables: { id: "foo-bar" },
      }).then(data => data.should.eql({ artist: { id: "foo-bar" } }))
    })
  })

  describe("error", () => {
    it("rejects with the error", async () => {
      request.end.mockImplementationOnce(cb => cb(new Error("some error")))

      await metaphysics({
        query: `\
query artist($id: String!) { \
artist(id: $id) { \
id \
} \
}\
`,
        variables: { id: "foo-bar" },
      }).catch(err => err.message.should.equal("some error"))
    })

    it("includes the data", async () => {
      request.end.mockImplementationOnce(cb =>
        cb(null, {
          body: {
            data: { foo: "bar" },
            errors: [{ message: "some error" }],
          },
        })
      )

      await metaphysics({
        query: `\
query artist($id: String!) { \
artist(id: $id) { \
id \
} \
}\
`,
        variables: { id: "foo-bar" },
      }).catch(err => err.data.foo.should.equal("bar"))
    })
  })

  describe("partial error", () => {
    it("rejects with the errors", async () => {
      request.end.mockImplementationOnce(cb =>
        cb(null, {
          body: {
            data: { artist: { id: "foo-bar" } },
            errors: [{ message: "some error" }],
          },
          ok: true,
        })
      )

      await metaphysics({
        query: `\
query artist($id: String!) { \
artist(id: $id) { \
id \
} \
}\
`,
        variables: { id: "foo-bar" },
      }).catch(err => err.message.should.equal('[{"message":"some error"}]'))
    })

    it('sets a status code of 404 if ANY of the errors contain a "Not Found" message', async () => {
      request.end.mockImplementationOnce(cb =>
        cb(null, {
          body: {
            data: { artist: { id: "foo-bar" } },
            errors: [{ message: "Artwork Not Found" }],
          },
          ok: true,
        })
      )

      await metaphysics({
        query: `\
query artist($id: String!) { \
artist(id: $id) { \
id \
} \
}\
`,
        variables: { id: "foo-bar" },
      }).catch(err => err.status.should.equal(404))
    })
  })

  describe("user auth", () => {
    let user
    beforeEach(() => {
      user = new Backbone.Model({ accessToken: "xxx", id: "007" })
    })

    it("optionally accepts a req object, from which it extracts the user access token", async () => {
      await metaphysics({ req: { id: "foo", user } } as any)

      expect(request.set).toBeCalledWith("Accept", "application/json")
      expect(request.set).toBeCalledWith("X-Request-Id", "foo")
      expect(request.set).toBeCalledWith({ "X-ACCESS-TOKEN": "xxx" })
      expect(request.set).toBeCalledWith({ "X-USER-ID": "007" })
    })
  })

  describe("request id", () => {
    it("optionally accepts a req object, from which it extracts the request id", async () => {
      await metaphysics({ req: { id: "foo" } } as any)

      expect(request.set).toBeCalledWith("Accept", "application/json")
      expect(request.set).toBeCalledWith("X-Request-Id", "foo")
    })

    describe("x forwarded for", () => {
      it("optionally accepts a req object, from which it constructs the x-forwarded-for header if the request has a remote address", async () => {
        await metaphysics({
          req: { connection: { remoteAddress: "::ffff:127.0.0.1" } },
        } as any)
        expect(request.set).toBeCalledWith("Accept", "application/json")
        expect(request.set).toBeCalledWith("X-Request-Id", "implement-me")
        expect(request.set).toBeCalledWith(
          "X-Forwarded-For",
          "::ffff:127.0.0.1"
        )
      })
    })
  })
})
