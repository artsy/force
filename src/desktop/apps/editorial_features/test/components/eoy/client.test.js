/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const _ = require("underscore")
const benv = require("benv")
const sinon = require("sinon")
const Backbone = require("backbone")
const { resolve } = require("path")
const fixtures = require("../../../../../test/helpers/fixtures")
const Curation = require("../../../../../models/curation.coffee")
const Article = require("../../../../../models/article.coffee")
const Articles = require("../../../../../collections/articles.coffee")
const { resize } = require("../../../../../components/resizer")
const markdown = require("../../../../../components/util/markdown.coffee")

const sd = require("sharify").data

xdescribe("EoyView", function () {
  before(function (done) {
    return benv.setup(() => {
      benv.expose({ $: benv.require("jquery"), jQuery: benv.require("jquery") })
      Backbone.$ = $
      $.fn.imagesLoaded = sinon.stub()
      this.waypoint = $.waypoints = sinon.stub()
      $.fn.waypoint = sinon.stub()
      window.matchMedia = sinon.stub().returns({ matches: true })
      $.fn.scrollY = sinon.stub().returns(0)
      $.fn.scrollTop = this.scrollTop = sinon.stub().returns(845)
      $.fn.resize = sinon.stub()
      sinon.stub(Backbone, "sync")
      this.curation = new Curation({
        _id: "5829db77b5989e6f98f779a5",
        intro:
          "Article Intro statement: Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Vestibulum id ligula porta felis euismod semper. Curabitur blandit tempus porttitor.",
        header_video:
          "https://artsy-media-uploads.s3.amazonaws.com/yB2-P7P5J3v1rihLw1v8nQ%2FUrmhuJUpFOnZ52kc8DUJsg-paintbrushes_slow_1200.mp4",
        name: "Year In Art 2016",
        type: "editorial-feature",
        sections: [
          {
            headline: "The Artist Becomes Political",
            callout: "Lorum Ipsum",
            body:
              "In 2016, artists have produced work urging us to not simply look at painful current events we might rather ignore, but to go further—to imagine a better future. Perhaps the most prominent and controversial has been artist and activist Ai Weiwei, who made the Syrian refugee crisis the subject of his artistic practice this year, even setting up a studio on the Greek island of Lesbos where many come ashore, seeking refuge.\r\n\r\nAi provoked criticism when he posed in a black and white image that showed the artist prostrate on a Turkish beach, his body replacing that of drowned Syrian toddler Aylan Kurdi, who was the subject of a viral news photo. Both detractors and champions of Ai’s rendition shared it widely across social media, and for a brief moment, the all-too-quickly repressed struggle faced by migrants once again made headlines. Ai even brought the crisis to the United States with “Laundromat,” an installation at New York’s Deitch Projects of thousands of pristine and folded garments collected from an abandoned refugee camp. The thesis is simple: if we look, we will act. It goes to show art isn’t simply political—art can change politics.",
            image:
              "https://artsy-media-uploads.s3.amazonaws.com/WU6t2X-XoeBlY1KWVOQbdQ%2FAW_01.jpg",
            caption: "Installation view of Carrie Mae Weems.",
            image_second:
              "https://artsy-media-uploads.s3.amazonaws.com/Aw572XiO__5T0T-Tc0j4SA%2FF+Lotus%2C+2016.mp4",
            caption_second: "Lorum Ipsum caption",
          },
          {
            headline: "headline 2",
            image_second:
              "https://artsy-media-uploads.s3.amazonaws.com/WU6t2X-XoeBlY1KWVOQbdQ%2FAW_01.mp4",
            image:
              "https://artsy-media-uploads.s3.amazonaws.com/WU6t2X-XoeBlY1KWVOQbdQ%2FAW_01.jpg",
          },
          {
            headline: "headline 3",
            image_second:
              "https://artsy-media-uploads.s3.amazonaws.com/WU6t2X-XoeBlY1KWVOQbdQ%2FAW_01.jpg",
            image:
              "https://artsy-media-uploads.s3.amazonaws.com/WU6t2X-XoeBlY1KWVOQbdQ%2FAW_01.jpg",
          },
          {
            image:
              "https://artsy-media-uploads.s3.amazonaws.com/WU6t2X-XoeBlY1KWVOQbdQ%2FAW_01.jpg",
            image_second:
              "https://artsy-media-uploads.s3.amazonaws.com/WU6t2X-XoeBlY1KWVOQbdQ%2FAW_01.mp4",
            headline: "headline 4",
          },
          {
            image:
              "https://artsy-media-uploads.s3.amazonaws.com/WU6t2X-XoeBlY1KWVOQbdQ%2FAW_01.jpg",
            image_second:
              "https://artsy-media-uploads.s3.amazonaws.com/WU6t2X-XoeBlY1KWVOQbdQ%2FAW_01.jpg",
            headline: "headline 5",
          },
          {
            image:
              "https://artsy-media-uploads.s3.amazonaws.com/WU6t2X-XoeBlY1KWVOQbdQ%2FAW_01.jpg",
            image_second:
              "https://artsy-media-uploads.s3.amazonaws.com/WU6t2X-XoeBlY1KWVOQbdQ%2FAW_01.jpg",
            headline: "headline 6",
          },
          {
            image:
              "https://artsy-media-uploads.s3.amazonaws.com/WU6t2X-XoeBlY1KWVOQbdQ%2FAW_01.jpg",
            image_second:
              "https://artsy-media-uploads.s3.amazonaws.com/WU6t2X-XoeBlY1KWVOQbdQ%2FAW_01.jpg",
            headline: "headline 7",
          },
          {
            image:
              "https://artsy-media-uploads.s3.amazonaws.com/WU6t2X-XoeBlY1KWVOQbdQ%2FAW_01.jpg",
            image_second:
              "https://artsy-media-uploads.s3.amazonaws.com/WU6t2X-XoeBlY1KWVOQbdQ%2FAW_01.jpg",
            headline: "headline 8",
          },
          {
            image:
              "https://artsy-media-uploads.s3.amazonaws.com/WU6t2X-XoeBlY1KWVOQbdQ%2FAW_01.jpg",
            image_second:
              "https://artsy-media-uploads.s3.amazonaws.com/WU6t2X-XoeBlY1KWVOQbdQ%2FAW_01.jpg",
            headline: "headline 9",
          },
          {
            image:
              "https://artsy-media-uploads.s3.amazonaws.com/WU6t2X-XoeBlY1KWVOQbdQ%2FAW_01.jpg",
            image_second:
              "https://artsy-media-uploads.s3.amazonaws.com/WU6t2X-XoeBlY1KWVOQbdQ%2FAW_01.jpg",
            headline: "headline 10",
          },
        ],
      })
      sd.CURATION = this.curation.toJSON()
      this.options = {
        curation: this.curation,
        article: new Article(fixtures.article),
        superSubArticles: new Articles(),
        sd,
        markdown,
        asset() {},
      }
      return benv.render(
        resolve(__dirname, "../../../components/eoy/templates/index.jade"),
        this.options,
        () => {
          let mod
          const { EoyView } = (mod = benv.requireWithJadeify(
            resolve(__dirname, "../../../components/eoy/client"),
            ["bodyView"]
          ))
          mod.__set__("initCarousel", (this.carousel = sinon.stub()))
          this.playVideo = sinon.stub(EoyView.prototype, "playVideo")
          const boundaryArray = [
            4931.6875,
            6317.1875,
            9595.125,
            12164.203125,
            14924.03125,
            18523.484375,
            21394.359375,
            24569.453125,
            27352.703125,
            29895.953125,
            32703.140625,
            35213.125,
            35293.125,
          ]
          this.getBodySectionTopBoundaries = sinon
            .stub(EoyView.prototype, "getBodySectionTopBoundaries")
            .returns(boundaryArray)

          this.view = new EoyView({
            curation: this.curation,
            el: $("body"),
          })
          this.view.windowPosition = 0
          this.view.windowHeight = 900
          return done()
        }
      )
    })
  })

  after(function () {
    benv.teardown()
    return Backbone.sync.restore()
  })

  describe("#initialize", function () {
    it("renders content from curation and superarticle", function () {
      $(".scroller__items section").should.have.lengthOf(12)
      return $(".article-sa-sticky-header").should.have.lengthOf(1)
    })

    return it("closes all scroller sections on load", () =>
      $(".scroller__items section[data-state=open]").should.have.lengthOf(0))
  })

  describe("#watchWindow", () =>
    it("resets section boundaries when window changes size", function () {
      $(window).resize()
      $.fn.resize.args[0][0]()
      return this.getBodySectionTopBoundaries.callCount.should.equal(2)
    }))

  describe("#getScrollZones", () =>
    it("returns an array of heights that corresponds to each section", function () {
      const zones = this.view.getScrollZones()
      zones[0].should.equal(845)
      zones[1].should.equal(1413)
      zones[2].should.equal(1961)
      zones[3].should.equal(2509)
      zones[4].should.equal(3057)
      zones[5].should.equal(3605)
      zones[6].should.equal(4153)
      zones[7].should.equal(4701)
      zones[8].should.equal(5249)
      zones[9].should.equal(5797)
      return zones[10].should.equal(6345)
    }))

  describe("#closestSection", () =>
    it("returns the section closest to where user scrolls", function () {
      this.view.closestSection(0, this.view.getScrollZones()).should.equal(0)
      return this.view
        .closestSection(3000, this.view.getScrollZones())
        .should.equal(4)
    }))

  describe("#doSlider", () =>
    it("opens containers on scroll", function () {
      this.view.doSlider($(window).scrollTop())
      $(".scroller__items section[data-section=0]").height().should.equal(0)
      return $(
        ".scroller__items section[data-state=open]"
      ).should.have.lengthOf(3)
    }))

  describe("#animateBody", () =>
    it("adds a class to the closest section", function () {
      this.view.animateBody(10000)
      $('.article-body section[data-section="1"]')
        .hasClass("active")
        .should.not.be.true()
      return $('.article-body section[data-section="2"]')
        .hasClass("active")
        .should.be.true()
    }))

  describe("#setupVideos", () =>
    xit("calls play video for each video", function () {
      this.view.setupVideos()
      $(".video-controls").waypoint.args[4][0]()
      $(".video-controls").waypoint.args[5][0]()
      $(".video-controls").waypoint.args[6][0]()
      return $(".video-controls").waypoint.callCount.should.equal(7)
    }))

  describe("#watchScrolling", function () {
    it("handles the top of the page", function () {
      this.scrollTop.returns(0)
      this.view.openHeight = -1
      this.view.watchScrolling()
      $('.scroller__items section[data-section="1"]')
        .data("state")
        .should.equal("closed")
      return $('.scroller__items section[data-section="0"]')
        .data("state")
        .should.equal("open")
    })

    it("handles the middle of the body", function () {
      this.view.doSlider = sinon.stub()
      this.scrollTop.returns(100)
      this.view.openHeight = 300
      this.view.watchScrolling()
      this.view.doSlider.callCount.should.equal(1)
      return this.view.doSlider.reset()
    })

    return it("handles the bottom of the page", function () {
      this.view.animateBody = sinon.stub()
      this.scrollTop.returns(9000)
      this.view.watchScrolling()
      this.view.animateBody.callCount.should.equal(1)
      return this.view.animateBody.reset()
    })
  })

  describe("#setupSliderHeight", function () {
    it("sets height based on position", function () {
      this.view.windowHeight = 900
      this.view.setupSliderHeight()
      this.view.containerHeight.should.equal(845)
      this.view.activeHeight.should.equal(548)
      return this.view.openHeight.should.equal(6948)
    })

    return it("sets up heights for the scroller", function () {
      this.view.setupSliderHeight()
      $(".scroller__items section[data-section=0]").height().should.equal(845)
      this.view.containerHeight.should.equal(845)
      this.view.activeHeight.should.equal(548)
      return this.view.openHeight.should.equal(6948)
    })
  })

  describe("#deferredLoadBody", () =>
    it("loads the body contents", function () {
      return $(this.view.el)
        .html()
        .should.containEql("In 2016, artists have produced work urging us")
    }))

  describe("#bodyInView", () =>
    it("sets waypoints", function () {
      this.view.bodyInView()
      $(".article-body").waypoint.args[1][1].offset.should.equal("50%")
      $(".article-body").waypoint.args[2][1].offset.should.equal("100%")
      return $(".article-body").waypoint.args[3][1].offset.should.equal("0")
    }))

  return describe("#setupCarousel", () =>
    it("calls initCarousel", function () {
      this.view.setupCarousel()
      return this.carousel.callCount.should.equal(1)
    }))
})
