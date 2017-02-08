benv = require 'benv'
sinon = require 'sinon'
Backbone = require 'backbone'

describe 'MarketingSignupModal', ->
  beforeEach (done) ->
    benv.setup =>
      benv.expose $: benv.require('jquery'), jQuery: benv.require('jquery')
      Backbone.$ = $
      sinon.stub $, 'ajax'
      @MarketingSignupModal = benv.requireWithJadeify(
        require.resolve '../index.coffee'
        ['template']
      )
      @MarketingSignupModal.__set__ 'sd', @sd =
        APP_URL: 'http://artsy.net'
        CURRENT_USER: null
        MARKETING_SIGNUP_MODALS: [{slug: 'ca1', copy: 'This is a cool modal', image: 'img.jpg', }]
        AP: { signupPagePath: 'signuppath' }
      benv.expose sd: @sd
      @MarketingSignupModal.__set__ 'modalize', @modalize = sinon.stub()
      @modalize.returns @modal = view: new Backbone.View
      @modal.open = sinon.stub()
      @MarketingSignupModal.__set__ 'location', @location = search: '?m-id=ca1'
      @MarketingSignupModal.__set__ 'setTimeout', @setTimeout = sinon.stub()
      @setTimeout.callsArg 0
      done()

  afterEach ->
    $.ajax.restore()
    benv.teardown()

  beforeEach ->
    @view = new @MarketingSignupModal

  describe '#initialize', ->
    beforeEach ->
      @view.modal.open = sinon.stub()

    it 'opens if from a campaign url and logged out', ->
      @view.initialize()
      @view.modal.open.called.should.be.ok()

    it 'doesnt open if from a non marketing url', ->
      @location.search = '?foo=bar'
      @view.initialize()
      @view.modal.open.called.should.not.be.ok()

  describe '#submit', ->
    it 'creates a user', ->
      @view.inner.render()
      @view.inner.$('[name=email]').val 'foo@bar.com'
      @view.inner.$('[name=password]').val 'moo'
      @view.inner.submit(preventDefault: sinon.stub())
      $.ajax.args[0][0].url.should.containEql 'signuppath'
      $.ajax.args[0][0].data.email.should.equal 'foo@bar.com'
      $.ajax.args[0][0].data.password.should.equal 'moo'
