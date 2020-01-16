benv = require 'benv'
sinon = require 'sinon'
Backbone = require 'backbone'
_ = require 'underscore'
{ fabricate } = require '@artsy/antigravity'
CurrentUser = require '../../../../../models/current_user'
PasswordView = benv.requireWithJadeify require.resolve('../view'), ['template']

describe 'PasswordView', ->
  before (done) ->
    benv.setup ->
      benv.expose $: benv.require('jquery'), jQuery: benv.require('jquery')
      Backbone.$ = $
      done()

  after ->
    benv.teardown()

  beforeEach ->
    sinon.stub Backbone, 'sync'
    sinon.stub $, 'ajax'
    sinon.stub _, 'delay', (cb) -> cb()
    
    @user = new CurrentUser fabricate 'user'
    @view = new PasswordView user: @user
    @view.render()

  afterEach ->
    $.ajax.restore()
    Backbone.sync.restore()
    _.delay.restore()

  describe '#submit', ->
    beforeEach ->
      Backbone.sync
        .onCall 0
        .yieldsTo 'success'
      @view.submit $.Event()

    it 'changes the password', ->
      Backbone.sync.args[0][1].url.should.match /// api/v1/me/password ///

    it 'logs the user out', ->
      $.ajax.args[0][0].method.should.equal 'DELETE'
      $.ajax.args[0][0].url.should.equal '/users/sign_out'
