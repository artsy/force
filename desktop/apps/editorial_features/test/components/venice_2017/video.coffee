_ = require 'underscore'
benv = require 'benv'
sinon = require 'sinon'
Backbone = require 'backbone'
{ resolve } = require 'path'

describe 'Venice Video', ->

  before (done) ->
    benv.setup =>
      benv.expose
        $: benv.require('jquery')
        jQuery: benv.require('jquery')
        VRView: Player: (@player = sinon.stub()).returns
          on: sinon.stub()
          play: @play = sinon.stub()
          pause: @pause = sinon.stub()
          getDuration: sinon.stub().returns 10
      Backbone.$ = $
      @options =
        asset: ->
        sd: APP_URL: 'localhost'
      benv.render resolve(__dirname, '../../../components/venice_2017/templates/index.jade'), @options, =>
        VeniceVideoView = benv.requireWithJadeify resolve(__dirname, '../../../components/venice_2017/client/video'), []
        VeniceVideoView.__set__ 'sd', APP_URL: 'localhost'
        VeniceVideoView.__set__ 'noUiSlider', create: (@scrubberCreate = sinon.stub()).returns
          on: @scrubberOn = sinon.stub()
        @view = new VeniceVideoView
          el: $('body')
          videoIndex: 1
        done()

  after ->
    benv.teardown()

  it 'sets up video', ->
    @player.args[0][0].should.equal '#vrvideo'
    @player.args[0][1].video.should.equal 'localhost/vanity/videos/scenic_mono_3.mp4'

  it 'sets up scrubber #onVRViewReady', ->
    @view.onVRViewReady()
    @scrubberCreate.args[0][1].behaviour.should.equal 'snap'
    @scrubberCreate.args[0][1].start.should.equal 0
    @scrubberCreate.args[0][1].range.min.should.equal 0
    @scrubberCreate.args[0][1].range.max.should.equal 10

  it 'toggles play', ->
    @view.vrView.isPaused = true
    @view.onTogglePlay()
    @play.callCount.should.equal 1

  it 'toggles pause', ->
    @view.vrView.isPaused = false
    @view.onTogglePlay()
    @pause.callCount.should.equal 2 # one for init
