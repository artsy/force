/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const _ = require("underscore")
const Backbone = require("backbone")
const benv = require("benv")
const sinon = require("sinon")
const { resolve } = require("path")
const emailTypes = require("../email_types.coffee")

describe("Unsubscribe View", function () {
  beforeEach(function (done) {
    return benv.setup(() => {
      benv.expose({ $: benv.require("jquery") })
      Backbone.$ = $
      sinon.stub(Backbone, "sync")
      return benv.render(
        resolve(__dirname, "../templates/index.jade"),
        {
          sd: {},
          emailTypes,
        },
        () => {
          const UnsubscribeView = benv.require(resolve(__dirname, "../client"))
          this.view = new UnsubscribeView({
            el: $("#unsubscribe-content"),
            unsubToken: "cat",
          })
          return done()
        }
      )
    })
  })

  afterEach(function () {
    benv.teardown()
    return Backbone.sync.restore()
  })

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
      this.view.$el
        .find("input[name='personalized_email']")
        .prop("checked", true)
      this.view.$el.find("button").click()
      _.last(Backbone.sync.args)[1].attributes.type[0].should.equal(
        "personalized_email"
      )
      return _.last(
        Backbone.sync.args
      )[1].attributes.authentication_token.should.equal("cat")
    })

    it('correctly passes email type "all" when selectAll has occurred', function () {
      this.view.$el.find("input[name='selectAll']").prop("checked", true)
      this.view.$el.find("button").click()
      _.last(Backbone.sync.args)[1].attributes.type[0].should.equal("all")
      return _.last(
        Backbone.sync.args
      )[1].attributes.authentication_token.should.equal("cat")
    })

    it("renders success message on success", function () {
      this.view.$el.find("button").click()
      _.last(Backbone.sync.args)[2].success({})
      return this.view.$el.html().should.containEql("You've been unsubscribed")
    })

    return it("renders error message on error", function () {
      this.view.$el.find("button").click()
      _.last(Backbone.sync.args)[2].error({})
      return this.view.$el
        .html()
        .should.containEql("Whoops, there was an error")
    })
  })
})
