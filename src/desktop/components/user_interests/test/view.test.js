/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const _ = require("underscore")
const benv = require("benv")
const sinon = require("sinon")
const rewire = require("rewire")
const Backbone = require("backbone")
let UserInterestsView = null

describe("UserInterestsView", function () {
  before(done =>
    benv.setup(function () {
      benv.expose({ $: benv.require("jquery"), jQuery: benv.require("jquery") })
      UserInterestsView = rewire("../view")
      UserInterestsView.__set__("CURRENT_USER", "existy")
      UserInterestsView.__set__("ResultsListView", Backbone.View)
      Backbone.$ = $
      return done()
    })
  )

  after(() => benv.teardown())

  beforeEach(function () {
    sinon.stub(Backbone, "sync")
    return (this.view = new UserInterestsView())
  })

  afterEach(() => Backbone.sync.restore())

  describe("#interested", function () {
    beforeEach(function () {
      const interest = new Backbone.Model({ id: "foobar", name: "Foo Bar" })
      return this.view.resultsList.trigger("add", interest)
    })

    return it("when a result is added; the view syncs it as an inteerest", function () {
      Backbone.sync.callCount.should.equal(2)

      Backbone.sync.args[0][1]
        .url()
        .should.containEql("/api/v1/me/user_interest")
      Backbone.sync.args[0][1].attributes.should.eql({
        interest_type: "Artist",
        interest_id: "foobar",
        interest: { id: "foobar", name: "Foo Bar" },
        category: "collected_before",
      })

      Backbone.sync.args[1][1]
        .url()
        .should.containEql("/api/v1/me/follow/artist")

      return this.view.following.length.should.equal(1)
    })
  })

  return describe("#uninterested", function () {
    beforeEach(function () {
      this.interest = new Backbone.Model({ id: "foobar", name: "Foo Bar" })
      return this.view.collection.addInterest(this.interest)
    })

    it("removes the interest from the collection", function () {
      this.view.collection.length.should.equal(1)
      this.view.resultsList.trigger("remove", this.interest)
      return this.view.collection.length.should.equal(0)
    })

    return it("destroys the interest", function () {
      sinon.spy(this.view.collection.model.prototype, "destroy")
      this.view.resultsList.trigger("remove", this.interest)
      return this.view.collection.model.prototype.destroy.called.should.be.true()
    })
  })
})
