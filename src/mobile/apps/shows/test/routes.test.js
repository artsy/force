/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const _ = require("underscore")
const sinon = require("sinon")
const moment = require("moment")
const Backbone = require("backbone")
const PartnerShow = require("../../../models/show")
const { fabricate } = require("@artsy/antigravity")
const routes = require("../routes")

describe("Shows routes", function () {
  beforeEach(() => sinon.stub(Backbone, "sync"))

  afterEach(() => Backbone.sync.restore())

  describe("#index", function () {
    beforeEach(function () {
      return (this.res = { render: sinon.stub() })
    })

    return it("fetches the set and renders the index template with featured cities", function (done) {
      routes.index({}, this.res)

      Backbone.sync.args[0][1].id.should.equal("530ebe92139b21efd6000071")
      Backbone.sync.args[0][1].item_type.should.equal("PartnerShow")
      Backbone.sync.args[0][2].url.should.containEql(
        "api/v1/set/530ebe92139b21efd6000071/items"
      )
      Backbone.sync.args[0][2].success([fabricate("show")])
      return _.defer(() =>
        _.defer(() => {
          this.res.render.args[0][0].should.equal("index")
          this.res.render.args[0][1].featuredCities.length.should.equal(10)
          return done()
        })
      )
    })
  })

  describe("#city", function () {
    beforeEach(function () {
      this.res = { render: sinon.stub(), locals: { sd: sinon.stub() } }
      return (this.next = sinon.stub())
    })

    it("nexts if the city is not valid", function () {
      routes.city({ params: { city: "meow" } }, this.res, this.next)
      return this.next.called.should.be.true()
    })

    return it("renders the city template", function (done) {
      routes.city({ params: { city: "new-york" } }, this.res, this.next)

      return _.defer(() =>
        _.defer(() => {
          this.res.render.called.should.be.true()
          this.res.render.args[0][0].should.equal("city")
          this.res.render.args[0][1].city.name.should.equal("New York")
          return done()
        })
      )
    })
  })

  return describe("#all-cities", function () {
    beforeEach(function () {
      return (this.res = { render: sinon.stub() })
    })

    return it("renders the all-cities template", function (done) {
      routes.all_cities({}, this.res, this.next)

      return _.defer(() =>
        _.defer(() => {
          this.res.render.called.should.be.true()
          this.res.render.args[0][0].should.equal("all_cities")
          this.res.render.args[0][1].cities.length.should.be.above(83)
          return done()
        })
      )
    })
  })
})
