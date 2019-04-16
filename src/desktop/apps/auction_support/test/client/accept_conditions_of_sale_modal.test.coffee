benv = require 'benv'
Backbone = require 'backbone'
sinon = require 'sinon'
{ resolve } = require 'path'
{ fabricate } = require 'antigravity'

Sale = require '../../../../models/sale'
AcceptConditionsOfSaleModal = require '../../client/accept_conditions_of_sale_modal'

describe 'AcceptConditionsOfSaleModal', ->

  before (done) ->
    benv.setup ->
      benv.expose
        $: benv.require('jquery'),
      location.assign = sinon.spy()
      Backbone.$ = $
      done()

  after ->
    benv.teardown()

  beforeEach (done) ->
    @sale = new Sale fabricate 'sale'

    benv.render resolve(__dirname, '../../templates/accept_conditions_of_sale_modal.jade'), {
      sd: {}
      auction: @sale
    }, =>
      @view = new AcceptConditionsOfSaleModal
        auction: @sale
      done()

  afterEach ->
    location.assign.reset()

  describe '#submit', ->

    beforeEach ->
      @acceptConditions = => @view.$acceptConditions.prop('checked', true)
      @submit = =>
        @view.$submit.click()

    it 'redirects to the registration url on submit', (done) ->
      @acceptConditions()
      @submit()
      location.assign.args[0].should.containEql('/auction-registration/whtney-art-party?accepted-conditions=true')
      done()

    it 'does not redirect if Conditions of Sale are not accepted', ->
      @submit()
      location.assign.called.should.be.false()

    it 'adds an error class on submit if Conditions of Sale are not accepted', ->
      @submit()
      @view.$('.artsy-checkbox').hasClass('error').should.be.true()
