_ = require 'underscore'
benv = require 'benv'
sinon = require 'sinon'
Backbone = require 'backbone'
{ fabricate } = require 'antigravity'
rewire = require 'rewire'
Q = require 'bluebird-q'
Auction = require '../../../../models/auction.coffee'
init = rewire '../../client/email_registration_flow.coffee'

class DeferredView extends Backbone.View
  initialize: sinon.stub()
  constructor: (options)->
    @deferred = Q.defer()
    @result = @deferred.promise
    @initialize options

describe 'Email Registration Flow', ->
  before (done) ->
    benv.setup =>
      benv.expose $: benv.require 'jquery'
      Backbone.$ = $
      done()

  after ->
    benv.teardown()

  beforeEach ->
    @init = init
    @init.__set__ 'EmailView', (options) => @emailView = new DeferredView options
    @init.__set__ 'ThankYouView', (options) => @thankYouView = new DeferredView options
    @init.__set__ 'AuthModalView', (options) => @authModalView = new DeferredView options
    @init.__set__ 'modalize', -> { open:sinon.stub(), close: sinon.stub() }

    @auction = new Auction fabricate 'sale'

    @init @auction

  it 'initializes the EmailView', ->
    @emailView.initialize.called.should.equal true
    @emailView.initialize.args[0][0].buttonText.should.equal 'Notify me'

  it 'initializes the ThankYouView after the email is submitted', (done) ->
    @emailView.deferred.resolve()
    _.defer =>
      @thankYouView.initialize.called.should.equal true
      done()

  it 'initializes the AuthModalView after the email is submitted', (done) ->
    @emailView.deferred.resolve 'president@whitehouse.gov'
    _.defer =>
      @thankYouView.deferred.resolve false
      _.defer =>
        @authModalView.initialize.called.should.equal true
        _.last(@authModalView.initialize.args)[0].userData.email.should.equal 'president@whitehouse.gov'
        done()

  xit 'AuthModal is set to redirect to /personalize if skip is pressed', (done) ->
    @emailView.deferred.resolve 'president@whitehouse.gov'
    _.defer =>
      @thankYouView.deferred.resolve false
      _.defer =>
        @authModalView.initialize.called.should.equal true
        _.last(@authModalView.initialize.args)[0].redirectTo.should.equal '/personalize'
        done()

  xit 'AuthModal is set to redirect to bid registration if register is pressed', (done) ->
    @emailView.deferred.resolve 'president@whitehouse.gov'
    _.defer =>
      @thankYouView.deferred.resolve true
      _.defer =>
        @authModalView.initialize.called.should.equal true
        _.last(@authModalView.initialize.args)[0].redirectTo.should.equal "/auction-registration/#{@auction.id}"

        done()