/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const sinon = require("sinon")
const rewire = require("rewire")
const Backbone = require("backbone")
const metaphysics = rewire("../../lib/metaphysics")

describe("metaphysics", function () {
  beforeEach(function () {
    this.__request__ = metaphysics.__get__("request")

    this.request = {}
    this.request.timeout = sinon.stub().returns(this.request)
    this.request.set = sinon.stub().returns(this.request)
    this.request.get = sinon.stub().returns(this.request)
    this.request.query = sinon.stub().returns(this.request)
    this.request.post = sinon.stub().returns(this.request)
    this.request.send = sinon.stub().returns(this.request)
    this.request.end = sinon.stub().returns(this.request)

    metaphysics.__set__("request", this.request)
    return metaphysics.__set__(
      "METAPHYSICS_ENDPOINT",
      "https://metaphysics.test"
    )
  })

  afterEach(function () {
    return metaphysics.__set__("request", this.__request__)
  })

  it("accepts a query and variables and makes a request to the METAPHYSICS_ENDPOINT", function () {
    let query, variables
    this.request.end.yields(null, {
      ok: true,
      body: { data: { artist: { id: "foo-bar" } } },
    })

    return metaphysics({
      variables: (variables = { id: "foo-bar", size: 3 }),
      query: (query = `\
query artist($id: String!) { \
artist(id: $id) { \
id \
} \
}\
`),
    }).then(() => {
      this.request.set.args.should.eql([
        ["Accept", "application/json"],
        ["X-Request-Id", "implement-me"],
      ])
      this.request.get.called.should.be.false()
      this.request.post.args[0][0].should.equal("https://metaphysics.test")
      this.request.send.args[0][0].query.should.equal(query)
      return this.request.send.args[0][0].variables.should.equal(variables)
    })
  })

  describe("success", () =>
    it("yields with the data", function () {
      this.request.end.yields(null, {
        ok: true,
        body: { data: { artist: { id: "foo-bar" } } },
      })

      return metaphysics({
        variables: { id: "foo-bar" },
        query: `\
query artist($id: String!) { \
artist(id: $id) { \
id \
} \
}\
`,
      }).then(data => data.should.eql({ artist: { id: "foo-bar" } }))
    }))

  describe("error", function () {
    it("rejects with the error", function () {
      this.request.end.yields(new Error("some error"))

      return metaphysics({
        variables: { id: "foo-bar" },
        query: `\
query artist($id: String!) { \
artist(id: $id) { \
id \
} \
}\
`,
      }).catch(err => err.message.should.equal("some error"))
    })

    return it("includes the data", function () {
      this.request.end.yields(null, {
        body: {
          errors: [{ message: "some error" }],
          data: { foo: "bar" },
        },
      })

      return metaphysics({
        variables: { id: "foo-bar" },
        query: `\
query artist($id: String!) { \
artist(id: $id) { \
id \
} \
}\
`,
      }).catch(err => err.data.foo.should.equal("bar"))
    })
  })

  describe("partial error", function () {
    it("rejects with the errors", function () {
      this.request.end.yields(null, {
        ok: true,
        body: {
          data: { artist: { id: "foo-bar" } },
          errors: [{ message: "some error" }],
        },
      })

      return metaphysics({
        variables: { id: "foo-bar" },
        query: `\
query artist($id: String!) { \
artist(id: $id) { \
id \
} \
}\
`,
      }).catch(err => err.message.should.equal('[{"message":"some error"}]'))
    })

    return it('sets a status code of 404 if ANY of the errors contain a "Not Found" message', function () {
      this.request.end.yields(null, {
        ok: true,
        body: {
          data: { artist: { id: "foo-bar" } },
          errors: [{ message: "Artwork Not Found" }],
        },
      })

      return metaphysics({
        variables: { id: "foo-bar" },
        query: `\
query artist($id: String!) { \
artist(id: $id) { \
id \
} \
}\
`,
      }).catch(err => err.status.should.equal(404))
    })
  })

  describe("user auth", function () {
    beforeEach(function () {
      return (this.user = new Backbone.Model({ accessToken: "xxx", id: "007" }))
    })

    return it("optionally accepts a req object, from which it extracts the user access token", function () {
      this.request.end.yields(null, { ok: true, body: { data: {} } })

      return metaphysics({ req: { user: this.user, id: "foo" } }).then(() => {
        return this.request.set.args.should.eql([
          ["Accept", "application/json"],
          ["X-Request-Id", "foo"],
          [{ "X-ACCESS-TOKEN": "xxx" }],
          [{ "X-USER-ID": "007" }],
        ])
      })
    })
  })

  return describe("request id", function () {
    it("optionally accepts a req object, from which it extracts the request id", function () {
      this.request.end.yields(null, { ok: true, body: { data: {} } })

      return metaphysics({ req: { id: "foo" } }).then(() => {
        return this.request.set.args.should.eql([
          ["Accept", "application/json"],
          ["X-Request-Id", "foo"],
        ])
      })
    })

    return describe("x forwarded for", () =>
      it("optionally accepts a req object, from which it constructs the x-forwarded-for header if the request has a remote address", function () {
        this.request.end.yields(null, { ok: true, body: { data: {} } })

        return metaphysics({
          req: { connection: { remoteAddress: "::ffff:127.0.0.1" } },
        }).then(() => {
          return this.request.set.args.should.eql([
            ["Accept", "application/json"],
            ["X-Request-Id", "implement-me"],
            ["X-Forwarded-For", "127.0.0.1"],
          ])
        })
      }))
  })
})
