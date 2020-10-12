const _ = require("underscore")
const Backbone = require("backbone")
const benv = require("benv")
const sinon = require("sinon")
const { resolve } = require("path")
const emailTypes = require("../email_types.coffee")

describe("Unsubscribe View", () => {
  let view
  beforeEach(done => {
    benv.setup(() => {
      benv.expose({
        $: benv.require("jquery"),
        jQuery: benv.require("jquery"),
      })
      sinon.stub(Backbone, "sync")
      benv.render(
        resolve(__dirname, "../templates/index.jade"),
        {
          sd: {},
          emailTypes,
        },
        () => {
          const UnsubscribeView = benv.require(resolve(__dirname, "../client"))
          Backbone.$ = $
          view = new UnsubscribeView({
            el: $("#unsubscribe-content"),
            unsubToken: "cat",
          })
          done()
        }
      )
    })
  })

  afterEach(() => {
    benv.teardown()
    Backbone.sync.restore()
  })

  it("renders checkboxes for each email type, including a select all", () => {
    _(_.keys(emailTypes)).each(type => {
      view.$el.find(`input[name='${type}']`).length.should.equal(1)
    })
    view.$el.find("input[name='selectAll']").length.should.equal(1)
  })

  describe("posting to the API", () => {
    it("correctly passes in the token and selected email types", () => {
      view.$el
        .find("input[name='selectAll']")
        .prop("checked")
        .should.equal(false)
      view.$el.find("input[name='personalized_email']").prop("checked", true)
      view.$el.find("button").click()
      _.last(Backbone.sync.args)[1].attributes.type[0].should.equal(
        "personalized_email"
      )
      _.last(
        Backbone.sync.args
      )[1].attributes.authentication_token.should.equal("cat")
    })

    it('correctly passes email type "all" when selectAll has occurred', () => {
      view.$el.find("input[name='selectAll']").prop("checked", true)
      view.$el.find("button").click()
      _.last(Backbone.sync.args)[1].attributes.type[0].should.equal("all")
      _.last(
        Backbone.sync.args
      )[1].attributes.authentication_token.should.equal("cat")
    })

    it("renders success message on success", () => {
      view.$el.find("button").click()
      _.last(Backbone.sync.args)[2].success({})
      view.$el.html().should.containEql("You've been unsubscribed")
    })

    it("renders error message on error", () => {
      view.$el.find("button").click()
      _.last(Backbone.sync.args)[2].error({})
      view.$el.html().should.containEql("Whoops, there was an error")
    })
  })
})
