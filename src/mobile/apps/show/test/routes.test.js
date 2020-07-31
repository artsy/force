/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const _ = require("underscore")
const benv = require("benv")
const sinon = require("sinon")
const routes = require("../routes")
const Backbone = require("backbone")
const { fabricate } = require("@artsy/antigravity")
const Show = require("../../../models/show")
const Location = require("../../../models/location")

describe("Show Routes", function () {
  before(function (done) {
    return benv.setup(() => {
      sinon.stub(Backbone, "sync")
      this.req = { params: { id: "show-foo-bar" } }
      this.res = { render: sinon.stub(), locals: { sd: {} } }
      return done()
    })
  })

  after(function () {
    Backbone.sync.restore()
    return benv.teardown()
  })

  return describe("renders the show page", () =>
    xit("#index", function () {
      routes.index(this.req, this.res)
      Backbone.sync.args[0][1]
        .url()
        .should.containEql("/api/v1/show/show-foo-bar")
      Backbone.sync.args[1][1].url.should.containEql(
        "/api/v1/partner_show/show-foo-bar/images"
      )
      Backbone.sync.args[0][2].success(
        fabricate("show", { name: "Foo at the Bar" })
      )
      Backbone.sync.args[1][2].success(fabricate("show_install_shot"))
      return _.defer(() =>
        _.defer(() => {
          Backbone.sync.args[3][2].url.should.containEql(
            "/api/v1/partner/gagosian5/show/gagosian-gallery-inez-and-vinoodh2/artworks"
          )
          this.res.render.args[0][0].should.equal("index")
          return this.res.render.args[0][1].show
            .get("name")
            .should.equal("Foo at the Bar")
        })
      )
    }))
})
