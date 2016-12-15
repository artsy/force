_ = require 'underscore'
benv = require 'benv'
sinon = require 'sinon'
Backbone = require 'backbone'
{ resolve } = require 'path'
CTABarView = benv.requireWithJadeify resolve(__dirname, '../view'), ['template']

describe 'CTABarView', ->
  before (done) ->
    benv.setup =>
      benv.expose $: benv.require('jquery'), jQuery: benv.require('jquery')
      Backbone.$ = $
      done()

  after ->
    benv.teardown()

  describe 'minimal configuration', ->
    beforeEach ->
      @view = new CTABarView

    describe '#render', ->
      beforeEach ->
        @view.render()

      it 'renders the template', ->
        @view.$el.html().should.containEql 'Maybe Later'

      it 'does not render the form (default mode of "link")', ->
        @view.$('.cta-bar-form').should.have.lengthOf 0

      it 'opens the signup modal on clicking CTA', ->
        @view.openModal = sinon.stub()
        @view.onClickButton preventDefault: prevent = sinon.stub()
        prevent.called.should.be.ok()
        @view.openModal.called.should.be.ok()

      it 'doesnt open the signup modal if theres a logged in user', ->
        @view.openModal = sinon.stub()
        @view.user = new Backbone.Model
        @view.onClickButton preventDefault: prevent = sinon.stub()
        prevent.called.should.not.be.ok()
        @view.openModal.called.should.not.be.ok()

  describe 'extended configuration', ->
    beforeEach ->
      @view = new CTABarView
        headline: 'Get updates on new shows and works by Roni Horn.'
        mode: 'inline'
        name: 'artist_cta'
        modalOptions:
          copy: 'Get the latest new shows and works by Roni Horn.'

    describe '#render', ->
      beforeEach ->
        @view.render()

      it 'renders the template', ->
        @view.$('.cta-bar-headline').text().should.equal 'Get updates on new shows and works by Roni Horn.'

      it 'renders the inline form (mode is "inline")', ->
        @view.$('.cta-bar-form').should.have.lengthOf 1

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
