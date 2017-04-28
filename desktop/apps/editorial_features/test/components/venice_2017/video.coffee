_ = require 'underscore'
benv = require 'benv'
sinon = require 'sinon'
Backbone = require 'backbone'
Curation = require '../../../../../models/curation.coffee'
{ resolve } = require 'path'

describe 'Venice Video', ->

  beforeEach (done) ->
    benv.setup =>
      benv.expose
        $: benv.require('jquery')
        jQuery: benv.require('jquery')
        moment: require 'moment'
        VRView: Player: (@player = sinon.stub()).returns
          on: sinon.stub()
          play: @play = sinon.stub()
          pause: @pause = sinon.stub()
          getDuration: sinon.stub().returns 100
          iframe: src: ''
          setVolume: @setVolume = sinon.stub()
          getCurrentTime: @getCurrentTime = sinon.stub()
          setCurrentTime: @setCurrentTime = sinon.stub()
      Backbone.$ = $
      @options =
        asset: ->
        sd: APP_URL: 'localhost'
        videoIndex: 0
        curation: new Curation
          sub_articles: []
          description: 'description'
          sections: [
            {
              description: 'description'
              cover_image: ''
            }
          ]
      benv.render resolve(__dirname, '../../../components/venice_2017/templates/index.jade'), @options, =>
        VeniceVideoView = benv.requireWithJadeify resolve(__dirname, '../../../components/venice_2017/client/video'), []
        VeniceVideoView.__set__ 'sd', APP_URL: 'localhost'
        VeniceVideoView.__set__ 'noUiSlider', create: (@scrubberCreate = sinon.stub()).returns
          on: @on = sinon.stub()
          set: sinon.stub()
        VeniceVideoView.__set__ 'analyticsHooks', trigger: @analytics = sinon.stub()
        @view = new VeniceVideoView
          el: $('body')
          video: '/vanity/videos/scenic_mono_3.mp4'
        @view.trigger = sinon.stub()
        done()

  afterEach ->
    benv.teardown()

  it 'sets up video', ->
    @player.args[0][0].should.equal '#vrvideo'
    @player.args[0][1].video.should.equal '/vanity/videos/scenic_mono_3.mp4'

  it 'sets up scrubber #onVRViewReady', ->
    @view.onVRViewReady()
    @scrubberCreate.args[0][1].behaviour.should.equal 'snap'
    @scrubberCreate.args[0][1].start.should.equal 0
    @scrubberCreate.args[0][1].range.min.should.equal 0
    @scrubberCreate.args[0][1].range.max.should.equal 100

  it 'does not try to update scrubber while dragging', ->
    @view.onVRViewReady()
    @on.args[0][1]()
    @view.scrubbing.should.be.true()

  it 'sets the time on scrubber change', ->
    @view.onVRViewReady()
    @on.args[1][1]([12])
    @setCurrentTime.args[0][0].should.equal 12
    @view.scrubbing.should.be.false()

  it 'toggles play', ->
    @view.vrView.isPaused = true
    @view.onTogglePlay()
    @play.callCount.should.equal 1

  it 'toggles pause', ->
    @view.vrView.isPaused = false
    @view.onTogglePlay()
    @pause.callCount.should.equal 1

  it 'toggles mute', ->
    @view.onToggleMute()
    @setVolume.callCount.should.equal 1
    @setVolume.args[0][0].should.equal 0

  it 'toggles unmute', ->
    $('#togglemute').attr('data-state', 'muted').addClass 'muted'
    @view.onToggleMute()
    @setVolume.callCount.should.equal 1
    @setVolume.args[0][0].should.equal 1

  it 'toggles completed cover on video completion', ->
    @view.onVRViewReady()
    @view.updateTime(currentTime: 100)
    @view.trigger.args[1][0].should.eql 'videoCompleted'

  it 'swaps the video', ->
    @view.swapVideo video: 'videourl'
    @view.vrView.iframe.src.should.eql 'localhost/vanity/vrview/index.html?video=videourl&is_stereo=false&is_vr_off=false&loop=false'

  it 'contructs an iframe src', ->
    src = @view.createIframeSrc 'http://video.com/url'
    src.should.equal 'localhost/vanity/vrview/index.html?video=http://video.com/url&is_stereo=false&is_vr_off=false&loop=false'

  it 'updateTime sets the scrubber', ->
    @view.onVRViewReady()
    @view.updateTime(currentTime: 25)
    @view.scrubber.set.args[0][0].should.equal 25

  it 'tracks drop off time', ->
    @view.vrView.getCurrentTime = sinon.stub().returns 25
    @view.onVRViewReady()
    window.onbeforeunload()
    @analytics.args[0][0].should.equal 'video:dropoff'
    @analytics.args[0][1].dropoff.should.equal 25

  it 'tracks duration as a percentage', ->
    @view.onVRViewReady()
    @view.updateTime(currentTime: 26)
    @analytics.args[0][0].should.equal 'video:duration'
    @analytics.args[0][1].duration.should.equal '25%'
    @view.updateTime(currentTime: 51)
    @analytics.args[1][0].should.equal 'video:duration'
    @analytics.args[1][1].duration.should.equal '50%'
    @view.updateTime(currentTime: 76)
    @analytics.args[2][0].should.equal 'video:duration'
    @analytics.args[2][1].duration.should.equal '75%'
    @view.updateTime(currentTime: 100)
    @analytics.args[3][0].should.equal 'video:duration'
    @analytics.args[3][1].duration.should.equal '100%'

  it 'triggers closeVideo', ->
    $('.venice-video__close').click()
    @view.trigger.args[0][0].should.equal 'closeVideo'