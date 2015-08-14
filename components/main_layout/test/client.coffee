sd = require('sharify').data
benv = require 'benv'
Backbone = require 'backbone'
sinon = require 'sinon'

{ resolve } = require 'path'
{ fabricate } = require 'antigravity'

describe 'Layout init code', ->

  beforeEach (done) ->
    benv.setup =>
      benv.expose { $: benv.require('jquery'), mixpanel: {}, ga: {} }
      sinon.stub $, 'ajax'
      { @syncAuth } = mod = benv.require resolve(__dirname, '../client')
      mod.__set__ 'setupAnalytics', sinon.stub()
      done()

  afterEach -> benv.teardown()

  it 'logs you out if Gravity throws an auth error', ->
    sd.CURRENT_USER = fabricate 'user'
    @syncAuth()
    $.ajax.args[0][0].url.should.containEql 'api/v1/me'
    $.ajax.args[0][0].error()
    $.ajax.args[1][0].method.should.equal 'DELETE'
    $.ajax.args[1][0].url.should.equal '/users/sign_out'
    sd.CURRENT_USER = null
