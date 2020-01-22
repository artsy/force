Q = require 'bluebird-q'
benv = require 'benv'
sinon = require 'sinon'
Backbone = require 'backbone'
{ setup } = require './setup'
CommercialInterest = benv.requireWithJadeify require.resolve('../../views/commercial_interest'), ['template']

describe 'CommercialInterest', setup ->
  beforeEach ->
    @view = new CommercialInterest user: @currentUser, artwork: @artwork, state: @state

  describe '#render', ->
    beforeEach ->
      @view.render()

    it 'renders the template', ->
      @view.$('.iq-headline').text()
        .should.equal 'Have you bought art from a gallery or auction house before?'
      @view.$('button:first').text()
        .should.equal 'Yes'
      @view.$('button:last').text()
        .should.equal 'Not yet'

  describe 'next', ->
    beforeEach ->
      sinon.stub(Backbone, 'sync')
        .returns $.Deferred().resolve().promise()

      @state.set 'steps', ['commercial_interest', 'after_commercial_interest']
      @view.render()

    afterEach ->
      Backbone.sync.restore()

    it 'saves the form data onto the CollectorProfile and nexts the state', ->
      Backbone.sync.called.should.be.false()

      @view.$('button:first').click() # Yes => 3

      Backbone.sync.callCount.should.equal 1
      Backbone.sync.called.should.be.true()
      Backbone.sync.args[0][0].should.equal 'update'
      Backbone.sync.args[0][1].url.should.containEql '/api/v1/me/collector_profile'
      Backbone.sync.args[0][1].attributes.should.eql { collector_level: '3' }

      @view.state.current().should.equal 'after_commercial_interest'
