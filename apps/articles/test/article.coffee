_ = require 'underscore'
benv = require 'benv'
sinon = require 'sinon'
Backbone = require 'backbone'
{ resolve } = require 'path'
fixtures = require '../../../test/helpers/fixtures'
{ fabricate } = require 'antigravity'
Article = require '../../../models/article.coffee'
Articles = require '../../../collections/articles.coffee'
{ crop, resize } = require '../../../components/resizer'
sd = require('sharify').data
moment = require 'moment'

describe 'ArticleIndexView', ->

  before (done) ->
    benv.setup =>
      benv.expose $: benv.require 'jquery'
      Backbone.$ = $
      @model = new Article _.extend fixtures.article,
        sections: [
          { type: 'text', body: 'Foo' }
          {
            type: 'artworks',
            ids: ['5321b73dc9dc2458c4000196', '5321b71c275b24bcaa0001a5'],
            layout: 'overflow_fillwidth'
          }
        ]
      @options = {
        sd: sd
        resize: resize
        crop: crop
        article: @model
        moment: moment
        asset: ->
        footerArticles: new Backbone.Collection
      }
      $.onInfiniteScroll = sinon.stub()
      sinon.stub Backbone, 'sync'
      @ArticleIndexView = benv.requireWithJadeify resolve(__dirname, '../client/article'), ['articleTemplate']
      done()

  after ->
    benv.teardown(false)
    Backbone.sync.restore()

  describe '#initialize static articles', ->

    before (done) ->
      @options.sd.SCROLL_SHARE_ARTICLE = 'static_current'
      benv.render resolve(__dirname, '../templates/article.jade'), @options, =>
        @view = new @ArticleIndexView
          el: $('body')
        done()

    it 'renders the template with footer', ->
      $('#articles-footer').text().should.containEql 'What to Read Next'

  describe '#initialize infinite scroll articles', ->

    before (done) ->
      sd.SCROLL_SHARE_ARTICLE = 'infinite_current'
      benv.render resolve(__dirname, '../templates/article.jade'), _.extend(@options, {
        sd: sd
      }), =>
        @ArticleIndexView.__set__ 'ArticleView', sinon.stub()
        @view = new @ArticleIndexView
          el: $('body')
        done()

    it 'renders the template with footer', ->
      $('#articles-footer').text().should.not.containEql 'What to Read Next'

    it '#nextPage should set offset', ->
      @view.nextPage()
      @view.params.get('offset').should.equal 0
      @view.nextPage()
      @view.params.get('offset').should.equal 10

    it 'renders the next page on #render', ->
      articles = [_.extend fixtures.article, { id: '343', sections: [{ type: 'text', body: 'FooLa' }] } ]
      @view.render(@view.collection, results: articles )
      $('.article-container').length.should.equal 2
