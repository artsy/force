_ = require 'underscore'
benv = require 'benv'
Backbone = require 'backbone'
sinon = require 'sinon'
{ resolve } = require 'path'
CurrentUser = require '../../../models/current_user'
Articles = require '../../../collections/articles'
fixtures = require '../../../test/helpers/fixtures'

describe 'RelatedArticlesView', ->

  before (done) ->
    benv.setup =>
      benv.expose $: benv.require('jquery'), jQuery: benv.require('jquery')
      Backbone.$ = $
      @RelatedArticlesView = benv.requireWithJadeify(
        resolve(__dirname, '../view.coffee')
        ['template']
      )
      done()

  after ->
    benv.teardown()

  beforeEach (done) ->
    sinon.stub Backbone, 'sync'
    @view = new @RelatedArticlesView
      collection: new Articles [fixtures.article]
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
