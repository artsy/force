benv = require 'benv'
sinon = require 'sinon'
Backbone = require 'backbone'
{ setup } = require './setup'
BasicInfo = benv.requireWithJadeify require.resolve('../../views/basic_info'), ['template']

describe 'BasicInfo', setup ->
  beforeEach ->
    sinon.stub BasicInfo::, 'postRender'
    @view = new BasicInfo user: @currentUser, artwork: @artwork, state: @state

  afterEach ->
    @view.postRender.restore()

  describe '#render', ->
    beforeEach ->
      @artwork.related().partner.set 'pre_qualify', true
      @view.render()

    it 'renders the form', ->
      @view.$('.iq-headline').text()
        .should.containEql 'Gagosian Gallery asks for some additional information before placing an inquiry.'
      @view.$('input').map(-> $(this).attr('name')).get()
        .should.eql ['profession', 'phone', 'share_follows']

  describe 'next', ->
    describe 'success', ->
      beforeEach ->
        sinon.stub Backbone, 'sync'
          .yieldsTo 'success'

        @state.set 'steps', ['basic_info', 'after_basic_info']
        @view.render()

      afterEach ->
        Backbone.sync.restore()

      it 'saves the form data onto the user and nexts the state', ->
        Backbone.sync.called.should.be.false()

        @view.$('input[name="profession"]').val 'Human'
        @view.$('input[name="phone"]').val '555-555-5555'
        @view.$('button').click()

        Backbone.sync.callCount.should.equal 1
        Backbone.sync.called.should.be.true()
        Backbone.sync.args[0][0].should.equal 'update'
        Backbone.sync.args[0][1].url().should.containEql '/api/v1/me'
        Backbone.sync.args[0][1].attributes.profession.should.equal 'Human'
        Backbone.sync.args[0][1].attributes.phone.should.equal '555-555-5555'

        @view.state.current().should.equal 'after_basic_info'

    describe 'error', ->
      beforeEach ->
        sinon.stub Backbone, 'sync'
          .yieldsTo 'error'

        @state.set 'steps', ['basic_info', 'after_basic_info']
        @view.render()

      afterEach ->
        Backbone.sync.restore()

      it 'renders the error', ->
        @view.$('input[name="profession"]').val 'Human'
        @view.$('input[name="phone"]').val 'notvalid'
        @view.$('button').click()

        @view.$('.js-form-errors').text()
          # The actual API returns a more useful error message; this is a fallback
          .should.equal 'There was an error'

        @view.state.current().should.equal 'basic_info'
