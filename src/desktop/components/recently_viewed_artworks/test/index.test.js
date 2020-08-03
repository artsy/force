/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const _ = require("underscore")
const sinon = require("sinon")
const rewire = require("rewire")
const RecentlyViewedArtworks = rewire("../index")
RecentlyViewedArtworks.__set__("Cookies", {
  set: sinon.stub(),
  get: sinon.stub().returns(JSON.stringify([4, 5, 6])),
})

describe("Recently Viewed Artworks", function () {
  describe("#setCookie", () =>
    it("sets the artwork id into the cookie", function () {
      RecentlyViewedArtworks.setCookie("catty-artwork")
      const cookieArgs = RecentlyViewedArtworks.__get__("Cookies").set.args[0]
      cookieArgs[0].should.equal("recently-viewed-artworks")
      return cookieArgs[1].should.equal('["catty-artwork",4,5,6]')
    }))

  return describe("#artworkIdsForRail", function () {
    it("returns the cookie value when logged out", function () {
      RecentlyViewedArtworks.__set__("CurrentUser", {
        orNull() {
          return null
        },
      })
      return RecentlyViewedArtworks.__artworkIdsForTest().then(data =>
        data.should.eql([4, 5, 6])
      )
    })

    return describe("when logged in", function () {
      beforeEach(() =>
        RecentlyViewedArtworks.__set__("CurrentUser", {
          orNull() {
            return true
          },
        })
      )

      it("returns the artwork ids associated with the user", function () {
        const metaphysicsStub = sinon
          .stub()
          .returns(
            Promise.resolve({ me: { recentlyViewedArtworkIds: [1, 2, 3] } })
          )
        RecentlyViewedArtworks.__set__("metaphysics", metaphysicsStub)
        return RecentlyViewedArtworks.__artworkIdsForTest().then(data =>
          data.should.eql([1, 2, 3])
        )
      })

      return it("returns the cookie value if there are no artworks associated", function () {
        const metaphysicsStub = sinon
          .stub()
          .returns(Promise.resolve({ me: { recentlyViewedArtworkIds: [] } }))
        RecentlyViewedArtworks.__set__("metaphysics", metaphysicsStub)
        return RecentlyViewedArtworks.__artworkIdsForTest().then(data =>
          data.should.eql([4, 5, 6])
        )
      })
    })
  })
})
