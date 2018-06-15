_ = require 'underscore'
sd = require('sharify').data
benv = require 'benv'
sinon = require 'sinon'
rewire = require 'rewire'
Backbone = require 'backbone'
{ resolve } = require 'path'
{ PasswordResetView } = require '../client/reset_password'

describe 'PasswordResetView', ->
  before (done) ->
    benv.setup =>
      benv.expose $: benv.require('jquery'), jQuery: benv.require('jquery')
      Backbone.$ = $
      done()

  after ->
    benv.teardown()

  beforeEach (done) ->
    sinon.stub Backbone, 'sync'
    benv.render resolve(__dirname, '../templates/reset_password.jade'), { asset: (->), sd: {}, reset_password_token: 'secret' }, =>
      @view = new PasswordResetView el: $('#reset-password-page')
      done()

  afterEach ->
    Backbone.sync.restore()

  describe '#initialize', ->
    it 'creates a new model that saves to the reset password endpoint', ->
      @view.model.url.should.containEql '/api/v1/users/reset_password'

  describe '#submit', ->
    it 'serializes the form and resets the password', ->
      @view.$('[name="password"]').val 'foobarbaz'
      @view.$('[name="password_confirmation"]').val 'foobarbaz'
      @view.$('button').click()
      Backbone.sync.args[0][0].should.equal 'update'
      Backbone.sync.args[0][1].attributes.should.eql
        reset_password_token: 'secret'
        password: 'foobarbaz'
        password_confirmation: 'foobarbaz'
