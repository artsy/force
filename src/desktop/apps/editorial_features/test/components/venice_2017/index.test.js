/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const _ = require("underscore")
const benv = require("benv")
const sinon = require("sinon")
const Backbone = require("backbone")
const Article = require("../../../../../models/article")
const Curation = require("../../../../../models/curation.coffee")
const { resolve } = require("path")
const markdown = require("../../../../../components/util/markdown.coffee")

describe("Venice Main", function () {
  beforeEach(function (done) {
    return benv.setup(() => {
      let crop
      benv.expose({
        $: benv.require("jquery"),
        jQuery: benv.require("jquery"),
        window: {
          history: { replaceState: (this.replaceState = sinon.stub()) },
          innerHeight: 900,
        },
        moment: require("moment"),
        markdown,
        crop: (crop = sinon.stub().returns("http://artsy.net/image.jpg")),
      })
      Backbone.$ = $
      $.fn.fadeOut = this.fadeOut = sinon.stub()
      this.animateSpy = sinon.spy($.fn, "animate")
      this.curation = {
        description: "description",
        sub_articles: [
          {
            thumbnail_title: { "Sub 1": "Sub 1" },
            thumbnail_image: "http://artsy.net/image.jpg",
          },
          {
            thumbnail_title: { "Sub 2": "Sub 2" },
            thumbnail_image: "http://artsy.net/image2.jpg",
          },
        ],
        sections: [
          {
            description: "description",
            cover_image: "",
            video_url: "/vanity/url.mp4",
            video_url_medium: "/vanity/url-medium.mp4",
            video_url_adaptive: "/vanity/url.mpd",
            slug: "slug-one",
            artist_ids: [],
          },
          {
            description: "description2",
            cover_image: "",
            video_url: "/vanity/url2.mp4",
            video_url_medium: "/vanity/url2-medium.mp4",
            video_url_adaptive: "/vanity/url2.mpd",
            slug: "slug-two",
            published: true,
            artist_ids: [],
          },
          {
            description: "description2",
            cover_image: "",
            video_url: "/vanity/url3.mp4",
            video_url_medium: "/vanity/url3-medium.mp4",
            video_url_adaptive: "/vanity/url3.mpd",
            slug: "slug-three",
            published: true,
            artist_ids: [],
          },
        ],
      }
      this.options = {
        asset() {},
        sd: { APP_URL: "localhost" },
        videoIndex: 0,
        curation: new Curation(this.curation),
        videoGuide: new Article({ id: "123", title: "Video Guide" }),
        sub_articles: [
          {
            title: { "Sub 1": "Sub 1" },
            thumbnail_image: "http://artsy.net/image.jpg",
          },
          {
            title: { "Sub 2": "Sub 2" },
            thumbnail_image: "http://artsy.net/image2.jpg",
          },
        ],
      }
      return benv.render(
        resolve(
          __dirname,
          "../../../components/venice_2017/templates/index.jade"
        ),
        this.options,
        () => {
          const VeniceView = benv.requireWithJadeify(
            resolve(__dirname, "../../../components/venice_2017/client/index"),
            ["videoDescription"]
          )
          VeniceView.__set__("sd", {
            APP_URL: "localhost",
            VIDEO_INDEX: 0,
            CURATION: this.curation,
          })
          VeniceView.__set__(
            "VeniceVideoView",
            (this.VeniceVideoView = sinon.stub().returns({
              vrView: {
                play: (this.play = sinon.stub()),
                pause: (this.pause = sinon.stub()),
              },
              trigger: sinon.stub(),
              fadeOutControls: sinon.stub(),
            }))
          )
          VeniceView.__set__(
            "initCarousel",
            (this.initCarousel = sinon.stub().yields({
              cells: {
                flickity: {
                  on: (this.on = sinon.stub()),
                  selectedIndex: 1,
                  select: sinon.stub(),
                  next: sinon.stub(),
                },
              },
            }))
          )
          VeniceView.__set__(
            "initFooterCarousel",
            (this.initFooterCarousel = sinon.stub())
          )
          VeniceView.__set__("FlashMessage", sinon.stub())
          this.view = new VeniceView({
            el: $("body"),
          })
          return done()
        }
      )
    })
  })

  afterEach(function () {
    this.animateSpy.restore()
    return benv.teardown()
  })

  it("initializes VeniceVideoView", function () {
    this.VeniceVideoView.args[0][0].el.selector.should.equal(".venice-video")
    return this.VeniceVideoView.args[0][0].video.should.equal(
      "localhost/vanity/url.mp4"
    )
  })

  it("sets up the carousel", function () {
    this.initCarousel.args[0][0].selector.should.equal(".venice-carousel")
    this.initCarousel.args[0][1].advanceBy.should.equal(1)
    this.initCarousel.args[0][1].wrapAround.should.be.true()
    this.initCarousel.args[0][1].initialIndex.should.equal(0)
    this.initCarousel.args[0][2]({ cells: { flickity: { on() {} } } })
    return this.fadeOut.callCount.should.equal(2)
  })

  it("Sets up the footer carousel", function () {
    $(this.view.el)
      .find(".venice-footer")
      .html()
      .should.containEql('<h2 class="title">The Venice Biennale</h2>')
    $(this.view.el).find(".venice-footer .mgr-cell").length.should.eql(2)
    return $(this.view.el)
      .find(".venice-footer .mgr-cells")
      .html()
      .should.containEql('<img src="http://artsy.net/image.jpg">')
  })

  it("changes the section when flickity has settled #settleSection", function () {
    this.on.args[0][1]()
    this.on.args[0][0].should.equal("settle")
    this.view.VeniceVideoView.trigger.args[0][0].should.equal("swapVideo")
    return this.view.VeniceVideoView.trigger.args[0][1].video.should.equal(
      "localhost/vanity/url2.mp4"
    )
  })

  it("changes the section when flickity item has been selected #selectSection", function () {
    this.on.args[1][1]()
    this.on.args[1][0].should.equal("select")
    this.replaceState.args[0][1].should.equal(1)
    this.replaceState.args[0][2].should.equal("/venice-biennale/slug-two")
    return $(".venice-overlay__play").attr("data-state").should.equal("loading")
  })

  it("#fadeOutCoverAndStartVideo does not play if it is not ready", function () {
    $(".venice-overlay__play").click()
    return this.play.callCount.should.equal(0)
  })

  it("#fadeOutCoverAndStartVideo", function () {
    $(".venice-overlay__play").first().attr("data-state", "ready")
    $(".venice-overlay__play").first().click()
    this.play.callCount.should.equal(1)
    return this.view.VeniceVideoView.fadeOutControls.callCount.should.equal(1)
  })

  it("fades out controls after pressing play on mobile", function () {
    $(".venice-overlay__play").first().attr("data-state", "ready")
    this.view.parser = { getDevice: sinon.stub().returns({ type: "mobile" }) }
    $(".venice-overlay__play").first().click()
    return this.view.VeniceVideoView.fadeOutControls.callCount.should.equal(1)
  })

  it("#fadeInCoverAndPauseVideo", function () {
    this.view.fadeInCoverAndPauseVideo()
    return this.pause.callCount.should.equal(1)
  })

  it("#onVideoReady", function () {
    this.view.onVideoReady()
    return $(".venice-overlay__play").attr("data-state").should.equal("ready")
  })

  it("chooses a medium quality mp4 video for iOS", function () {
    this.view.parser = { getOS: sinon.stub().returns({ name: "iOS" }) }
    return this.view
      .chooseVideoFile()
      .should.equal("localhost/vanity/url-medium.mp4")
  })

  it("chooses an adaptive video for mobile", function () {
    this.view.parser = {
      getOS: sinon.stub().returns({ name: "Android" }),
      getDevice: sinon.stub().returns({ type: "mobile" }),
    }
    return this.view.chooseVideoFile().should.equal("localhost/vanity/url.mpd")
  })

  it("chooses a high quality video for desktop", function () {
    this.view.parser = {
      getOS: sinon.stub().returns({ name: "Mac OS" }),
      getDevice: sinon.stub().returns({ type: null }),
    }
    return this.view.chooseVideoFile().should.equal("localhost/vanity/url.mp4")
  })

  it("#onVideoCompleted fades out the video player and displays completed cover", function () {
    this.view.fadeInCoverAndPauseVideo = sinon.stub()
    this.view.onVideoCompleted()
    return this.view.fadeInCoverAndPauseVideo.callCount.should.eql(1)
  })

  it("#onNextVideo advances the carousel to the next slide", function () {
    this.view.onVideoCompleted()
    $(".venice-overlay--completed .next")[0].click()
    this.view.flickity.next.args[0][0].should.be.true()
    return this.view.flickity.next.callCount.should.equal(1)
  })

  it("#onReadMore scrolls to the video description and hides completed cover (read-more)", function () {
    this.view.onVideoCompleted()
    $(".venice-overlay--completed .read-more").click()
    this.animateSpy.args[1][0].opacity.should.eql(0)
    this.animateSpy.args[1][0]["z-index"].should.eql(-1)
    return this.animateSpy.args[2][0].scrollTop.should.eql(900)
  })

  it("#onReadMore scrolls to the video description and hides completed cover (info icon)", function () {
    this.view.onVideoCompleted()
    $(".venice-info-icon").click()
    this.animateSpy.args[1][0].opacity.should.eql(0)
    this.animateSpy.args[1][0]["z-index"].should.eql(-1)
    return this.animateSpy.args[2][0].scrollTop.should.eql(900)
  })

  return it("displays an error if there is one", function () {
    this.view.onVideoError("Sorry, your browser is not supported.")
    $(".venice-overlay__play").attr("data-state").should.equal("error")
    return $(".venice-overlay__error")
      .html()
      .should.equal("Sorry, your browser is not supported.")
  })
})
