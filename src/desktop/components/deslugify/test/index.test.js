/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const deslugify = require("../index")

describe("deslugify", function () {
  it("deals with reasonable slugs", function () {
    deslugify("gagosian-gallery").should.equal("Gagosian Gallery")
    deslugify("simon-lee-gallery").should.equal("Simon Lee Gallery")
    return deslugify("joseph-k-levene-fine-art-ltd").should.equal(
      "Joseph K Levene Fine Art Ltd"
    )
  })

  it("deals with trailing numbers", function () {
    deslugify("whitney-museum-of-american-art1").should.equal(
      "Whitney Museum Of American Art"
    )
    deslugify("whitney-museum-of-american-art-1").should.equal(
      "Whitney Museum Of American Art"
    )
    deslugify("whitney-museum-of-american-art-82").should.equal(
      "Whitney Museum Of American Art"
    )
    deslugify("whitney-museum-of-american-art_999").should.equal(
      "Whitney Museum Of American Art"
    )
    return deslugify("1-whitney-museum-of-american-art_999").should.equal(
      "1 Whitney Museum Of American Art"
    )
  })

  it("handles special cases", () =>
    deslugify("film-video").should.equal("Film / Video"))

  it("handles slugs with symbol words in them", function () {
    deslugify("fleisher-slash-ollman").should.equal("Fleisher / Ollman")
    deslugify("bernarducci-dot-meisel-gallery").should.equal(
      "Bernarducci.Meisel Gallery"
    )
    return deslugify("m-plus-b").should.equal("M + B")
  })

  return it("pluralizes years that end in 0", function () {
    deslugify("1970").should.equal("1970s")
    deslugify("2000").should.equal("2000s")
    deslugify("2010").should.equal("2010s")
    return deslugify("1979").should.equal("1979")
  })
})
