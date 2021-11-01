import { uniqueId } from "lodash"
const { AdditionalImages } = require("../additional_images")

describe("AdditionalImages", () => {
  let collection

  beforeEach(() => {
    collection = new AdditionalImages(
      [
        { id: uniqueId("foo") },
        { id: uniqueId("foo"), is_default: true },
        { id: uniqueId("foo") },
      ],
      { parse: true }
    )
  })

  describe("#parse", () => {
    it("should put the default in the first position", () => {
      collection.first().get("position").should.equal(0)
      collection.first().get("is_default").should.be.true()
    })

    it("soaks up missing data", () => {
      collection.set([{}])
      collection.parse()
    })
  })

  describe("#default", () => {
    it("returns the default image", () => {
      collection.default().get("is_default").should.be.true()
    })
  })

  describe("setActive", () => {
    it("sets the active image", () => {
      expect(collection.first().get("is_active")).toBeFalsy()
      collection.setActive(collection.first().id)
      collection.first().get("is_active").should.be.true()
      collection.setActive(collection.last().id)
      collection.first().get("is_active").should.be.false()
      collection.last().get("is_active").should.be.true()
    })
  })

  describe("#active", () => {
    describe("with an active image", () => {
      beforeEach(() => {
        collection.setActive(collection.first().id)
      })

      it("returns the active image", () => {
        collection.active().get("is_active").should.be.true()
      })
    })
  })
})
