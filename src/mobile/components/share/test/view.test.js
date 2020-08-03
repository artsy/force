/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const benv = require("benv")
const Backbone = require("backbone")
const sinon = require("sinon")
const path = require("path")

describe("ShareView", function () {
  beforeEach(function (done) {
    return benv.setup(() => {
      benv.expose({ $: benv.require("jquery") })
      Backbone.$ = $
      const filename = path.resolve(__dirname, "../view.coffee")
      const ShareView = benv.requireWithJadeify(filename, ["template"])
      this.view = new ShareView({
        el: $("body"),
        imageUrl: "foo.jpg",
      })
      return done()
    })
  })

  afterEach(() => benv.teardown())

  describe("#initialize", function () {
    it("renders the menu with the imageUrl", function () {
      $(".share-toggle").click()
      return $(".share-menu").html().should.containEql("foo.jpg")
    })

    return it("renders the modal", function () {
      $(".share-toggle").click()
      return $(".share-menu-modal").css("opacity").should.equal("1")
    })
  })

  return describe("#toggleShare", function () {
    it("hides the menu", function () {
      $(".share-toggle").click()
      return $(".share-menu").hasClass("is-visible").should.be.false()
    })

    it("hides the modal", function () {
      $(".share-toggle").click()
      return $(".share-menu-modal").hasClass("is-visible").should.be.false()
    })

    return it("hides the menu when the modal is clicked", function () {
      $(".share-menu-modal").click()
      return $(".share-menu").hasClass("is-visible").should.be.false()
    })
  })
})
