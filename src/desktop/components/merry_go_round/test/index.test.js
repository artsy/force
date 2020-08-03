/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const _ = require("underscore")
const benv = require("benv")
const rewire = require("rewire")
const Backbone = require("backbone")
const sinon = require("sinon")
const existy = _.negate(_.isUndefined)
const initCarousel = rewire("../index")
const bottomNavTemplate = require("jade").compileFile(
  require.resolve("../templates/bottom_navigation.jade")
)
const horizontalNavTemplate = require("jade").compileFile(
  require.resolve("../templates/horizontal_navigation.jade")
)

xdescribe("MerryGoRound", function () {
  before(done =>
    benv.setup(function () {
      let MerryGoRoundFlickity
      benv.expose({ $: benv.require("jquery"), jQuery: benv.require("jquery") })
      $.fn.imagesLoaded = cb => cb()
      Backbone.$ = $

      const flickity = () => ({
        on() {},
        selectedIndex: 0,

        cells: [
          { target: {} },
          { target: {} },
          { target: {} },
          { target: {} },
          { target: {} },
        ],

        next() {},
        previous() {},
        select() {},

        selectedCell: { target: {} },

        getLastCell() {
          return { target: {} }
        },
        options: {},
      })

      const stub = (MerryGoRoundFlickity = class MerryGoRoundFlickity {
        constructor() {
          this.flickity = flickity()
        }
      })

      initCarousel.__set__("MerryGoRoundFlickity", stub)

      $("body").html(`\
<div class='js-carousel'> \
<div class='js-mgr-cells'> \
<div class='js-mgr-cell'></div> \
<div class='js-mgr-cell'></div> \
<div class='js-mgr-cell'></div> \
</div> \
<nav class='js-mgr-navigation'></nav> \
</div>\
`)
      return done()
    })
  )

  after(() => benv.teardown())

  describe("#initCarousel", function () {
    it("sets up the carousel", function () {
      const instance = initCarousel($(".js-carousel"), {
        template: bottomNavTemplate,
      })
      existy(instance.cells).should.be.true()
      return existy(instance.navigation).should.be.true()
    })

    it("pre-renders the navigation", function () {
      const instance = initCarousel($(".js-carousel"), {
        template: bottomNavTemplate,
      })
      const html = instance.navigation.$el.html()
      html.should.containEql("mgr-arrow-left")
      html.should.containEql("mgr-dots")
      return html.should.containEql("mgr-arrow-right")
    })

    it("accepts a template", function () {
      const instance = initCarousel($(".js-carousel"), {
        template: horizontalNavTemplate,
      })
      const html = instance.navigation.$el.html()
      html.should.containEql("mgr-arrow-left")
      html.should.not.containEql("mgr-dots")
      return html.should.containEql("mgr-arrow-right")
    })

    it("accepts a callback", () =>
      initCarousel(
        $(".js-carousel"),
        { template: bottomNavTemplate },
        function (instance) {
          existy(instance.cells).should.be.true()
          return existy(instance.navigation).should.be.true()
        }
      ))

    return it("returns without an error if there is no $el", function () {
      initCarousel($(".sorry"))
      return _.isUndefined(initCarousel()).should.be.true()
    })
  })

  describe("view", function () {
    beforeEach(function () {
      let cells
      ;({ navigation: this.navigation, cells } = initCarousel(
        $(".js-carousel"),
        { template: bottomNavTemplate }
      ))
      return ({ flickity: this.flickity } = cells)
    })

    it("isStart", function () {
      this.navigation.isStart().should.be.true()
      this.flickity.selectedIndex = 1
      return this.navigation.isStart().should.be.false()
    })

    it("isEnd", function () {
      this.navigation.isEnd().should.be.false()

      this.flickity.selectedIndex = 4
      this.navigation.isEnd().should.be.true()

      this.navigation.advanceBy = 3
      this.flickity.selectedIndex = 1
      this.navigation.isEnd().should.be.false()

      this.navigation.advanceBy = 3
      this.flickity.selectedIndex = 2
      return this.navigation.isEnd().should.be.true()
    })

    return describe("next", function () {
      beforeEach(function () {
        sinon.stub(this.flickity, "select")
        return sinon.stub(this.flickity, "next")
      })

      afterEach(function () {
        this.flickity.select.restore()
        return this.flickity.next.restore()
      })

      it("advances by specified amount", function () {
        this.navigation.advanceBy = 2
        this.navigation.next({ preventDefault() {} })
        return this.flickity.select.args[0][0].should.eql(2)
      })

      it("otherwise advances by one", function () {
        this.navigation.next({ preventDefault() {} })
        return this.flickity.next.called.should.be.true()
      })

      it("does nothing if last cell and not wrapAround", function () {
        this.flickity.selectedIndex = 4
        this.navigation.next({ preventDefault() {} })
        this.flickity.select.called.should.be.false()
        return this.flickity.next.called.should.be.false()
      })

      return it("advances past the end if wrapAround is true", function () {
        this.flickity.options.wrapAround = true

        this.flickity.selectedIndex = 4
        this.navigation.next({ preventDefault() {} })
        this.flickity.next.called.should.be.true()

        this.flickity.selectedIndex = 4
        this.navigation.advanceBy = 2
        this.navigation.next({ preventDefault() {} })
        return this.flickity.select.args[0][0].should.eql(6)
      })
    })
  })

  return describe("option `imagesLoaded` is `true`", () =>
    it("returns a thennable", () =>
      initCarousel($(".js-carousel"), {
        imagesLoaded: true,
        template: bottomNavTemplate,
      }).then(function (instance) {
        existy(instance.cells).should.be.true()
        return existy(instance.navigation).should.be.true()
      })))
})
