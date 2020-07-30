/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const _ = require("underscore")
const benv = require("benv")
const sinon = require("sinon")
const Backbone = require("backbone")
const Curation = require("../../../../../models/curation.coffee")
const Article = require("../../../../../models/article")
const markdown = require("../../../../../components/util/markdown.coffee")
const { resolve } = require("path")

xdescribe("Venice Video", function () {
  beforeEach(function (done) {
    return benv.setup(() => {
      benv.expose({
        $: benv.require("jquery"),
        jQuery: benv.require("jquery"),
        moment: require("moment"),
        crop: sinon.stub(),
        markdown,
        VRView: {
          Player: (this.player = sinon.stub()).returns({
            on: sinon.stub(),
            play: (this.play = sinon.stub()),
            pause: (this.pause = sinon.stub()),
            getDuration: sinon.stub().returns(100),
            iframe: { src: "" },
            setVolume: (this.setVolume = sinon.stub()),
            setCurrentTime: (this.setCurrentTime = sinon.stub()),
          }),
        },
      })
      Backbone.$ = $
      $.fn.fadeOut = sinon.stub()
      $.fn.fadeIn = sinon.stub()
      this.clock = sinon.useFakeTimers()
      this.options = {
        asset() {},
        sd: { APP_URL: "localhost" },
        videoIndex: 0,
        curation: new Curation({
          sub_articles: [],
          description: "description",
          sections: [
            {
              description: "description",
              cover_image: "",
            },
          ],
        }),
        sub_articles: [],
        videoGuide: new Article({ id: "123", title: "Video Guide" }),
      }
      return benv.render(
        resolve(
          __dirname,
          "../../../components/venice_2017/templates/index.jade"
        ),
        this.options,
        () => {
          const VeniceVideoView = benv.requireWithJadeify(
            resolve(__dirname, "../../../components/venice_2017/client/video"),
            []
          )
          VeniceVideoView.__set__("sd", { APP_URL: "localhost" })
          VeniceVideoView.__set__("noUiSlider", {
            create: (this.scrubberCreate = sinon.stub()).returns({
              on: (this.on = sinon.stub()),
              set: sinon.stub(),
            }),
          })
          VeniceVideoView.__set__("analyticsHooks", {
            trigger: (this.analytics = sinon.stub()),
          })
          this.view = new VeniceVideoView({
            el: $("body"),
            video: "/vanity/videos/scenic_mono_3.mp4",
          })
          this.view.trigger = sinon.stub()
          return done()
        }
      )
    })
  })

  afterEach(function () {
    this.clock.restore()
    return benv.teardown()
  })

  it("sets up video", function () {
    this.player.args[0][0].should.equal("#vrvideo")
    return this.player.args[0][1].video.should.equal(
      "/vanity/videos/scenic_mono_3.mp4"
    )
  })

  it("sets up scrubber #onVRViewReady", function () {
    this.view.onVRViewReady()
    this.scrubberCreate.args[0][1].behaviour.should.equal("snap")
    this.scrubberCreate.args[0][1].start.should.equal(0)
    this.scrubberCreate.args[0][1].range.min.should.equal(0)
    return this.scrubberCreate.args[0][1].range.max.should.equal(100)
  })

  it("emits an error if the browser is not supported", function () {
    this.view.onVRViewError({ message: "Sorry, browser not supported" })
    this.view.trigger.args[0][0].should.equal("videoError")
    return this.view.trigger.args[0][1].should.equal(
      "Sorry, browser not supported"
    )
  })

  it("does not try to update scrubber while dragging", function () {
    this.view.onVRViewReady()
    this.on.args[0][1]()
    return this.view.scrubbing.should.be.true()
  })

  it("sets the time on scrubber change", function () {
    this.view.onVRViewReady()
    this.on.args[1][1]([12])
    this.setCurrentTime.args[0][0].should.equal(12)
    return this.view.scrubbing.should.be.false()
  })

  it("toggles play", function () {
    this.view.vrView.isPaused = true
    this.view.onTogglePlay()
    return this.play.callCount.should.equal(1)
  })

  it("toggles pause", function () {
    this.view.vrView.isPaused = false
    this.view.onTogglePlay()
    return this.pause.callCount.should.equal(1)
  })

  it("toggles mute", function () {
    this.view.onToggleMute()
    this.setVolume.callCount.should.equal(1)
    return this.setVolume.args[0][0].should.equal(0)
  })

  it("toggles unmute", function () {
    $("#togglemute").attr("data-state", "muted").addClass("muted")
    this.view.onToggleMute()
    this.setVolume.callCount.should.equal(1)
    return this.setVolume.args[0][0].should.equal(1)
  })

  it("toggles completed cover on video completion", function () {
    this.view.onVRViewReady()
    this.view.updateTime({ currentTime: 100 })
    return this.view.trigger.args[1][0].should.eql("videoCompleted")
  })

  it("swaps the video", function () {
    this.view.swapVideo({ video: "videourl" })
    return this.view.vrView.iframe.src.should.eql(
      "localhost/vanity/vrview/index.html?video=videourl&is_stereo=false&is_vr_off=false&loop=false"
    )
  })

  it("contructs an iframe src", function () {
    const src = this.view.createIframeSrc("http://video.com/url")
    return src.should.equal(
      "localhost/vanity/vrview/index.html?video=http://video.com/url&is_stereo=false&is_vr_off=false&loop=false"
    )
  })

  it("updateTime sets the scrubber", function () {
    this.view.onVRViewReady()
    this.view.updateTime({ currentTime: 25 })
    return this.view.scrubber.set.args[0][0].should.equal(25)
  })

  it("tracks duration in percentage and seconds", function () {
    this.view.onVRViewReady()
    this.view.updateTime({ currentTime: 26 })
    this.analytics.args[0][0].should.equal("video:seconds")
    this.analytics.args[0][1].seconds.should.equal("3")
    this.analytics.args[1][0].should.equal("video:seconds")
    this.analytics.args[1][1].seconds.should.equal("10")
    this.analytics.args[2][0].should.equal("video:duration")
    this.analytics.args[2][1].duration.should.equal("25%")
    this.view.updateTime({ currentTime: 51 })
    this.analytics.args[3][0].should.equal("video:duration")
    this.analytics.args[3][1].duration.should.equal("50%")
    this.view.updateTime({ currentTime: 76 })
    this.analytics.args[4][0].should.equal("video:duration")
    this.analytics.args[4][1].duration.should.equal("75%")
    this.view.updateTime({ currentTime: 100 })
    this.analytics.args[5][0].should.equal("video:duration")
    return this.analytics.args[5][1].duration.should.equal("100%")
  })

  it("triggers closeVideo", function () {
    $(".venice-video__close").click()
    return this.view.trigger.args[0][0].should.equal("closeVideo")
  })

  it("adds time to the scrubber", function () {
    $("body").append('<div class="noUi-handle"></div>')
    this.view.onVRViewReady()
    this.view.updateTime({ currentTime: 26 })
    return this.view.$time.text().should.equal("00:26")
  })

  it("#fadeInControls", function () {
    this.view.isMobile = true
    this.view.fadeInControls()
    return $.fn.fadeIn.callCount.should.equal(1)
  })

  return it("#fadeOutControls", function () {
    this.view.isMobile = true
    this.view.fadeOutControls()
    this.clock.tick(3000)
    return $.fn.fadeOut.callCount.should.equal(1)
  })
})
