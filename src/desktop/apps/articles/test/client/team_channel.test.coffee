_ = require 'underscore'
benv = require 'benv'
sinon = require 'sinon'
rewire = require 'rewire'
Backbone = require 'backbone'
{ resolve } = require 'path'
fixtures = require '../../../../test/helpers/fixtures'
{ fabricate } = require '@artsy/antigravity'
Articles = require '../../../../collections/articles.coffee'
Article = require '../../../../models/article.coffee'
Channel = require '../../../../models/channel.coffee'
sd = require('sharify').data
{ resize, crop } = require '../../../../components/resizer'

describe 'TeamChannelView', ->

  before (done) ->
    benv.setup =>
      benv.expose $: benv.require('jquery'), jQuery: benv.require('jquery')
      Backbone.$ = $
      window.resize = ->
      window.matchMedia = sinon.stub().returns { matches: true }
      @channel = new Channel fixtures.channel
      @options = {
        sd: _.extend sd, { GALLERY_INSIGHTS_CHANNEL: '55356a9deca560a0137aa4b7' }
        resize: resize
        crop: crop
        channel: @channel
        parselyArticles: []
        pinnedArticles: new Articles [new Article fabricate 'article']
        asset: ->
      }
      $.fn.waypoint = (@waypoint = sinon.stub())
      sinon.stub Backbone, 'sync'
      { @TeamChannelView } = mod = rewire '../../client/team_channel'
      @carousel = { navigation: {} }
      mod.__set__ 'initCarousel', sinon.stub().returns @carousel
      mod.__set__ 'ArticlesGridView', @ArticlesGridView = sinon.stub()
      mod.__set__ 'TeamChannelNavView', @TeamChannelNavView = sinon.stub()
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

    it 'sets up the TeamChannelNavView', ->
      @TeamChannelNavView.args[0][0].offset.should.equal -400
      @TeamChannelNavView.args[0][0].$waypointEl.selector.should.equal '.team-channel-header'
      @TeamChannelNavView.args[0][0].$content.selector.should.equal '.team-channel-body'

  describe '#renderGrid', ->

    it 'adds articles to the grid view', ->
      @ArticlesGridView.called.should.be.true()
      @ArticlesGridView.args[0][0].header.should.containEql 'Latest Articles'

  describe '#renderFeatured', ->

    it 'renders featuredArticles and initializes carousel', ->
      $('.team-channel-featured__item figure').length.should.equal 1
      $('.team-channel-featured__item').html().should.containEql 'On The Heels'

  describe '#windowResized', ->

    it 'sets the advanceBy in carousel to 1 if small screen', ->
      window.matchMedia = sinon.stub().returns { matches: true }
      @view.windowResized()
      @view.carousel.navigation.advanceBy.should.equal 1

    it 'sets the advanceBy in carousel to 2 if large screen', ->
      window.matchMedia = sinon.stub().returns { matches: false }
      @view.windowResized()
      @view.carousel.navigation.advanceBy.should.equal 2
