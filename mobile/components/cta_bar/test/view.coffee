_ = require 'underscore'
benv = require 'benv'
sinon = require 'sinon'
Backbone = require 'backbone'
{ resolve } = require 'path'
CTABarView = benv.requireWithJadeify resolve(__dirname, '../view'), ['template']

describe 'CTABarView', ->
  before (done) ->
    benv.setup =>
      benv.expose $: benv.require 'jquery'
      Backbone.$ = $
      done()

  after ->
    benv.teardown()

  describe 'render', ->
    beforeEach ->
      @view = new CTABarView
        headline: 'Get updates on new shows and works by Roni Horn.'
        name: 'artist_cta'
        email: 'kana@artsymail.com'
        mode: 'email'

    describe '#render', ->
      beforeEach ->
        @view.render()

      it 'renders the template', ->
        @view.$('.cta-bar-header').text().should.containEql 'Get updates on new shows and works by Roni Horn.'

      it 'renders the email form', ->
        @view.$('.cta-bar-email-form').should.have.lengthOf 1

    describe '#transitionIn, #transitionOut', ->
      it 'transitions the template in/out', (done) ->
        @view.render().transitionIn()
        _.defer => _.defer =>
          @view.$el.attr('data-state').should.equal 'in'
          @view.render().transitionOut()
          _.defer => _.defer =>
            @view.$el.attr('data-state').should.equal 'out'
            done()

  describe 'dismissal', ->
    beforeEach ->
      CTABarView.__set__ 'Cookies', set: (@setStub = sinon.stub()), get: (@getStub = sinon.stub())
      @view = new CTABarView name: 'foobar', persist: true
      @view.render()

    describe '#logDimissal', ->
      beforeEach ->
        @view.$('.cta-bar-defer').click()

      it 'logs the dismissal', ->
        @setStub.args[0].should.eql ['foobar', 1, expires: 31536000]

    describe '#previouslyDismissed', ->
      it 'returns false unless it has been dismissed previously', ->
        @view.previouslyDismissed().should.be.false()
        @getStub.returns 'existy'
        @view.previouslyDismissed().should.be.true()
