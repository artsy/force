benv = require 'benv'
sinon = require 'sinon'
Backbone = require 'backbone'
{ fabricate } = require 'antigravity'
setup = require './setup'
Specialist = benv.requireWithJadeify require.resolve('../../views/specialist'), ['template']

describe 'Specialist', setup ->
  describe '#render', ->
    describe 'user with email and name', ->
      beforeEach ->
        sinon.stub Backbone, 'sync'
          .returns $.Deferred().promise()

        @view = new Specialist
          user: @currentUser
          artwork: @artwork
          inquiry: @inquiry
          state: @state

        @view.representatives.add owner: fabricate 'profile', name: 'Foo Bar'
        @view.representative = @view.representatives.first()

        @view.render()

      afterEach ->
        Backbone.sync.restore()

      it 'loads the representative then renders the template', ->
        Backbone.sync.args[0][1].url
          .should.containEql '/api/v1/admins/available_representatives'

        @view.$('h1').text()
          .should.equal 'Send message to Artsy'
        @view.$('.scontact-description').text()
          .should.equal 'Foo Bar, an Artsy Specialist, is available to answer your questions and help you collect through Artsy.'
        @view.$('input[type="text"][name="name"]')
          .should.have.lengthOf 0
        @view.$('input[type="email"][name="email"]')
          .should.have.lengthOf 0
        @view.$('.scontact-from').text()
          .should.equal 'From: Craig Spaeth (craigspaeth@gmail.com)'

    describe 'user without contact details', ->
      beforeEach ->
        @loggedOutUser.unset 'name'
        @loggedOutUser.unset 'email'

        @view = new Specialist
          user: @loggedOutUser
          artwork: @artwork
          inquiry: @inquiry
          state: @state

        @view.render()

      it 'renders the template', ->
        @view.$('h1').text()
          .should.equal 'Send message to Artsy'
        @view.$('input[type="text"][name="name"]')
          .should.have.lengthOf 1
        @view.$('input[type="email"][name="email"]')
          .should.have.lengthOf 1
        @view.$('.scontact-from').text()
          .should.be.empty()

  describe 'next', ->
    beforeEach ->
      @state.set 'steps', ['specialist', 'after_specialist']

      @loggedOutUser.unset 'name'
      @loggedOutUser.unset 'email'

      @view = new Specialist
        user: @loggedOutUser
        artwork: @artwork
        inquiry: @inquiry
        state: @state

      @view.render()

    it 'sets up the inquiry and ensures the user has contact details', ->
      @view.$('input[name="name"]').val 'Foo Bar'
      @view.$('input[name="email"]').val 'foo@bar.com'
      @view.$('textarea[name="message"]').val 'I wish to buy the foo bar'
      @view.$('button').click()

      # Sets up the inquiry
      @inquiry.get('message').should.equal 'I wish to buy the foo bar'
      @inquiry.get('contact_gallery').should.be.false()
      @inquiry.get('artwork').should.equal @artwork.id

      # Sets up the user
      @loggedOutUser.get('name').should.equal 'Foo Bar'
      @loggedOutUser.get('email').should.equal 'foo@bar.com'

      # Next
      @view.state.current().should.equal 'after_specialist'
