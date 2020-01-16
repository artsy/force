Q = require 'bluebird-q'
benv = require 'benv'
sinon = require 'sinon'
Backbone = require 'backbone'
{ fabricate } = require '@artsy/antigravity'
{ setup } = require './setup'
Specialist = benv.requireWithJadeify require.resolve('../../views/specialist'), ['template']

describe 'Specialist', setup ->
  beforeEach ->
    @representative = owner_type: 'Admin', owner: fabricate 'profile', name: 'Foo Bar'

    sinon.stub Backbone, 'sync'
      .onCall 0
      .yieldsTo 'success', [@representative]
      .returns Q.resolve [@representative]

  afterEach ->
    Backbone.sync.restore()

  describe '#render', ->
    describe 'user with email and name', ->
      beforeEach ->
        @view = new Specialist
          user: @currentUser
          artwork: @artwork
          inquiry: @inquiry
          state: @state

        @view.render()

      it 'loads the representative then renders the template', ->
        @view.__representatives__.then =>
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

      @view.__serialize__.then =>
        # Sets up the inquiry
        @inquiry.get('message').should.equal 'I wish to buy the foo bar'
        @inquiry.get('contact_gallery').should.be.false()
        @inquiry.get('artwork').should.equal @artwork.id

        # Sets up the user
        @loggedOutUser.get('name').should.equal 'Foo Bar'
        @loggedOutUser.get('email').should.equal 'foo@bar.com'

        Backbone.sync.callCount.should.equal 3

        Backbone.sync.args[0][1].url
          .should.containEql '/api/v1/admins/available_representatives'
        Backbone.sync.args[1][1].url()
          .should.containEql "/api/v1/me/anonymous_session/#{@loggedOutUser.id}"
        Backbone.sync.args[2][1].url()
          .should.containEql "/api/v1/profile"

        # Next
        @view.state.current().should.equal 'after_specialist'
