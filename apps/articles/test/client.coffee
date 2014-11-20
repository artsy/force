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
        sd: {}
      }, =>
        done()

  after ->
    benv.teardown()

  beforeEach ->
    sinon.stub Backbone, 'sync'
    @view = new @ArticleView el: $('body'), article: @article

  afterEach ->
    Backbone.sync.restore()

  describe 'setupSlideshow', ->

    it 'renders the articles artworks', ->
      @view.setupSlideshow()
      for arg in Backbone.sync.args
        arg[2].success fabricate 'artwork', title: 'Foo on the Bar'
      @view.$('#articles-slideshow').html().should.containEql 'Foo on the Bar'