benv = require 'benv'
sinon = require 'sinon'
Backbone = require 'backbone'
{ setup } = require './setup'
InstitutionalAffiliations = benv.requireWithJadeify require.resolve('../../views/institutional_affiliations'), [
  'template'
]

describe 'InstitutionalAffiliations', setup ->
  beforeEach ->
    @view = new InstitutionalAffiliations
      user: @currentUser, artwork: @artwork, state: @state

  describe '#render', ->
    beforeEach ->
      @artwork.related().partner.set 'pre_qualify', true
      @view.render()

    it 'renders the form', ->
      @view.$('.iq-headline').text()
        .should.equal 'Any institutional affiliations?'

  describe 'next', ->
    describe 'success', ->
      beforeEach ->
        sinon.stub Backbone, 'sync'
          .yieldsTo 'success'

        @state.set 'steps', ['institutional_affiliations', 'after_institutional_affiliations']
        @view.render()

      afterEach ->
        Backbone.sync.restore()

      it 'saves the form data onto the user and nexts the state', ->
        Backbone.sync.called.should.be.false()

        @view.$('textarea[name="institutional_affiliations"]').val '27 Club'
        @view.$('button').click()

        Backbone.sync.callCount.should.equal 1
        Backbone.sync.called.should.be.true()
        Backbone.sync.args[0][0].should.equal 'update'
        Backbone.sync.args[0][1].url.should.containEql '/api/v1/me/collector_profile'
        Backbone.sync.args[0][1].attributes.institutional_affiliations.should.equal '27 Club'

        @view.state.current().should.equal 'after_institutional_affiliations'
