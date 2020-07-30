/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const imageUrl = require("../index")

describe("imageUrl", function () {
  it("returns the correct URL (artwork)", () =>
    decodeURIComponent(imageUrl("artwork", "foobar")).should.containEql(
      "/api/v1/artwork/foobar/default_image.jpg"
    ))

  it("returns the correct URL (show)", function () {
    decodeURIComponent(imageUrl("partnershow", "foobar")).should.containEql(
      "/api/v1/partner_show/foobar/default_image.jpg"
    )
    return decodeURIComponent(
      imageUrl("partner_show", "foobar")
    ).should.containEql("/api/v1/partner_show/foobar/default_image.jpg")
  })

  it("returns the correct URL (profile)", () =>
    decodeURIComponent(imageUrl("profile", "foobar")).should.containEql(
      "/api/v1/profile/foobar/image"
    ))

  return it("returns the correct URL (artist)", () =>
    decodeURIComponent(imageUrl("artist", "foobar")).should.containEql(
      "/api/v1/artist/foobar/image"
    ))
})
