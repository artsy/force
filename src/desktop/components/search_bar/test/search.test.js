/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const Search = require("../collections/search")

describe("Search", function () {
  beforeEach(function () {
    return (this.items = [
      { owner_type: "PartnerGallery" },
      { owner_type: "PartnerInstitution" },
      { foo: "bar" },
    ])
  })

  describe("#url", function () {
    it("has the correct url", function () {
      const search = new Search()
      search.url().should.containEql("/api/v1/match?visible_to_public=true")
      return search.url().should.containEql("term=%QUERY")
    })

    it("can be used with multiple match endpoints", function () {
      const search = new Search({ mode: "profiles" })
      return search
        .url()
        .should.containEql("/api/v1/match/profiles?visible_to_public=true")
    })

    return it("takes a fair_id", function () {
      const search = new Search({ mode: "profiles", fairId: "fair-id" })
      return search
        .url()
        .should.containEql(
          "/api/v1/match/profiles?visible_to_public=true&fair_id=fair-id"
        )
    })
  })

  return describe("#parse", function () {
    it("casts items as SearchResults", function () {
      const search = new Search()
      const parsed = search.parse(this.items)
      return parsed[0].constructor.name.should.equal("SearchResult")
    })

    it("can restrict the results by type based on the owner_type", function () {
      const search = new Search({
        mode: "profiles",
        restrictType: "PartnerGallery",
      })
      const parsed = search.parse(this.items)
      parsed.length.should.equal(1)
      return parsed[0].get("model").should.equal("profile")
    })

    it("can restrict the results by multiple owner_types", function () {
      const search = new Search({
        mode: "profiles",
        restrictType: ["PartnerInstitution", "PartnerInstitutionalSeller"],
      })
      this.items.push({ owner_type: "PartnerInstitutionalSeller" })
      const parsed = search.parse(this.items)
      parsed.length.should.equal(2)
      return parsed[0].get("model").should.equal("profile")
    })

    it("can return heterogeneous results", function () {
      const search = new Search()
      const parsed = search.parse(this.items)
      return parsed.length.should.equal(this.items.length)
    })

    return it("can flatten out aggregations", function () {
      const search = new Search()
      const items = { auction: this.items, artist: this.items }
      const parsed = search.parse(items, { aggregations: true })
      parsed[0].get("displayHeading").should.equal(true)
      return parsed[0].get("category").should.equal("Artists")
    })
  })
})
