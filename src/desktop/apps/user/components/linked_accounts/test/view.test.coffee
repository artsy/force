{ extend } = require 'underscore'
benv = require 'benv'
sinon = require 'sinon'
Backbone = require 'backbone'
{ fabricate } = require '@artsy/antigravity'
CurrentUser = require '../../../../../models/current_user'
LinkedAccountsView = benv.requireWithJadeify require.resolve('../view'), ['template']
LinkedAccountsView.__set__ 'sd', AP:
  twitterPath: '/users/auth/twitter'
  facebookPath: '/users/auth/facebook'

describe 'LinkedAccountsView', ->
  before (done) ->
    benv.setup ->
      benv.expose $: benv.require('jquery'), jQuery: benv.require('jquery')
      Backbone.$ = $
      done()

  after ->
    benv.teardown()

  beforeEach ->
    sinon.stub Backbone, 'sync'

    @user = new CurrentUser fabricate 'user'
    @view = new LinkedAccountsView user: @user
    @view.render()

  afterEach ->
    Backbone.sync.restore()

  describe '#toggleService', ->
    describe 'unlink', ->
      beforeEach ->
        sinon.stub @user, 'isLinkedTo'
          .returns true
        @view.$('.js-settings-linked-accounts__service__toggle[data-service="facebook"]').click()

      afterEach ->
        @user.isLinkedTo.restore()

      it 'destroys the authentication', ->
        Backbone.sync.args[0][0].should.equal 'delete'
        Backbone.sync.args[0][1].url.should.containEql '/api/v1/me/authentications/facebook'

      describe 'success', ->
        beforeEach ->
          Backbone.sync.yieldsTo 'success'
          @view.$('.js-settings-linked-accounts__service__toggle[data-service="facebook"]').click()

        it 'sets the correct button state', ->
          @view.$('.js-settings-linked-accounts__service__toggle[data-service="facebook"]')
            .data().should.eql service: 'facebook', connected: 'disconnected'

      describe 'error', ->
        beforeEach ->
          Backbone.sync.yieldsTo 'error', responseJSON: error: 'Something bad.'
          @view.$('.js-settings-linked-accounts__service__toggle[data-service="facebook"]').click()

        it 'renders any errors', ->
          @view.$('.js-form-errors').text().should.equal 'Something bad.'

      describe 'callback error', ->
        beforeEach ->
          sd = LinkedAccountsView.__get__ 'sd'
          LinkedAccountsView.__set__ 'sd', extend {}, sd,
            ERROR: 'Some arbitrary error message (probably).'

        it 'renders the ERROR', ->
          @view.render().$('.js-form-errors').text()
            .should.equal 'Some arbitrary error message (probably).'
