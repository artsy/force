/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const { fabricate } = require("@artsy/antigravity")
const rewire = require("rewire")
const SearchResult = rewire("../../models/search_result.coffee")
const Fair = require("../../models/fair.coffee")
const moment = require("moment")

describe("SearchResult", function () {
  describe("#initialize", function () {
    describe("#location", function () {
      it("has a location attribute when it is an artwork", function () {
        const model = new SearchResult(
          fabricate("artwork", { model: "artwork" })
        )
        return model.href().should.containEql("/artwork/skull")
      })

      it("has a location attribute when it is a show", function () {
        const model = new SearchResult(
          fabricate("show", { model: "partnershow" })
        )
        return model
          .href()
          .should.containEql("/show/gagosian-gallery-inez-and-vinoodh")
      })

      it("has a location attribute when it is a profile", function () {
        const model = new SearchResult(
          fabricate("profile", { model: "profile" })
        )
        return model.href().should.equal("/alessandra")
      })

      it("has a location attribute when it is an article", function () {
        const model = new SearchResult(
          fabricate("article", { model: "article" })
        )
        return model.href().should.containEql("/article/" + model.get("slug"))
      })

      it("has a location attribute when it is a page", function () {
        const model = new SearchResult(fabricate("page", { model: "page" }))
        return model.href().should.containEql("/" + model.get("slug"))
      })

      it("has a location attribute when it is a fair", function () {
        const model = new SearchResult(
          fabricate("fair", { model: "fair", profile_id: "foo-profile" })
        )
        return model.href().should.containEql("/foo-profile")
      })

      it("has a location attribute when it is a city", function () {
        const model = new SearchResult({ model: "city", id: "gotham" })
        return model.href().should.containEql("/shows/gotham")
      })

      return it("has a location attribute when it is a page with a custom href", function () {
        const model = new SearchResult({
          model: "page",
          id: "blah",
          href: "http://example.com",
        })
        return model.href().should.equal("http://example.com")
      })
    })

    describe("#displayModel", function () {
      it("has a display_model attribute when it is a artwork", function () {
        const model = new SearchResult(
          fabricate("artwork", { model: "artwork" })
        )
        return model.get("display_model").should.equal("Artwork")
      })

      it("has a display_model attribute when it is a show", function () {
        const model = new SearchResult(
          fabricate("show", { model: "partnershow" })
        )
        return model.get("display_model").should.equal("Show")
      })

      it("has a display_model attribute when it is a gene", function () {
        const model = new SearchResult({ model: "gene" })
        return model.get("display_model").should.equal("Category")
      })

      it("has a display_model attribute when it is an article", function () {
        const model = new SearchResult({ model: "article" })
        return model.get("display_model").should.equal("Article")
      })

      it("has a display_model attribute when it is a page", function () {
        const model = new SearchResult({ model: "page" })
        return model.get("display_model").should.equal("Page")
      })

      it("has a display_model attribute when it is a profile", function () {
        const model = new SearchResult({ model: "profile" })
        return model.get("display_model").should.equal("Gallery")
      })

      it("has a display_model attribute when it an institution profile", function () {
        const model = new SearchResult({
          model: "profile",
          owner_type: "PartnerInstitution",
        })
        return model.get("display_model").should.equal("Institution")
      })

      it("has a display_model attribute when it an institution seller profile", function () {
        const model = new SearchResult({
          model: "profile",
          owner_type: "PartnerInstitutionalSeller",
        })
        return model.get("display_model").should.equal("Institution")
      })

      return it("has a display_model attribute when it fair profile", function () {
        const model = new SearchResult({
          model: "profile",
          owner_type: "FairOrganizer",
        })
        return model.get("display_model").should.equal("Fair")
      })
    })

    return describe("#imageUrl", function () {
      it("has a image url attribute when it an Artist", function () {
        const model = new SearchResult({ model: "artist", image_url: "foo" })
        return model.imageUrl().should.equal("foo")
      })

      return it("has a default artsy icon thumnbnail when it a Page", function () {
        const model = new SearchResult({ model: "page" })
        return model.imageUrl().should.equal("/images/icon-70.png")
      })
    })
  })

  describe("#updateForFair", () =>
    it("cleans up data returned from fair search API", function () {
      const fair = new Fair(fabricate("fair"))
      const modelA = new SearchResult(
        fabricate("show", { model: "partnershow" })
      )
      const modelB = new SearchResult(fabricate("artist", { model: "artist" }))

      modelA.updateForFair(fair)
      modelB.updateForFair(fair)

      modelA.get("display_model").should.equal("Booth")
      modelA.href().should.containEql("/show/gagosian-gallery-inez-and-vinoodh")
      return modelB
        .href()
        .should.containEql("/the-armory-show/browse/artist/pablo")
    }))

  describe("#formatArticleAbout", () =>
    it("constructs about based on publish time and excerpt", function () {
      const article = fabricate("article", {
        model: "article",
        display: "Foo Article",
        description: "Lorem Ipsum.",
        published_at: new Date("2-2-2014").toISOString(),
      })

      const result = new SearchResult(article)
      result.displayModel().should.equal("Article")
      return result.about().should.equal("Feb 2nd, 2014 ... Lorem Ipsum.")
    }))

  describe("#formatEventAbout", () =>
    it("constructs a human readable event description", function () {
      const fair = fabricate("fair", {
        model: "fair",
        display: "Foo Fair",
        start_at: new Date("10-5-2015").toISOString(),
        end_at: new Date("10-10-2015").toISOString(),
        city: "New York",
      })
      const result = new SearchResult(fair)
      return result
        .about()
        .should.equal(
          "Art fair running from Oct 5th to Oct 10th, 2015 in New York"
        )
    }))

  describe("#formatShowAbout", function () {
    it("constructs a show description for a partner show with artists", function () {
      const show = fabricate("show", {
        model: "partnershow",
        display: "Foo Exhibition",
        start_at: new Date("10-5-2015 12:00:00").toISOString(),
        end_at: new Date("10-10-2015 12:00:00").toISOString(),
        artist_names: ["Banksy"],
        address: "401 Broadway",
        venue: "Foo Gallery",
        city: "New York",
      })
      const result = new SearchResult(show)
      return result
        .about()
        .should.equal(
          "Past show featuring works by Banksy at Foo Gallery New York, 401 Broadway Oct 5th – 10th 2015"
        )
    })

    it("constructs a show description for a fair booth", function () {
      const show = fabricate("show", {
        model: "partnershow",
        display: "Foo Exhibition",
        start_at: new Date("10-5-2015 12:00:00").toISOString(),
        end_at: new Date("10-10-2015 12:00:00").toISOString(),
        venue: "Foo Fair",
        fair_id: "foo-fair",
        city: "New York",
      })
      const result = new SearchResult(show)
      return result
        .about()
        .should.equal(
          "Past fair booth at Foo Fair New York Oct 5th – 10th 2015"
        )
    })

    it("uses a profile description", function () {
      const profile = fabricate("profile", {
        model: "profile",
        id: "foo-gallery",
        display: "Foo Gallery",
        description: "A description of foo gallery",
      })

      const result = new SearchResult(profile)
      return result.about().should.equal("A description of foo gallery")
    })

    return describe("#formatCityAbout", () =>
      it("uses a standard template", function () {
        const result = new SearchResult({
          model: "city",
          display: "Gotham",
          id: "gotham",
        })
        return result
          .about()
          .should.equal("Browse current exhibitions in Gotham")
      }))
  })

  return describe("#status", function () {
    it("correctly detects closed event status", function () {
      const show = fabricate("show", {
        model: "partnershow",
        start_at: new Date("10-5-2015").toISOString(),
        end_at: new Date("10-10-2015").toISOString(),
      })

      const result = new SearchResult(show)
      return result.status().should.equal("closed")
    })

    it("correctly detects upcoming event status", function () {
      const show = fabricate("show", {
        model: "partnershow",
        start_at: moment().add(2, "days").format(),
        end_at: moment().add(8, "days").format(),
      })

      const result = new SearchResult(show)
      return result.status().should.equal("upcoming")
    })

    return it("correctly detects running event status", function () {
      const show = fabricate("show", {
        model: "partnershow",
        start_at: moment().subtract(2, "days").format(),
        end_at: moment().add(2, "days").format(),
      })

      const result = new SearchResult(show)
      return result.status().should.equal("running")
    })
  })
})
