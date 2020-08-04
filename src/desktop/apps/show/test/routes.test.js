/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const _ = require("underscore")
const sinon = require("sinon")
const Backbone = require("backbone")
const PartnerShow = require("../../../models/partner_show")
const { fabricate } = require("@artsy/antigravity")
const routes = require("../routes")

xdescribe("Show route", function () {
  beforeEach(function () {
    this.req = { get: sinon.stub(), params: { id: "foobar" } }
    this.res = {
      render: sinon.stub(),
      redirect: sinon.stub(),
      locals: { sd: {} },
    }
    this.next = sinon.stub()
    return sinon.stub(Backbone, "sync")
  })

  afterEach(() => Backbone.sync.restore())

  return describe("#index", function () {
    it('fetches everything and renders the "index" template', function (done) {
      routes.index(this.req, this.res)

      Backbone.sync.args[0][1].url().should.containEql("/api/v1/show/foobar")
      Backbone.sync.args[0][2].success(
        _.extend(fabricate("show"), {
          id: "foobar",
          partner: { id: "foobar-partner" },
        })
      )

      Backbone.sync.args[1][1].url.should.containEql(
        "/api/v1/partner_show/foobar/images"
      )
      Backbone.sync.args[1][2].success([])

      return _.defer(() =>
        _.defer(() => {
          Backbone.sync.args[2][1]
            .url()
            .should.containEql("/api/v1/partner/foobar-partner/show/foobar")
          Backbone.sync.args[2][2].data.should.have.keys(["cacheBust"])
          Backbone.sync.args[2][2].success()
          Backbone.sync.args[3][1]
            .url()
            .should.containEql("/show/foobar/artworks?published=true")
          Backbone.sync.args[3][2].success([])

          return _.defer(() =>
            _.defer(() => {
              this.res.render.called.should.be.true()
              this.res.render.args[0][0].should.equal("index")

              return done()
            })
          )
        })
      )
    })

    return describe("with a fair", function () {
      beforeEach(function () {
        this.fair = _.extend(fabricate("fair"))
        return (this.show = _.extend(fabricate("show"), {
          fair: this.fair,
          id: "foobar",
          partner: { id: "foobar-partner" },
        }))
      })

      it("should fetch the fair profile", function (done) {
        routes.index(this.req, this.res, this.next)

        Backbone.sync.args[0][2].success(this.show)
        Backbone.sync.args[1][2].success([])

        return _.defer(() =>
          _.defer(() => {
            Backbone.sync.args[2][2].success()
            Backbone.sync.args[3][2].success([])

            return _.defer(() =>
              _.defer(() => {
                Backbone.sync.args[4][1].id.should.equal("the-armory-show")

                return done()
              })
            )
          })
        )
      })

      return it("should mark the fair as unpublished if the profile fetch fails", function (done) {
        routes.index(this.req, this.res, this.next)

        Backbone.sync.args[0][2].success(this.show)
        Backbone.sync.args[1][2].success([])

        return _.defer(() =>
          _.defer(() => {
            Backbone.sync.args[2][2].success()
            Backbone.sync.args[3][2].success([])

            return _.defer(() =>
              _.defer(() => {
                Backbone.sync.args[4][1].id.should.equal("the-armory-show")
                Backbone.sync.args[4][2].error([])

                this.res.render.args[0][1]["fair"]
                  .get("published")
                  .should.equal(false)

                return done()
              })
            )
          })
        )
      })
    })
  })
})
