/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const _ = require("underscore")
const benv = require("benv")
const sinon = require("sinon")
const Backbone = require("backbone")
const rewire = require("rewire")

describe("ContactView", function () {
  before(function (done) {
    return benv.setup(() => {
      benv.expose({ $: benv.require("jquery"), jQuery: benv.require("jquery") })
      Backbone.$ = $
      this.ContactView = rewire("../view")
      sinon.stub(this.ContactView.prototype, "open")
      sinon.stub(this.ContactView.prototype, "updatePosition")
      return done()
    })
  })

  after(() => benv.teardown())

  describe("User not logged in", function () {
    beforeEach(function () {
      return (this.view = new this.ContactView())
    })

    return xit("should pass a null user", function () {
      return _.isNull(this.view.user).should.be.ok()
    })
  })

  return describe("User logged in", function () {
    beforeEach(function () {
      this.ContactView.__set__("CurrentUser", {
        orNull() {
          return true
        },
      })
      return (this.view = new this.ContactView())
    })

    it("should pass a user", function () {
      return this.view.user.should.be.ok()
    })

    return describe("#initialize", function () {
      it("has sensible defaults which get set as the view options", function () {
        this.view.options.width.should.equal("470px")
        this.view.options.placeholder.should.equal("Your message")
        return this.view.options.url.should.containEql("api/v1/feedback")
      })

      return it("instantiates a model to use with the passed in API URL", function () {
        return this.view.model.url.should.equal(this.view.options.url)
      })
    })
  })
})
