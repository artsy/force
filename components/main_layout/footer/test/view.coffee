rewire = require 'rewire'
benv = require 'benv'
Backbone = require 'backbone'
sinon = require 'sinon'
{ resolve } = require 'path'

describe 'FooterView', ->
  beforeEach (done) ->
    benv.setup =>
      benv.expose $: benv.require 'jquery'
      Backbone.$ = $
      FooterView = rewire '../view'
      FooterView.__set__ 'FeedbackView', Backbone.View
      benv.render resolve(__dirname, '../template.jade'), {}, =>
        @view = new FooterView el: $('#main-layout-footer')
        done()

  afterEach -> benv.teardown()

  it 'knows what year it is', ->
    now = (new Date).getFullYear()
    @view.$el.html().should.containEql now

  describe '#feedback', ->

    it 'Initializes a new FeedbackView and opens it', ->
      openSpy = sinon.spy Backbone.View::, 'initialize'
      @view.$('.mlf-feedback').click()
      openSpy.called.should.be.ok
