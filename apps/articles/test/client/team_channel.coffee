_ = require 'underscore'
benv = require 'benv'
sinon = require 'sinon'
rewire = require 'rewire'
Backbone = require 'backbone'
{ resolve } = require 'path'
fixtures = require '../../../../test/helpers/fixtures'
{ fabricate } = require 'antigravity'
Articles = require '../../../../collections/articles.coffee'
Article = require '../../../../models/article.coffee'
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
        channel: @channel
        featuredArticles: [new Article fabricate 'article']
        asset: ->
      }
      $.fn.waypoint = (@waypoint = sinon.stub())
      sinon.stub Backbone, 'sync'
      { @TeamChannelView } = mod = rewire '../../client/team_channel'
      mod.__set__ 'initCarousel', sinon.stub()
      mod.__set__ 'ArticlesGridView', @ArticlesGridView = sinon.stub()
      benv.render resolve(__dirname, '../../templates/team_channel.jade'), @options, =>
        @view = new @TeamChannelView
          el: $('body')
        done()

  after ->
    benv.teardown()
    Backbone.sync.restore()

  describe 'initialize', ->
    it 'renders the name and tagline', ->
      $('body').html().should.containEql 'Life at Artsy'
      $('body').html().should.containEql 'Office Culture at Artsy'

  describe '#renderGrid', ->

    it 'adds articles to the grid view', ->
      @ArticlesGridView.called.should.be.true()
      @ArticlesGridView.args[0][0].header.should.containEql 'Latest Articles'

  describe '#renderFeatured', ->

    it 'renders featuredArticles and initializes carousel', ->
      $('.team-channel-featured__item figure').length.should.equal 1
      $('.team-channel-featured__item').html().should.containEql 'On The Heels'

  describe '#setupStickyNav', ->

    it 'adds a waypoint', ->
      @waypoint.called.should.be.true()
      @waypoint.args[0][1].offset.should.equal -400
