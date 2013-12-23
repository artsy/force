benv = require 'benv'
sinon = require 'sinon'
Backbone = require 'backbone'
sd = require('sharify').data

describe 'AuthModalView', ->

  before (done) ->
    benv.setup =>
      benv.expose { $: require 'components-jquery' }
      Backbone.$ = $
      $('body').html $ "<div id='fixture'></div>"
      @AuthModalView = require '../view'
      sinon.stub @AuthModalView.prototype, 'initialize'
      done()

  after ->
    # benv.teardown()

  beforeEach ->
    @view = new @AuthModalView el: $('#fixture')
    sinon.stub Backbone, 'sync'

  afterEach ->
    Backbone.sync.restore()

  describe '#submit', ->

    it 'directs to logging into Gravity after a successful login', ->
      sinon.stub location, 'reload'
      @view.validateForm = -> true
      @view.state = new Backbone.Model
      @view.state.set mode: 'login'
      @view.submit { preventDefault: -> }
      Backbone.sync.args[0][1].url.should.include 'users/sign_in'
      Backbone.sync.args[0][2].success {}
      location.href.should.include 'login-to-artsy'