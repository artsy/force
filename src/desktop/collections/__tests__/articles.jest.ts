import Backbone from "backbone"
import { map } from "lodash"
const fixtures = require("../../test/helpers/fixtures")
const { Articles } = require("../articles")

describe("Articles", () => {
  let articles

  beforeEach(() => {
    Backbone.sync = jest.fn()
    articles = new Articles([fixtures.articles])
  })

  describe("#feed", () => {
    it("pulls the rest of the articles not in featured", () => {
      articles.set([
        { id: "foo", tier: 1 },
        { id: "bar", tier: 1 },
        { id: "baz", tier: 2 },
        { id: "qux", tier: 1 },
        { id: "bam", tier: 2 },
      ])
      expect(map(articles.feed(), "id").join("")).toBe("barbazquxbam")
    })
  })

  describe("#featured", () => {
    it("pulls the first tier 1", () => {
      articles.set([
        { id: "foo", tier: 2 },
        { id: "bar", tier: 1 },
      ])
      expect(map(articles.featured(), "id").join("")).toBe("bar")
    })
  })

  describe("biography", () => {
    it("pulls a biography out of the articles", () => {
      articles.set([
        { id: "foo", tier: 1 },
        { id: "bar", tier: 1 },
        { biography_for_artist_id: "asdfsa", id: "baz", tier: 2 },
        { id: "qux", tier: 1 },
        { id: "bam", tier: 2 },
        { id: "moo", tier: 1 },
        { id: "boom", tier: 2 },
      ])
      articles.biography().id.should.equal("baz")
    })
  })

  describe("#orderByIds", () => {
    it("orders collection by ids give - dropping other items", () => {
      articles.set([
        { id: "foo", tier: 1 },
        { id: "bar", tier: 1 },
        { id: "boom", tier: 2 },
      ])
      articles.orderByIds(["boom", "bar", "foo"])
      articles.length.should.equal(3)
      articles.models[0].id.should.equal("boom")
      articles.models[1].id.should.equal("bar")
      articles.models[2].id.should.equal("foo")
    })
  })
})
