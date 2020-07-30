/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const _ = require("underscore")
const benv = require("benv")
const sinon = require("sinon")
const Errors = require("../errors")
const { template, errors } = require("./fixture")

describe("Errors", function () {
  before(done =>
    benv.setup(function () {
      benv.expose({ $: benv.require("jquery"), jQuery: benv.require("jquery") })
      return done()
    })
  )

  after(() => benv.teardown())

  beforeEach(function () {
    this.$form = $(template)
    return (this.errors = new Errors(this.$form))
  })

  describe("#__parse__", () =>
    it("should automatically try to handle the arguments passed to it to pull out the appropriate response", function () {
      this.errors
        .__parse__({ responseText: '{"text":"Foo Bar"}' })
        .should.equal("Foo Bar")
      this.errors
        .__parse__(null, { responseText: '{"text":"Foo Bar"}' })
        .should.equal("Foo Bar")
      return this.errors
        .__parse__("Manually passed text")
        .should.equal("Manually passed text")
    }))

  return describe("#parse", function () {
    _.each(errors, response =>
      it("should handle a real world error response", function () {
        return this.errors
          .parse({ responseText: response.error })
          .should.equal(response.message)
      })
    )

    return it("should set the error state on inputs when there is a param_error", function () {
      this.errors.parse({ responseText: errors[0].error })
      return this.$form
        .find("input[name=email]")
        .data("state")
        .should.equal("error")
    })
  })
})
