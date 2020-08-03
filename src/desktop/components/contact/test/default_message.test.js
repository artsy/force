/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const Artwork = require("../../../models/artwork")
const Partner = require("../../../models/partner")
const defaultMessage = require("../default_message")

describe("defaultMessage", function () {
  beforeEach(function () {
    return (this.artwork = new Artwork({ artist: { name: "Foo Bar" } }))
  })

  describe("sans partner", () =>
    it("returns the default message", function () {
      return defaultMessage(this.artwork).should.equal(
        "Hi, I’m interested in purchasing this work. " +
          "Could you please provide more information about the piece?"
      )
    }))

  return describe("with partner", function () {
    beforeEach(function () {
      return (this.partner = new Partner())
    })

    describe("of Gallery type", function () {
      beforeEach(function () {
        return this.partner.set("type", "Gallery")
      })

      it("returns the default message", function () {
        return defaultMessage(this.artwork, this.partner).should.equal(
          "Hi, I’m interested in purchasing this work. " +
            "Could you please provide more information about the piece?"
        )
      })

      it("returns the similar message when the artwork is sold", function () {
        this.artwork.set({ availability: "sold" })
        return defaultMessage(this.artwork, this.partner).should.equal(
          "Hi, I’m interested in similar works by this artist. " +
            "Could you please let me know if you have anything available?"
        )
      })

      it("returns the similar message when the artwork is on loan", function () {
        this.artwork.set({ availability: "on loan" })
        return defaultMessage(this.artwork, this.partner).should.equal(
          "Hi, I’m interested in similar works by this artist. " +
            "Could you please let me know if you have anything available?"
        )
      })

      return it("returns nothing when the artwork is not for sale", function () {
        this.artwork.set({ availability: "not for sale" })
        return (typeof defaultMessage(this.artwork, this.partner)).should.equal(
          "undefined"
        )
      })
    })

    return describe("of Auction type", function () {
      beforeEach(function () {
        return this.partner.set("type", "Auction")
      })

      return it("returns the auction-specific message", function () {
        return defaultMessage(this.artwork, this.partner).should.equal(
          "Hello, I am interested in placing a bid on this work. " +
            "Please send me more information."
        )
      })
    })
  })
})
