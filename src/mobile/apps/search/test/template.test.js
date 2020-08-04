/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const benv = require("benv")
const _ = require("underscore")
const jade = require("jade")
const path = require("path")
const fs = require("fs")
const Backbone = require("backbone")
const { fabricate } = require("@artsy/antigravity")
const SearchResults = require("../../../collections/search_results")
const SearchResult = require("../../../models/search_result")
const sinon = require("sinon")

const { resolve } = require("path")

describe("Search results template", function () {
  before(done =>
    benv.setup(function () {
      benv.expose({ $: benv.require("jquery") })
      Backbone.$ = $
      sinon.stub(Backbone, "sync")
      return done()
    })
  )

  after(function () {
    Backbone.sync.restore()
    return benv.teardown()
  })

  beforeEach(function () {
    return (this.search = new SearchResults())
  })

  describe("No results", function () {
    beforeEach(function (done) {
      return (this.template = benv.render(
        resolve(__dirname, "../template.jade"),
        {
          sd: {},
          results: [],
          mainHeaderSearchBoxValue: "foobar",
        },
        () => done()
      ))
    })

    return it("displays a message to the user that nothing can be found", () =>
      $("body").html().should.containEql("Nothing found"))
  })

  return describe("Has results", function () {
    beforeEach(function (done) {
      this.artworks = _.times(
        2,
        i =>
          new SearchResult({
            title: "Artwork Title | Artist | Artsy",
            model: "artwork",
            display_model: "Artwork",
            id: "cool-artwork" + i,
            image_url: "foo.jpg",
          })
      )
      this.artists = _.times(
        3,
        i =>
          new SearchResult({
            title: "Artist Name | Artsy",
            model: "artist",
            display_model: "Artist",
            id: "cool-artist" + i,
            image_url: "bar.jpg",
          })
      )

      this.search.add(this.artworks)
      this.search.add(this.artists)

      return (this.template = benv.render(
        resolve(__dirname, "../template.jade"),
        {
          sd: {},
          results: this.search.models,
          mainHeaderSearchBoxValue: "foobar",
        },
        () => done()
      ))
    })

    return it("renders the search results", () =>
      $(".search-result").length.should.equal(5))
  })
})
