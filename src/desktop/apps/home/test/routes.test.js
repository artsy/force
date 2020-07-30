/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const sinon = require("sinon")
const Backbone = require("backbone")
const { extend } = require("underscore")
const { fabricate } = require("@artsy/antigravity")
const rewire = require("rewire")
const routes = rewire("../routes")
const Items = require("../../../collections/items")

const heroUnit = {
  title_image_url:
    "https://d32dm0rphc51dk.cloudfront.net/o8z4tRzTn3ObRWxvLg3L0g/untouched-png.png",
  retina_title_image_url:
    "https://d32dm0rphc51dk.cloudfront.net/o8z4tRzTn3ObRWxvLg3L0g/untouched-png.png",
  background_image_url:
    "https://d32dm0rphc51dk.cloudfront.net/lOFraLWi5vCJJl2FqnzMKA/untouched-jpg.jpg",
  mode: "LEFT_LIGHT",
  title: "Heritage: Trending Contemporary (Jan 2017)",
  subtitle: "My hero",
  link_text: "Bid Now",
  credit_line:
    "Bjarne Melgaard, The times never will be there again, 2012; Courtesy of Heritage Auctions.",
}

describe("Home routes", function () {
  beforeEach(function () {
    sinon.stub(Backbone, "sync")
    routes.__set__("metaphysics", (this.metaphysics = sinon.stub()))
    this.metaphysics.debug = sinon.stub()

    this.req = {
      body: {},
      query: {},
      get: (this.getStub = sinon.stub()),
      cookies: {},
    }

    this.res = {
      locals: { sd: {} },
      render: sinon.stub(),
      redirect: sinon.stub(),
      cookie: (this.cookieStub = sinon.stub()),
    }

    return (this.user = {
      hasLabFeature() {
        return false
      },
    })
  })

  afterEach(() => Backbone.sync.restore())

  return describe("#index", function () {
    describe("handles failed services gracefully", () =>
      it("passes empty featured links fetch fails", function () {
        this.metaphysics.returns(
          Promise.resolve({
            home_page: {
              hero_units: [heroUnit],
              artwork_modules: [],
            },
          })
        )
        Backbone.sync.onCall(0).yieldsTo("error")
        return routes.index(extend(this.user, this.req), this.res).then(() => {
          this.res.render.args[0][0].should.equal("index")
          return this.res.render.args[0][1].featuredLinks.length.should.equal(0)
        })
      }))

    describe("logged out", function () {
      describe("first time", () =>
        it("renders the home page with hero units + welcome hero unit at the front", function () {
          this.metaphysics.returns(
            Promise.resolve({ home_page: { hero_units: [heroUnit] } })
          )
          Backbone.sync
            .onCall(0)
            .yieldsTo("success", [fabricate("featured_link")])

          return routes.index(this.req, this.res).then(() => {
            this.res.render.args[0][0].should.equal("index")
            this.res.render.args[0][1].heroUnits[0].subtitle.should.equal(
              "Sign up to get updates on your favorite artists"
            )
            this.res.render.args[0][1].heroUnits[1].subtitle.should.equal(
              "My hero"
            )
            this.res.cookie.args[0][0].should.equal("hide-welcome-hero")
            return this.res.cookie.args[0][1].should.equal("1")
          })
        }))

      return describe("after first time", () =>
        it("renders the home page with hero units + welcome hero unit at the end", function () {
          this.req.cookies = { "hide-welcome-hero": "1" }

          this.metaphysics.returns(
            Promise.resolve({ home_page: { hero_units: [heroUnit] } })
          )
          Backbone.sync
            .onCall(0)
            .yieldsTo("success", [fabricate("featured_link")])
          return routes.index(this.req, this.res).then(() => {
            this.res.render.args[0][0].should.equal("index")
            return this.res.render.args[0][1].heroUnits[1].subtitle.should.equal(
              "Sign up to get updates on your favorite artists"
            )
          })
        }))
    })

    return describe("logged in", function () {
      beforeEach(function () {
        return (this.req.user = this.user)
      })

      it("renders the homepage without the welcome hero unit", function () {
        this.metaphysics.returns(
          Promise.resolve({
            home_page: {
              hero_units: [heroUnit],
              artwork_modules: [],
            },
          })
        )
        Backbone.sync
          .onCall(0)
          .yieldsTo("success", [fabricate("featured_link")])
        return routes.index(this.req, this.res).then(() => {
          this.res.render.args[0][0].should.equal("index")
          return this.res.render.args[0][1].heroUnits[0].subtitle.should.equal(
            "My hero"
          )
        })
      })

      it("with lab feature, does not fetch hero units, featured links, or followed artists rail", function () {
        this.user.hasLabFeature = () => true
        this.metaphysics.returns(
          Promise.resolve({
            home_page: {
              artwork_modules: [
                { key: "followed_artists" },
                { key: "recommended_works" },
              ],
            },
          })
        )
        return routes.index(this.req, this.res).then(() => {
          this.res.render.args[0][0].should.equal("index")
          return this.res.render.args[0][1].modules[0].key.should.equal(
            "followed_artists"
          )
        })
      })

      return it("catches error fetching homepage rails and still renders hero units", function () {
        const err = new Error("Failed to get rails")
        err.data = { home_page: { hero_units: [heroUnit] } }
        this.metaphysics.returns(Promise.reject(err))
        Backbone.sync
          .onCall(0)
          .yieldsTo("success", [fabricate("featured_link")])
        return routes.index(this.req, this.res).then(() => {
          this.res.render.args[0][0].should.equal("index")
          return this.res.render.args[0][1].heroUnits[0].subtitle.should.equal(
            "My hero"
          )
        })
      })
    })
  })
})
