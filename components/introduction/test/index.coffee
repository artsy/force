benv = require 'benv'
sinon = require 'sinon'
Backbone = require 'backbone'
IntroductionView = require '../index'

describe 'IntroductionView', ->
  before (done) ->
    benv.setup =>
      benv.expose $: benv.require('jquery'), jQuery: benv.require('jquery')
      Backbone.$ = $
      done()

  after ->
    benv.teardown()

  beforeEach ->
    sinon.stub(Backbone, 'sync').yieldsTo 'success', introduction: 'Foo is bar'
    @view = new IntroductionView

  afterEach ->
    Backbone.sync.restore()

  describe '#render', ->
    it 'renders the introduction', ->
      @view.$el.html().should.equal 'Foo is bar'

  describe '#syncing, #update', ->
    beforeEach ->
      Backbone.sync.restore()
      sinon.stub Backbone, 'sync'
      @view.update()
      @view.model.trigger 'request' # What's up with this not triggering in specs?

    it 'requests an updated introduction', ->
      Backbone.sync.args[0][1].url.should.containEql '/api/v1/me/inquiry_introduction'

    it 'displays a spinner', ->
      @view.$el.html().should.containEql 'loading-spinner'

    it 'removes the spinner and rerenders when sync is complete', ->
      Backbone.sync.args[0][2].success introduction: 'Foo is baz'
      @view.$el.html().should.not.containEql 'loading-spinner'
      @view.$el.html().should.equal 'Foo is baz'

    it 'only attempts one update at a time', ->
      @view.update()
      @view.update()
      Backbone.sync.callCount.should.equal 1
      Backbone.sync.args[0][2].success {}
      @view.update()
      @view.update()
      Backbone.sync.callCount.should.equal 2
      Backbone.sync.args[0][2].error {}
      @view.update()
      @view.update()
      Backbone.sync.callCount.should.equal 3

  describe 'XSS', ->
    it 'prevents HTML from being injected', ->
      Backbone.sync.args[0][2].success introduction: 'Foo is baz<script>alert("hi");</script>'
      @view.$el.html().should.equal 'Foo is baz&lt;script&gt;alert("hi");&lt;/script&gt;'
