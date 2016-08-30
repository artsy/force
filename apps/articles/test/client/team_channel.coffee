_ = require 'underscore'
benv = require 'benv'
sinon = require 'sinon'
rewire = require 'rewire'
Backbone = require 'backbone'
{ resolve } = require 'path'
fixtures = require '../../../../test/helpers/fixtures'
{ fabricate } = require 'antigravity'
Articles = require '../../../../collections/articles.coffee'
Channel = require '../../../../models/channel.coffee'
sd = require('sharify').data
{ resize, crop } = require '../../../../components/resizer'

describe 'TeamChannelView', ->

  before (done) ->
    benv.setup =>
      benv.expose $: benv.require 'jquery'
      Backbone.$ = $
      @channel = new Channel fixtures.channel
      @options = {
        sd: _.extend sd, { GALLERY_INSIGHTS_CHANNEL: '55356a9deca560a0137aa4b7' }
        resize: resize
        crop: crop
        # moment: moment
        channel: @channel
        featuredArticles: new Articles [fabricate 'article', fabricate 'article']
        asset: ->
      }
      $.fn.waypoint = (@waypoint = sinon.stub())
      sinon.stub Backbone, 'sync'
      { @TeamChannelView } = mod = rewire '../../client/team_channel'
      # mod.__set__ 'ArticlesGridView', sinon.stub()
      mod.__set__ 'initCarousel', sinon.stub()
      done()

  after ->
    benv.teardown()
    Backbone.sync.restore()

  describe '#renderGrid', ->

    before (done) ->
      benv.render resolve(__dirname, '../../templates/team_channel.jade'), @options, =>
        @view = new @TeamChannelView
          el: $('body')
        done()

    it 'sets the params for the grid view', ->
      Backbone.sync.args[0][2].success [fabricate 'article']
      # console.log $(@view.el).html()
      console.log $('.team-channel-grid').html()

  describe '#renderFeatured', ->

    before (done) ->
      benv.render resolve(__dirname, '../../templates/team_channel.jade'), @options, =>
        @view = new @TeamChannelView
          el: $('body')
        done()

    it 'renders featuredArticles and initializes carousel', ->
      $('.team-channel-featured__item').length.should.equal 2

  describe '#setupStickyNav', ->

    before (done) ->
      benv.render resolve(__dirname, '../../templates/team_channel.jade'), @options, =>
        @view = new @TeamChannelView
          el: $('body')
        done()

    it 'adds a waypoint', ->
      @waypoint.called.should.be.true()
      console.log @waypoint.args
