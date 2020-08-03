/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
let flashStub
const _ = require("underscore")
const Backbone = require("backbone")
const benv = require("benv")
const sinon = require("sinon")
const sd = require("sharify").data
const { resolve } = require("path")
const rewire = require("rewire")
const UnsubscribeView = rewire("../client/view")
UnsubscribeView.__set__("FlashMessage", (flashStub = sinon.stub()))
const emailTypes = require("../email_types.coffee")

describe("Unsubscribe View", function () {
  before(done =>
    benv.setup(() => {
      benv.expose({ $: benv.require("jquery") })
      Backbone.$ = $
      return done()
    })
  )

  after(() => benv.teardown())

  beforeEach(function (done) {
    return benv.setup(() => {
      sinon.stub(Backbone, "sync")
      return benv.render(
        resolve(__dirname, "../templates/index.jade"),
        {
          sd: {},
          asset() {},
          emailTypes,
        },
        () => {
          UnsubscribeView.__set__("sd", { UNSUB_AUTH_TOKEN: "cat" })
          this.view = new UnsubscribeView({
            el: $("body"),
          })
          return done()
        }
      )
    })
  })

  afterEach(() => Backbone.sync.restore())

  it("renders checkboxes for each email type, including a select all", function () {
    _(_.keys(emailTypes)).each(type => {
      return this.view.$el.find(`input[name='${type}']`).length.should.equal(1)
    })
    return this.view.$el.find("input[name='selectAll']").length.should.equal(1)
  })

  return describe("posting to the API", function () {
    it("correctly passes in the token and selected email types", function () {
      this.view.$el
        .find("input[name='selectAll']")
        .prop("checked")
        .should.equal(false)
      this.view.$el.find("input[name='personalized_email']").click()
      this.view.$el.find("button").click()
      _.last(Backbone.sync.args)[1].attributes.type[0].should.equal(
        "personalized_email"
      )
      return _.last(
        Backbone.sync.args
      )[1].attributes.authentication_token.should.equal("cat")
    })

    it('correctly passes email type "all" when selectAll has occurred', function () {
      this.view.$el.find("input[name='selectAll']").click()
      this.view.$el.find("button").click()
      _.last(Backbone.sync.args)[1].attributes.type[0].should.equal("all")
      return _.last(
        Backbone.sync.args
      )[1].attributes.authentication_token.should.equal("cat")
    })

    it("renders success flash message on success", function () {
      Backbone.sync.restore()
      sinon.stub(Backbone, "sync").yieldsTo("success")
      this.view.$el.find("button").click()
      return _.last(flashStub.args)[0].message.should.equal(
        "You’ve been unsubscribed."
      )
    })

    return it("renders error flash message on error", function () {
      Backbone.sync.restore()
      sinon.stub(Backbone, "sync").yieldsTo("error")
      this.view.$el.find("button").click()
      return _.last(flashStub.args)[0].message.should.equal(
        "Whoops, there was an error."
      )
    })
  })
})
