_ = require 'underscore'
benv = require 'benv'
Backbone = require 'backbone'
sinon = require 'sinon'
{ resolve } = require 'path'
fixtures = require '../../../../../test/helpers/fixtures'
Articles = require '../../../../../collections/articles'
ShowRelatedArticlesView = benv.requireWithJadeify resolve(__dirname, '../view.coffee'), ['template']

xdescribe 'ShowRelatedArticlesView', ->

  before (done) ->
    benv.setup =>
      benv.expose $: benv.require('jquery'), jQuery: benv.require('jquery')
      Backbone.$ = $
      done()

  after ->
    benv.teardown()

  beforeEach (done) ->
    sinon.stub Backbone, 'sync'
    @articles = new Articles [fixtures.article]
    @view = new ShowRelatedArticlesView
      collection: @articles
      numToShow: 1
    done()

  afterEach ->
    Backbone.sync.restore()

  describe '#render', ->

    it 'renders the right content', ->
      @view.collection.set [_.extend(fixtures.article, thumbnail_title: 'Moobar')]
      @view.render()
      @view.$el.html().should.containEql 'Moobar'

  describe '#showAll', ->

    it 'reveals the rest of the articles', ->
      @view.collection.set _.times 10, ->
        _.extend(fixtures.article, thumbnail_title: 'Moobar', id: Math.random())
      @view.collection.add  _.extend(fixtures.article, thumbnail_title: 'Foo', id: Math.random())
      @view.render()
      @view.showAll preventDefault: ->
      @view.$el.html().should.containEql 'Foo'
