import Backbone from "backbone"
import request from "superagent"

const { metaphysics2 } = require("../../lib/metaphysics2")

jest.mock("superagent", () => {
  return jest.fn()
})

jest.mock("sharify", () => {
  return {
    data: {
      METAPHYSICS_ENDPOINT: "https://metaphysics.test",
      API_REQUEST_TIMEOUT: 0,
      REQUEST_ID: 0,
    },
  }
})

describe("metaphysics2", () => {
  let testContext

  beforeEach(() => {
    testContext = {}
  })

  beforeEach(() => {
    testContext.request = request
    testContext.request.timeout = jest.fn(() => testContext.request)
    testContext.request.set = jest.fn(() => testContext.request)
    testContext.request.get = jest.fn(() => testContext.request)
    testContext.request.query = jest.fn(() => testContext.request)
    testContext.request.post = jest.fn(() => testContext.request)
    testContext.request.send = jest.fn(() => testContext.request)
    testContext.request.end = jest.fn(() => testContext.request)
  })

  it("accepts a query and variables and makes a request to the v2 METAPHYSICS_ENDPOINT", () => {
    let query, variables
    testContext.request.end.mockImplementation(cb => {
      cb(null, {
        ok: true,
        body: { data: { artist: { id: "foo-bar" } } },
      })
    })
    return metaphysics2({
      variables: variables = { id: "foo-bar", size: 3 },
      query: query = `\
  query artist($id: String!) { \
  artist(id: $id) { \
  id \
  } \
  }\
  `,
    }).then(() => {
      expect(testContext.request.set).toHaveBeenNthCalledWith(
        1,
        "Accept",
        "application/json"
      )
      expect(testContext.request.set).toHaveBeenNthCalledWith(
        2,
        "X-Request-Id",
        "implement-me"
      )
      expect(testContext.request.get).toBeCalledTimes(0)
      expect(testContext.request.post.mock.calls[0][0]).toEqual(
        "https://metaphysics.test/v2"
      )
      expect(testContext.request.send.mock.calls[0][0].query).toEqual(query)
      expect(testContext.request.send.mock.calls[0][0].variables).toEqual(
        variables
      )
    })
  })

  describe("success", () => {
    it("yields with the data", () => {
      testContext.request.end.mockImplementation(cb => {
        cb(null, {
          ok: true,
          body: { data: { artist: { id: "foo-bar" } } },
        })
      })

      return metaphysics2({
        variables: { id: "foo-bar" },
        query: `\
query artist($id: String!) { \
artist(id: $id) { \
id \
} \
}\
`,
      }).then(data => {
        expect(data).toEqual({ artist: { id: "foo-bar" } })
      })
    })
  })

  describe("error", () => {
    let originalError
    beforeEach(() => {
      originalError = console.error
      console.error = jest.fn()
    })

    afterEach(() => {
      console.error = originalError
    })

    it("rejects with the error", () => {
      const serverError = {
        status: 400,
        response: {
          text: '"some error"',
        },
      }
      testContext.request.end.mockImplementation(cb => {
        cb(serverError)
      })

      return metaphysics2({
        variables: { id: "foo-bar" },
        query: `\
query artist($id: String!) { \
artist(id: $id) { \
id \
} \
}\
`,
      }).catch(function (err) {
        expect(console.error).toHaveBeenNthCalledWith(
          1,
          expect.stringMatching('"some error"')
        )
        expect(err).toEqual(serverError)
      })
    })

    it("includes the data", () => {
      testContext.request.end.mockImplementation(cb => {
        cb(null, {
          body: {
            errors: [{ message: "some error" }],
            data: { foo: "bar" },
          },
        })
      })

      return metaphysics2({
        variables: { id: "foo-bar" },
        query: `\
query artist($id: String!) { \
artist(id: $id) { \
id \
} \
}\
`,
      }).catch(err => {
        expect(err.data.foo).toEqual("bar")
      })
    })
  })

  describe("partial error", () => {
    it("rejects with the errors", () => {
      testContext.request.end.mockImplementation(cb => {
        cb(null, {
          ok: true,
          body: {
            data: { artist: { id: "foo-bar" } },
            errors: [{ message: "some error" }],
          },
        })
      })

      return metaphysics2({
        variables: { id: "foo-bar" },
        query: `\
query artist($id: String!) { \
artist(id: $id) { \
id \
} \
}\
`,
      }).catch(err => {
        expect(err.message).toEqual('[{"message":"some error"}]')
      })
    })

    it('sets a status code of 404 if ANY of the errors contain a "Not Found" message', () => {
      testContext.request.end.mockImplementation(cb => {
        cb(null, {
          ok: true,
          body: {
            data: { artist: { id: "foo-bar" } },
            errors: [{ message: "Artwork Not Found" }],
          },
        })
      })

      return metaphysics2({
        variables: { id: "foo-bar" },
        query: `\
  query artist($id: String!) { \
  artist(id: $id) { \
  id \
  } \
  }\
  `,
      }).catch(err => {
        expect(err.status).toEqual(404)
      })
    })
  })

  describe("user auth", () => {
    beforeEach(() => {
      testContext.user = new Backbone.Model({ accessToken: "xxx", id: "007" })
    })

    it("optionally accepts a req object, from which it extracts the user access token", () => {
      testContext.request.end.mockImplementation(cb => {
        cb(null, { ok: true, body: { data: {} } })
      })

      return metaphysics2({ req: { user: testContext.user, id: "foo" } }).then(
        () => {
          expect(testContext.request.set).toHaveBeenNthCalledWith(
            1,
            "Accept",
            "application/json"
          )
          expect(testContext.request.set).toHaveBeenNthCalledWith(
            2,
            "X-Request-Id",
            "foo"
          )
          expect(testContext.request.set).toHaveBeenNthCalledWith(3, {
            "X-ACCESS-TOKEN": "xxx",
          })
          expect(testContext.request.set).toHaveBeenNthCalledWith(4, {
            "X-USER-ID": "007",
          })
        }
      )
    })
  })

  describe("request id", () => {
    it("optionally accepts a req object, from which it extracts the request id", () => {
      testContext.request.end.mockImplementation(cb => {
        cb(null, { ok: true, body: { data: {} } })
      })

      return metaphysics2({ req: { id: "foo" } }).then(() => {
        expect(testContext.request.set).toHaveBeenNthCalledWith(
          1,
          "Accept",
          "application/json"
        )
        expect(testContext.request.set).toHaveBeenNthCalledWith(
          2,
          "X-Request-Id",
          "foo"
        )
      })
    })

    describe("x forwarded for", () => {
      it("optionally accepts a req object, from which it constructs the x-forwarded-for header if the request has a remote address", () => {
        testContext.request.end.mockImplementation(cb => {
          cb(null, { ok: true, body: { data: {} } })
        })

        return metaphysics2({
          req: { connection: { remoteAddress: "::ffff:127.0.0.1" } },
        }).then(() => {
          expect(testContext.request.set).toHaveBeenNthCalledWith(
            1,
            "Accept",
            "application/json"
          )
          expect(testContext.request.set).toHaveBeenNthCalledWith(
            2,
            "X-Request-Id",
            "implement-me"
          )
          expect(testContext.request.set).toHaveBeenNthCalledWith(
            3,
            "X-Forwarded-For",
            "127.0.0.1"
          )
        })
      })
    })
  })
})
