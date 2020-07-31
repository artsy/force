/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const normalizeSynonyms = require("../normalize_synonyms.coffee")

describe("normalizeSynonyms", function () {
  it("reduces each set of synonyms to the first one in the list", () =>
    normalizeSynonyms([["st", "saint"]], "saint ives").should.equal("st ives"))

  it("replaces synonyms regardless of case", () =>
    normalizeSynonyms([["st", "saint"]], "Saint Ives").should.equal("st Ives"))

  it("ignores synonyms when they are substrings of other words", function () {
    normalizeSynonyms([["st", "saint"]], "East Bay").should.equal("East Bay")
    return normalizeSynonyms([["st", "saint"]], "Saintsburg").should.equal(
      "Saintsburg"
    )
  })

  it("reduces multiple sets of synonyms by iterating over each synonym list", function () {
    normalizeSynonyms(
      [
        ["st", "saint"],
        ["harbor", "harbour"],
      ],
      "saint ives"
    ).should.equal("st ives")
    normalizeSynonyms(
      [
        ["st", "saint"],
        ["harbor", "harbour"],
      ],
      "bal harbour"
    ).should.equal("bal harbor")
    return normalizeSynonyms(
      [
        ["st", "saint"],
        ["harbor", "harbour"],
      ],
      "saint ives harbour"
    ).should.equal("st ives harbor")
  })

  return it("does nothing for empty synonym lists", function () {
    normalizeSynonyms(undefined, "saint ives").should.equal("saint ives")
    normalizeSynonyms(null, "saint ives").should.equal("saint ives")
    return normalizeSynonyms([], "saint ives").should.equal("saint ives")
  })
})
