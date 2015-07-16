benv = require 'benv'
sinon = require 'sinon'
Backbone = require 'backbone'
setup = require './setup'
Account = benv.requireWithJadeify require.resolve('../../views/account'), [
  'templates.login'
  'templates.signup'
  'templates.forgot'
]

xdescribe 'Account', setup ->
  beforeEach ->
    @view = new Account user: @loggedOutUser, artwork: @artwork, state: @state

  describe '#render', ->
    beforeEach ->
      @view.render()

    it 'renders the login page the first time it renders', ->
      @view.$('.iq-headline').text()
        .should.containEql 'To skip these steps on your next inquiry'
      @view.$('input').map(-> $(this).attr('name')).get()
        .should.eql ['password']

    it 're-renders when the mode changes', ->
      @view.active.set 'mode', 'forgot'
      @view.$('.iq-headline').text()
        .should.containEql 'Please check your email'

      @view.active.set 'mode', 'login'
      @view.$('.iq-headline').text()
        .should.containEql 'Please log in to save information to your profile'

      @view.active.set 'mode', 'signup'
      @view.$('.iq-headline').text()
        .should.containEql 'To skip these steps on your next inquiry'

  describe '#forgot', ->
    beforeEach ->
      sinon.stub Backbone, 'sync'

    afterEach ->
      Backbone.sync.restore()

    it 'sends the password reset email a single time', ->
      @view.active.get('mode').should.equal 'auth'
      Backbone.sync.called.should.be.false()

      @view.active.set 'mode', 'forgot'
      Backbone.sync.called.should.be.true()
      Backbone.sync.callCount.should.equal 1
      Backbone.sync.args[0][2].url
        .should.containEql '/api/v1/users/send_reset_password_instructions'

      @view.active.set 'mode', 'login'
      @view.active.set 'mode', 'forgot'

      Backbone.sync.callCount.should.equal 1
