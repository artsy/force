_           = require 'underscore'
benv        = require 'benv'
rewire      = require 'rewire'
Backbone    = require 'backbone'
sinon       = require 'sinon'
sd          = require('sharify').data
PasswordResetView = require('../client/reset_password').PasswordResetView

{ resolve } = require 'path'

describe 'AuthClient', ->
  before (done) ->
    benv.setup =>
      sd.ARTSY_URL = 'localhost:3003'
      benv.expose $: benv.require 'jquery'
      Backbone.$ = $
      done()

  after ->
    benv.teardown()

  describe 'PasswordResetView', ->

    beforeEach (done) ->
      benv.render resolve(__dirname, '../templates/reset_password.jade'), { sd: {} }, =>
        @view = new PasswordResetView el: $('#reset-password-form')
        done()

    describe '#initialize', ->

      it 'creates a new model that saves to the reset password endpoint', ->
        @view.model.url.should.include '/api/v1/users/reset_password'

      it 'toggles the loading button on request and error', ->
        @view.$('#reset-password-form button').addClass('is-loading')
        @view.model.trigger 'error'
        @view.$('#reset-password-form button.is-loading').length.should.equal 0

    describe "#save", ->

      xit 'serializes the form and resets the password', ->
        @view.$('[name=password]').val 'foobarbaz'
        @view.$('[name=password_confirmation]').val 'foobarbaz'
        @view.save preventDefault: ->
        Backbone.sync.args[0][1].password.should.equal 'foobarbaz'

      xit 'renders any errors', ->
        @view.$('[name=password]').val 'foobarbaz'
        @view.$('[name=password_confirmation]').val 'foobarbaz'
        @view.save preventDefault: ->
        Backbone.sync.args[0][2].error({}, responseText: '{ "error":"FAIL WHALE"}')
        @view.$el.html().should.include 'FAIL WHALE'
