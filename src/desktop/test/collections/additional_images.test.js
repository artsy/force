/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * DS103: Rewrite code to no longer use __guard__, or convert again using --optional-chaining
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const _ = require("underscore")
const AdditionalImages = require("../../collections/additional_images")

describe("AdditionalImages", function () {
  beforeEach(function () {
    return (this.collection = new AdditionalImages(
      [
        { id: _.uniqueId() },
        { id: _.uniqueId(), is_default: true },
        { id: _.uniqueId() },
      ],
      { parse: true }
    ))
  })

  describe("#parse", function () {
    it("should put the default in the first position", function () {
      this.collection.first().get("position").should.equal(0)
      return this.collection.first().get("is_default").should.be.true()
    })

    return it("soaks up missing data", function () {
      this.collection.set([{}])
      return this.collection.parse()
    })
  })

  describe("#default", () =>
    it("returns the default image", function () {
      return this.collection.default().get("is_default").should.be.true()
    }))

  describe("setActive", () =>
    it("sets the active image", function () {
      __guard__(this.collection.first().get("is_active"), x =>
        x.should.be.false()
      )
      this.collection.setActive(this.collection.first().id)
      this.collection.first().get("is_active").should.be.true()
      this.collection.setActive(this.collection.last().id)
      this.collection.first().get("is_active").should.be.false()
      return this.collection.last().get("is_active").should.be.true()
    }))

  return describe("#active", () =>
    describe("with an active image", function () {
      beforeEach(function () {
        return this.collection.setActive(this.collection.first().id)
      })

      return it("returns the active image", function () {
        return this.collection.active().get("is_active").should.be.true()
      })
    }))
})

function __guard__(value, transform) {
  return typeof value !== "undefined" && value !== null
    ? transform(value)
    : undefined
}
