_ = require 'underscore'
benv = require 'benv'
sinon = require 'sinon'
sd = require('sharify').data
Backbone = require 'backbone'
Fair = require '../../../../../models/fair.coffee'
rewire = require 'rewire'
{ fabricate } = require 'antigravity'
capture = rewire '../index.coffee'

describe 'captureSignup', ->
  before (done) =>
    benv.setup =>
      benv.expose
        $: benv.require 'jquery'

      @flashSpy = sinon.spy()

      capture.__set__ 'CURRENT_USER', id: 'foo'
      capture.__set__ 'FlashMessage', @flashSpy
      sinon.stub _, 'delay', (cb) -> cb()
      done()

  after ->
    benv.teardown()

  beforeEach ->
    sinon.stub Backbone, 'sync'
    sinon.stub $, 'ajax'
    fair = new Fair fabricate 'fair'
    capture.captureSignup fair: fair, action: "attendee"

  afterEach ->
    Backbone.sync.restore()
    $.ajax.restore()

  it 'shows a FlashMessage after the FairAction is successfully saved', =>
    Backbone.sync.args[0][1].url.should.containEql '/api/v1/me/user_fair_action'
    Backbone.sync.args[0][2].success()
    @flashSpy.called.should.be.true

  it 'logs the user out after the flash message displays', =>
    Backbone.sync.args[0][2].success()
    $.ajax.args[0][0].type.should.eql 'DELETE'
    $.ajax.args[0][0].url.should.containEql '/users/sign_out'
