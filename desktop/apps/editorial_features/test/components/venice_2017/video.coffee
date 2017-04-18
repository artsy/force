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
        VRView: Player: @player = sinon.stub()
      Backbone.$ = $
      @options =
        asset: ->
        sd: APP_URL: 'localhost'
      benv.render resolve(__dirname, '../../../components/venice_2017/templates/index.jade'), @options, =>
        { VeniceVideoView } = mod = benv.requireWithJadeify resolve(__dirname, '../../../components/venice_2017/video'), []
        mod.__set__ 'sd', APP_URL: 'localhost'
        @view = new VeniceVideoView
          el: $('body')
          videoIndex: 1
        done()

  after ->
    benv.teardown()

  it 'sets up video', ->
    @player.args[0][0].should.equal '#vrvideo'
    @player.args[0][1].video.should.equal 'localhost/vanity/videos/scenic_mono_3.mp4'