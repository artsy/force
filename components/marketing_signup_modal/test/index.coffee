benv = require 'benv'
sinon = require 'sinon'
Backbone = require 'backbone'

describe 'MarketingSignupModal', ->
  beforeEach (done) ->
    benv.setup =>
      benv.expose $: benv.require 'jquery'
      Backbone.$ = $
      sinon.stub $, 'ajax'
      @MarketingSignupModal = benv.requireWithJadeify(
        require.resolve '../index.coffee'
        ['template']
      )
      @MarketingSignupModal.__set__ 'sd', @sd =
        APP_URL: 'http://artsy.net'
        CURRENT_USER: null
        AP: {}
      benv.expose sd: @sd
      @MarketingSignupModal.__set__ 'modalize', @modalize = sinon.stub()
      @modalize.returns @modal = view: new Backbone.View
      @modal.open = sinon.stub()
      @MarketingSignupModal.__set__ 'document', @document = referrer: 'google.com'
      @MarketingSignupModal.__set__ 'setTimeout', @setTimeout = sinon.stub()
      @setTimeout.callsArg 0
      done()

  afterEach ->
    $.ajax.restore()
    benv.teardown()

  beforeEach ->
    @view = new @MarketingSignupModal

  describe '#maybeOpen', ->
    beforeEach ->
      @view.modal.open = sinon.stub()

    it 'opens if from oustide artsy and logged out', ->
      @view.maybeOpen()
      @view.modal.open.called.should.be.ok()

    it 'doesnt open if from inside artsy and logged out', ->
      @document.referrer = 'artsy.net'
      @view.maybeOpen()
      @view.modal.open.called.should.not.be.ok()

  describe '#submit', ->
    it 'creates a user', ->
      @view.inner.render()
      @view.inner.$('[name=email]').val 'foo@bar.com'
      @view.inner.$('[name=password]').val 'moo'
      @view.inner.submit(preventDefault: sinon.stub())
      $.ajax.args[0][0].url.should.containEql 'api/v1/user'
      $.ajax.args[0][0].data.email.should.equal 'foo@bar.com'
      $.ajax.args[0][0].data.password.should.equal 'moo'

