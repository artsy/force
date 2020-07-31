/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const _ = require("underscore")
const sinon = require("sinon")
const rewire = require("rewire")
const request = require("superagent")
const JSONPage = rewire("../index")
JSONPage.__set__({
  S3_KEY: "test_key",
  S3_SECRET: "test_secret",
  S3_BUCKET: "test_name",
})

describe("JSONPage", function () {
  beforeEach(function () {
    return (this.page = new JSONPage({ name: "test" }))
  })

  describe("#path", () =>
    it("returns a path to the JSON file on S3", function () {
      return this.page.path().should.equal("/json/test.json")
    }))

  describe("#client", () =>
    it("returns the S3 client", function () {
      return this.page.client().options.should.eql({
        key: "test_key",
        secret: "test_secret",
        bucket: "test_name",
      })
    }))

  xdescribe("#get", function () {
    // FIXME: TypeError: Attempted to wrap get which is already stubbed
    beforeEach(() =>
      sinon.stub(request, "get").returns({
        end: sinon
          .stub()
          .yields(null, {
            ok: true,
            text: JSON.stringify({ header: { headline: "test headline" } }),
          }),
      })
    )

    afterEach(() => request.get.restore())

    describe("successful", function () {
      it("fetches and parses the page data", function (done) {
        return this.page.get(function (err, data) {
          data.header.headline.should.equal("test headline")
          return done()
        })
      })

      return it("returns a promise; resolves with the parsed page data", function (done) {
        return this.page.get().done(function (data) {
          data.header.headline.should.equal("test headline")
          return done()
        })
      })
    })

    describe("unsuccessful", function () {
      beforeEach(function () {
        request.get.restore()
        return sinon.stub(request, "get").returns({
          end: sinon
            .stub()
            .yields(
              {},
              { ok: false, error: "cannot GET /json/wrong.json (403)" }
            ),
        })
      })

      it("calls back with the error", function (done) {
        return this.page.get(function (err, data) {
          err.message.should.equal("cannot GET /json/wrong.json (403)")
          return done()
        })
      })

      return it("returns a promise; rejects with the error", function () {
        return this.page
          .get()
          .catch(err =>
            err.message.should.equal("cannot GET /json/wrong.json (403)")
          )
      })
    })

    return describe("unsuccessful, without a response", function () {
      beforeEach(function () {
        request.get.restore()
        return sinon.stub(request, "get").returns({
          end: sinon.stub().yields({
            response: "cannot GET /json/wrong.json (403)",
          }),
        })
      })

      return it("calls back with the error", function (done) {
        return this.page.get(function (err, data) {
          err.message.should.equal("cannot GET /json/wrong.json (403)")
          return done()
        })
      })
    })
  })

  return describe("#set", function () {
    beforeEach(function () {
      return sinon
        .stub(JSONPage.prototype, "client")
        .returns({ putBuffer: (this.putBufferStub = sinon.stub()) })
    }) //.yields()

    afterEach(function () {
      return this.page.client.restore()
    })

    return it("uploads the data to S3", function (done) {
      const data = { header: { headline: "new test headline" } }
      this.page.set(data, function (err, response) {
        response.should.equal(data)
        return done()
      })
      this.putBufferStub.args[0][0]
        .toString()
        .should.equal(JSON.stringify(data))
      return this.putBufferStub.args[0][3](null, data)
    })
  })
})
