_ = require 'underscore'
benv = require 'benv'
sinon = require 'sinon'
Backbone = require 'backbone'
{ resolve } = require 'path'

describe 'Venice Main', ->

  before (done) ->
    benv.setup =>
      benv.expose
        $: benv.require('jquery')
        jQuery: benv.require('jquery')
      Backbone.$ = $
      @options =
        asset: ->
        sd: APP_URL: 'localhost'
      benv.render resolve(__dirname, '../../../components/venice_2017/templates/index.jade'), @options, =>
        VeniceView = benv.requireWithJadeify resolve(__dirname, '../../../components/venice_2017/client/index'), []
        VeniceView.__set__ 'sd', APP_URL: 'localhost'
        VeniceView.__set__ 'VeniceVideoView', @VeniceVideoView = sinon.stub().returns
          vrView: play: @play = sinon.stub()
        @view = new VeniceView
          el: $('body')
        done()

  after ->
    benv.teardown()

  it 'initializes VeniceVideoView', ->
    @VeniceVideoView.args[0][0].el.selector.should.equal '.venice-video'

  it '#fadeOutCover', ->
    $('.venice-overlay__play').click()
    @play.callCount.should.equal 1