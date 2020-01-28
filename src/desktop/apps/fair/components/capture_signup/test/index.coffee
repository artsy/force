_ = require 'underscore'
benv = require 'benv'
sinon = require 'sinon'
sd = require('sharify').data
Backbone = require 'backbone'
Fair = require '../../../../../models/fair.coffee'
rewire = require 'rewire'
{ fabricate } = require '@artsy/antigravity'
CurrentUser = require '../../../../../models/current_user.coffee'
capture = rewire '../index.coffee'

describe 'captureSignup', ->
  before (done) =>
    benv.setup =>
      benv.expose
        $: benv.require 'jquery'

      @flashSpy = sinon.spy()
      capture.__set__ 'FlashMessage', @flashSpy
      sinon.stub _, 'delay', (cb) -> cb()
      done()

  after ->
    benv.teardown()
    _.delay.restore()

  beforeEach =>
    sinon.stub $, 'ajax'
    @fair = new Fair fabricate 'fair'
    capture.signupSuccess
      fair: @fair
      action: "attendee"
      user: new CurrentUser fabricate 'user'

  afterEach =>
    $.ajax.restore()

  it 'shows a FlashMessage', =>
    @flashSpy.called.should.be.true()

  it 'logs the user out after the flash message displays', =>
    $.ajax.args[0][0].type.should.eql 'DELETE'
    $.ajax.args[0][0].url.should.containEql '/users/sign_out'
