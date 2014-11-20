_ = require 'underscore'
benv = require 'benv'
sinon = require 'sinon'
Backbone = require 'backbone'
Article = require '../../../models/article'
fixtures = require '../../../test/helpers/fixtures.coffee'
{ resolve } = require 'path'
{ fabricate } = require 'antigravity'

describe 'ArticleView', ->
  before (done) ->
    benv.setup =>
      benv.expose $: benv.require 'jquery'
      Backbone.$ = $
      { @ArticleView } = benv.requireWithJadeify(
        resolve(__dirname, '../client/show')
        ['artworkItemTemplate']
      )
      benv.render resolve(__dirname, '../templates/show.jade'), {
        article: @article = new Article fixtures.article
        author: new Backbone.Model fabricate 'user'
        sd: {}
        embedVideo: require('embed-video')
        moment: require('moment')
      }, =>
        done()

  after ->
    benv.teardown()

  beforeEach ->
    sinon.stub Backbone, 'sync'
    @view = new @ArticleView el: $('body'), article: @article

  afterEach ->
    Backbone.sync.restore()

  describe '#setupSlideshow', ->

    it 'renders the articles artworks', ->
      @view.setupSlideshow()
      for arg in Backbone.sync.args
        arg[2].success fabricate 'artwork',
          title: 'Foo on the Bar', id: '54276766fd4f50996aeca2b8'
      @view.$('#articles-slideshow').html().should.containEql 'Foo on the Bar'

  describe '#renderArtworks', ->

    it 'renders artworks from the article', ->
      Backbone.sync.restore()
      sinon.stub Backbone, 'sync'
      @view.renderArtworks()
      for arg in Backbone.sync.args
        arg[2].success fabricate 'artwork',
          title: 'Andy Foobar Flowers'
          _id: '5321b73dc9dc2458c4000196'
      @view.$el.html().should.containEql 'Andy Foobar Flowers'
