/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const _ = require("underscore")
const benv = require("benv")
const sinon = require("sinon")
const Backbone = require("backbone")
const CurrentUser = require("../../../models/current_user")
const fixtures = require("../../../test/helpers/fixtures.coffee")
const sd = require("sharify").data
const { resolve } = require("path")
const { fabricate } = require("@artsy/antigravity")
const { stubChildClasses } = require("../../../test/helpers/stubs")

describe("ImageSetView", function () {
  beforeEach(function (done) {
    return benv.setup(() => {
      benv.expose({
        $: benv.require("jquery"),
        jQuery: benv.require("jquery"),
        _s: benv.require("underscore.string"),
      })
      Backbone.$ = $
      $.fn.imagesLoaded = function () {}
      this.ImageSetView = benv.requireWithJadeify(
        resolve(__dirname, "../client/image_set"),
        ["template"]
      )
      this.ImageSetView.__set__("Image", function () {})
      this.ImageSetView.__set__("resize", url => url)
      this.ImageSetView.__set__("Follow", {
        Following: sinon.stub(),
        FollowButton: sinon.stub(),
      })
      this.flickity = {
        navigation: {
          flickity: {
            select: (this.select = sinon.stub()),
            next: (this.next = sinon.stub()),
            previous: (this.previous = sinon.stub()),
          },
        },
      }
      this.ImageSetView.__set__(
        "initCarousel",
        sinon.stub().returns(this.flickity)
      )
      stubChildClasses(
        this.ImageSetView,
        this,
        ["addFollowButton", "setupFollowButtons"],
        []
      )
      this.user = sinon.stub()
      this.collection = [
        {
          type: "image",
          caption: "This is a caption",
          url: "http://image.com/img.png",
        },
        {
          type: "artwork",
          artist: { name: "Van Gogh", slug: "van-gogh" },
          partner: { name: "Partner Gallery" },
          title: "Starry Night",
          image: "http://partnergallery.com/image.png",
          slug: "van-gogh-starry-night",
          date: "1999",
        },
      ]
      sinon.stub(Backbone, "sync")
      this.view = new this.ImageSetView({
        el: $("body"),
        items: this.collection,
        user: this.user,
        startIndex: 0,
        _s,
      })
      this.view.carousel = this.flickity
      return done()
    })
  })

  afterEach(function () {
    benv.teardown()
    return Backbone.sync.restore()
  })

  describe("slideshow is functional", function () {
    it("iterates to the next page on next", function () {
      this.view.next()
      return this.next.called.should.be.true()
    })

    it("loops back to the beginning on last image", function () {
      this.view.next()
      this.view.next()
      return this.next.callCount.should.equal(2)
    })

    return it("iterates to previous page on previous", function () {
      this.view.next()
      this.view.previous()
      this.next.callCount.should.equal(1)
      return this.previous.callCount.should.equal(1)
    })
  })

  return describe("#render", function () {
    it("renders a regular image", function () {
      this.view.render()
      this.view.$el.html().should.containEql("1/2")
      this.view.$el.html().should.containEql("This is a caption")
      return this.view.$el.html().should.containEql("http://image.com/img.png")
    })

    return it("renders an artwork on next()", function () {
      this.view.render()
      this.view.next()
      this.view.$el.html().should.containEql("2/2")
      this.view.$el.html().should.containEql("Starry Night")
      this.view.$el.html().should.containEql("Partner Gallery")
      this.view.$el.html().should.containEql("van-gogh-starry-night")
      this.view.$el.html().should.containEql("1999")
      return this.view.$el
        .html()
        .should.containEql("http://partnergallery.com/image.png")
    })
  })
})
