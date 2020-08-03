/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const _ = require("underscore")
const { resolve } = require("path")
const benv = require("benv")
const Backbone = require("backbone")
const sinon = require("sinon")
const Notifications = require("../../../../collections/notifications.coffee")
let SidebarView = null
const { stubChildClasses } = require("../../../../test/helpers/stubs")

describe("SidebarView", function () {
  before(done =>
    benv.setup(function () {
      benv.expose({
        $: benv.require("jquery"),
        jQuery: benv.require("jquery"),
        matchMedia() {
          return {
            media: "",
            matches: false,
            addListener() {
              return null
            },
            removeListener() {
              return null
            },
          }
        },
      })
      Backbone.$ = $
      SidebarView = require("../../client/sidebar.coffee")
      return done()
    })
  )

  after(() => benv.teardown())

  beforeEach(function (done) {
    sinon.stub(Backbone, "sync")
    const artists = {}
    const artist1 = {
      get() {
        return { name: "Kina", id: "kina-abe", published_artworks_count: 4 }
      },
    }
    const artist2 = {
      get() {
        return { name: "Kana", id: "kana-abe", published_artworks_count: 5 }
      },
    }
    artists.models = [artist1, artist2]
    return benv.render(
      resolve(__dirname, "../../templates/index.jade"),
      { sd: { FOLLOWING: artists }, asset() {} },
      () => {
        let mod
        this.SidebarView = mod = benv.requireWithJadeify(
          resolve(__dirname, "../../client/sidebar.coffee"),
          ["filterArtistTemplate"]
        )
        this.filterState = new Backbone.Model({
          forSale: false,
          artist: null,
          loading: true,
          empty: false,
        })
        sinon.stub(this.SidebarView.prototype, "setupSearch")
        this.view = new this.SidebarView({
          el: $("#notifications-filter"),
          filterState: this.filterState,
        })
        this.SidebarView.__set__("grid", {
          setupReactGrid() {
            return "hello"
          },
        })
        return done()
      }
    )
  })

  afterEach(() => Backbone.sync.restore())

  return describe("#toggleArtist, #clearArtistWorks", function () {
    it("selects the artist when clicked", function () {
      this.view
        .$(".filter-artist[data-artist=kina-abe] .filter-artist-name")
        .click()
      return this.view
        .$(".filter-artist[data-artist=kina-abe]")
        .attr("data-state")
        .should.containEql("selected")
    })

    it("clears artist and shows feed without for_sale selected", function () {
      this.view
        .$(".filter-artist[data-artist=kina-abe] .filter-artist-name")
        .click()
      this.view
        .$(".filter-artist[data-artist=kina-abe] .filter-artist-clear")
        .click()
      this.view.filterState.get("forSale").should.be.false()
      return this.view.filterState.has("artist").should.be.false()
    })

    it("clears artist and shows feed with for_sale selected", function () {
      this.view
        .$(".filter-artist[data-artist=kina-abe] .filter-artist-name")
        .click()
      this.view
        .$(".filter-artist[data-artist=kina-abe] .filter-artist-clear")
        .click()
      return this.view.filterState.has("artist").should.be.false()
    })

    it("sets filterState with for_sale filter off", function () {
      this.view.filterState.set("forSale", false)
      this.view
        .$(".filter-artist[data-artist=kina-abe] .filter-artist-name")
        .click()
      this.view.filterState.get("forSale").should.be.false()
      return this.view.filterState.get("artist").should.equal("kina-abe")
    })

    return it("sets filterState with for_sale filter on", function () {
      this.view.filterState.set("forSale", true)
      this.view
        .$(".filter-artist[data-artist=kina-abe] .filter-artist-name")
        .click()
      this.view.filterState.get("forSale").should.be.true()
      return this.view.filterState.get("artist").should.equal("kina-abe")
    })
  })
})
