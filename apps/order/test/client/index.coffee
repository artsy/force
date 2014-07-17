_ = require 'underscore'
benv = require 'benv'
sinon = require 'sinon'
Backbone = require 'backbone'
{ resolve } = require 'path'
{ fabricate } = require 'antigravity'
{ stubChildClasses } = require '../../../../test/helpers/stubs'

describe 'OrderRouter', ->

  beforeEach (done) ->
    benv.setup =>
      benv.expose { $: benv.require 'jquery' }
      Backbone.$ = $
      { OrderRouter } = mod = benv.require resolve(__dirname, '../../client/index')
      stubChildClasses mod, this, ['ShippingForm', 'CheckoutForm'], []
      @router = new OrderRouter
      done()

  afterEach ->
    benv.teardown()

  describe '#shipping', ->

    it 'tells force to stay in force for Martsy', ->
      @router.shipping()
      @ShippingForm.args[0][0].success()
      window.location.should.include "/order/checkout?stop_microgravity_redirect=true"