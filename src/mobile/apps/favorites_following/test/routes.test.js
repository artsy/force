/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const { fabricate } = require("@artsy/antigravity")
const sinon = require("sinon")
const routes = require("../routes")
const Backbone = require("backbone")

describe("favorites_following", function () {
  beforeEach(function () {
    return (this.res = {
      render: (this.renderStub = sinon.stub()),
      redirect: (this.redirectStub = sinon.stub()),
      locals: { sd: {} },
    })
  })

  describe("#favorites", () =>
    it("renders the placeholder", function () {
      routes.favorites({ params: {} }, this.res)
      return this.renderStub.args[0][0].should.equal("placeholder")
    }))

  return describe("#following", function () {
    describe("logged out", function () {
      describe("implemented", () =>
        it("redirects with a redirect_uri param attached", function () {
          routes.following(
            { url: "/following/galleries", params: { type: "galleries" } },
            this.res
          )
          this.renderStub.called.should.be.false()
          return this.redirectStub.args[0][0].should.equal(
            "/log_in?redirect-to=%2Ffollowing%2Fgalleries"
          )
        }))

      return describe("not implemented", () =>
        it("renders the placeholder", function () {
          routes.following({ params: { type: "genes" } }, this.res)
          routes.following({ params: { type: "artists" } }, this.res)
          this.renderStub.args[0][0].should.equal("placeholder")
          return this.renderStub.args[1][0].should.equal("placeholder")
        }))
    })

    return describe("logged in", function () {
      describe("implemented", () =>
        it("renders the index template for galleries, institutions, profiles", function () {
          routes.following(
            { user: "existy", params: { type: "galleries" } },
            this.res
          )
          routes.following(
            { user: "existy", params: { type: "institutions" } },
            this.res
          )
          routes.following(
            { user: "existy", params: { type: "profiles" } },
            this.res
          )
          this.renderStub.args[0][0].should.equal("index")
          this.renderStub.args[1][0].should.equal("index")
          return this.renderStub.args[2][0].should.equal("index")
        }))

      return describe("not implemented", () =>
        it("renders the placeholder template for genes, artists", function () {
          routes.following(
            { user: "existy", params: { type: "genes" } },
            this.res
          )
          routes.following(
            { user: "existy", params: { type: "artists" } },
            this.res
          )
          this.renderStub.args[0][0].should.equal("placeholder")
          return this.renderStub.args[1][0].should.equal("placeholder")
        }))
    })
  })
})
