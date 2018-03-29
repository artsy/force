benv = require 'benv'
sinon = require 'sinon'
Backbone = require 'backbone'
setup = require './setup'

Account = benv.requireWithJadeify require.resolve('../../views/account'), [
  'templates.login'
  'templates.register'
  'templates.forgot'
]

before (done) ->
  benv.setup ->
    benv.expose 
      $: benv.require('jquery'), jQuery: benv.require('jquery'),
      sd: {
        AP: { loginPagePath: '/login' }
      }
    Backbone.$ = $
    done()

after ->
  benv.teardown()

describe 'Account', setup ->
  beforeEach ->
    @view = new Account user: @loggedOutUser, artwork: @artwork, state: @state, inquiry: @inquiry

  describe '#render', ->
    beforeEach ->
      @view.render()

    it 'renders the login page the first time it renders', ->
      @view.$('.iq-headline').text()
        .should.containEql 'Create an account to send your message'
      @view.$('input').map(-> $(this).attr('name')).get()
        .should.eql ['name', 'email', 'password', '_csrf']

    it 're-renders when the mode changes', ->
      @view.active.set 'mode', 'forgot'
      @view.$('.iq-headline').text()
        .should.containEql 'Please check your email'

      @view.active.set 'mode', 'login'
      @view.$('.iq-headline').text()
        .should.containEql 'Please log in to save information to your profile'

      @view.active.set 'mode', 'register'
      @view.$('.iq-headline').text()
        .should.containEql 'Create an account to send your message'

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
