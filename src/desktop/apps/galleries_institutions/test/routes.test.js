/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const { fabricate } = require("@artsy/antigravity")
const _ = require("underscore")
const Q = require("bluebird-q")
const sinon = require("sinon")
const rewire = require("rewire")
const Backbone = require("backbone")
const routes = rewire("../routes")
const Profile = require("../../../models/profile.coffee")

describe("galleries_institutions routes", function () {
  beforeEach(() => sinon.stub(Backbone, "sync"))

  afterEach(() => Backbone.sync.restore())

  return context("#index", () =>
    context("fetch categorized partners", function () {
      beforeEach(function () {
        this.req = { body: {}, query: {}, params: { type: "galleries" } }
        this.res = { render: sinon.stub(), locals: { sd: {} } }
        this.next = sinon.stub()
        return (this.partner = {
          id: "arndt",
          name: "ARNDT",
          initials: "A",
          locations: [],
          profile: { id: "arndt", href: "/arndt", image: null },
        })
      })

      return it("ignores categories without partners in primary or secondary bucket", function () {
        let fetchPartnerCategories
        const partner_categories = [
          {
            name: "20th Century Design",
            id: "20th-century-design",
            primary: [this.partner],
            secondary: [this.partner, this.partner],
          },
          {
            name: "African Art",
            id: "african-art",
            primary: [],
            secondary: [],
          },
          {
            name: "Contemporary",
            id: "contemporary",
            primary: [this.partner],
            secondary: [this.partner],
          },
        ]
        routes.__set__("fetchPrimaryCarousel", () => new Backbone.Collection())
        routes.__set__(
          "fetchPartnerCategories",
          (fetchPartnerCategories = sinon.stub())
        )

        const filterPartnerCategories = routes.__get__(
          "filterPartnerCategories"
        )

        fetchPartnerCategories.returns(
          new Promise((resolve, reject) =>
            resolve(filterPartnerCategories({ partner_categories }))
          )
        )

        return routes.index(this.req, this.res, this.next).then(() => {
          this.res.render.calledOnce.should.be.ok()
          return this.res.render.args[0][1].categories.should.have.lengthOf(2)
        })
      })
    })
  )
})
