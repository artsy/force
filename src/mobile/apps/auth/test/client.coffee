_ = require 'underscore'
Backbone = require 'backbone'
sinon = require 'sinon'
sinon = require 'sinon'
benv = require 'benv'
{ resolve } = require 'path'

describe 'Reset password page client-side code', ->

  beforeEach (done) ->
    benv.setup =>
      benv.expose { $: benv.require 'jquery' }
      Backbone.$ = $
      sinon.stub Backbone, 'sync'
      benv.render resolve(__dirname, '../templates/reset_password.jade'), { sd: { AP: {} }, asset: (->) }, =>
        { PasswordResetView } = require '../client/reset_password'
        @view = new PasswordResetView el: $('#reset-password-form')
        done()

  afterEach ->
    benv.teardown()
    Backbone.sync.restore()

  describe 'PasswordResetView', ->

    describe '#initialize', ->

      beforeEach ->
        @view.initialize()

      it 'creates a new model that saves to the reset password endpoint', ->
        @view.model.url.should.containEql '/api/v1/users/reset_password'

      it 'toggles the loading button on request and error', ->
        $btn = @view.$('button')
        $btn.addClass('avant-garde-box-button-loading')
        @view.model.trigger 'error'
        $btn.hasClass('avant-garde-box-button-loading').should.not.be.ok()
        @view.model.trigger 'request'
        $btn.hasClass('avant-garde-box-button-loading').should.be.ok()

    describe "#save", ->

      it 'serializes the form and resets the password', ->
        @view.$('[name=password]').val 'foobarbaz'
        @view.save preventDefault: ->
        Backbone.sync.args[0][1].toJSON().password.should.equal 'foobarbaz'

      it 'renders any errors', ->
        @view.$('[name=password]').val 'foobarbaz'
        @view.save preventDefault: ->
        Backbone.sync.args[0][2].error(response: '{ "error":"FAIL WHALE"}')
        @view.$el.html().should.containEql 'FAIL WHALE'

describe 'Sign up (with email) client-side code', ->

  beforeEach (done) ->
    benv.setup =>
      benv.expose {
        $: benv.require 'jquery'
        analyticsHooks: { trigger: sinon.stub() }
      }
      Backbone.$ = $
      sinon.stub Backbone, 'sync'
      benv.render resolve(__dirname, '../templates/signup_email.jade'), { sd: { AP: {} }, asset: (->) }, =>
        { SignUpView } = mod = benv.require resolve(__dirname, '../client/signup')
        mod.__set__ 'sd', { AP: {} }
        @view = new SignUpView el: $('#auth-page')
        done()

  afterEach ->
    benv.teardown()
    Backbone.sync.restore()

  describe 'SignUpView', ->

    describe '#check', ->
      it 'Displays an warning message if input is empty', ->
        @view.$('input[type=email]').eq(0).val('').trigger('blur')
        @view.$el.html().should.containEql 'Please enter your'

      it 'Displays no warning if input has a value', ->
        @view.$('input').eq(1).val('Foo Bar').trigger('blur')
        @view.$el.html().should.not.containEql 'Please enter your'

    describe 'signup', ->
      beforeEach ->
        Backbone.sync.yieldsTo 'success'

      xit 'creates the user then logs in', ->

        @view.signup foo: 'bar'
        # Registers the user
        Backbone.sync.args[0][0].should.equal 'create'
        Backbone.sync.args[0][2].url.should.containEql '/api/v1/user'


describe 'Login view', ->

  beforeEach (done) ->
    benv.setup =>
      benv.expose { $: benv.require 'jquery' }
      Backbone.$ = $
      sinon.stub Backbone, 'sync'
      benv.render resolve(__dirname, '../templates/login.jade'), { sd: { AP: {} }, asset: (->) }, =>
        { LoginView } = require '../client/login'
        @view = new LoginView el: $('#auth-page')
        done()

  afterEach ->
    benv.teardown()
    Backbone.sync.restore()

  describe '#renderAuthError', ->

    it 'renders errors based on gravity like urls', ->
      global.location = { search: '?account_created_email=facebook' }
      @view.renderAuthError()
      @view.$el.html().should.containEql "You've already signed up"

  describe '#check', ->

    it 'submits the serialized form', ->
      sinon.stub $, 'ajax'
      @view.serializeForm = -> { email: 'foo', password: 'foo' }
      @view.check { preventDefault: -> }
      $.ajax.restore()
