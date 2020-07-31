/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const _ = require("underscore")
const sinon = require("sinon")
const Backbone = require("backbone")
const { fabricate } = require("@artsy/antigravity")
const routes = require("../routes")
const Partner = require("../../../models/partner")
const Partners = require("../../../collections/partners")

describe("Galleries routes", function () {
  beforeEach(() => sinon.stub(Backbone, "sync").yieldsTo("success", []))

  afterEach(() => Backbone.sync.restore())

  describe("#index", function () {
    beforeEach(function () {
      this.res = { render: sinon.stub() }
      return (this.req = { path: "/galleries" })
    })

    return it("renders the galleries page", function () {
      routes.index(this.req, this.res)
      this.res.render.args[0][0].should.equal("index")
      return this.res.render.args[0][1].copy.partnerType.should.equal(
        "galleries"
      )
    })
  })

  return describe("#galleries_institutions", function () {
    beforeEach(function () {
      this.res = { render: sinon.stub(), locals: { sd: sinon.stub() } }
      this.next = sinon.stub()
      return (this.partners = [new Partner(fabricate("partner"))])
    })

    it("nexts if the city is invalid", function () {
      const req = { path: "/galleries/meow", params: { city: "meow" } }
      routes.galleries_institutions(req, this.res, this.next)
      return this.next.called.should.be.true()
    })

    return it("renders the city template", function (done) {
      const req = { path: "/galleries/new-york", params: { city: "new-york" } }
      routes.galleries_institutions(req, this.res, this.next)

      Backbone.sync.args[0][2].data.should.equal(
        "size=20&active=true&type[]=PartnerGallery&sort=sortable_id&has_full_profile=true&partnerPlural=Galleries&near=40.7127837,-74.0059413&total_count=1"
      )
      Backbone.sync.args[0][2].success(this.partners)
      return _.defer(() =>
        _.defer(() => {
          this.res.render.called.should.be.true()
          this.res.render.args[0][0].should.equal("partners")
          this.res.render.args[0][1].city.name.should.equal("New York")
          return done()
        })
      )
    })
  })
})
