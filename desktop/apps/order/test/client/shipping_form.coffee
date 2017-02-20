rewire = require 'rewire'
benv = require 'benv'
Backbone = require 'backbone'
sinon = require 'sinon'
_ = require 'underscore'
Order = require '../../../../models/order'
ShippingForm = require('../../client/shipping_form')
{ resolve } = require 'path'
{ fabricate } = require 'antigravity'

describe 'ShippingForm', ->

  before (done) ->
    benv.setup =>
      benv.expose { $: benv.require 'jquery' }
      sinon.stub global, 'setInterval'
      Backbone.$ = $
      done()

  after ->
    benv.teardown()
    global.setInterval.restore()

  beforeEach (done) ->
    sinon.stub Backbone, 'sync'
    benv.render resolve(__dirname, '../../templates/shipping.jade'), {
      sd: {}
      order: new Order(fabricate 'order')
      asset: (->)
    }, =>
      @success = false
      @view = new ShippingForm
        el: $('body')
        model: new Order(fabricate 'order')
        success: => @success = true
      done()

  afterEach ->
    Backbone.sync.restore()

  describe '#initialize', ->

    it 'sets up @fields', ->
      @view.fields.email.el.length.should.equal 1
      @view.fields.name.el.length.should.equal 1
      @view.fields.street.el.length.should.equal 1
      @view.fields.city.el.length.should.equal 1
      @view.fields.state.el.length.should.equal 1
      @view.fields.zip.el.length.should.equal 1
      @view.fields.country.el.length.should.equal 1

  describe '#internationalizeFields', ->

    it 'changes to Postal Code for non-USA countries', ->
      @view.$('.postal-code label').text().should.equal 'Zip code'
      @view.$('select.country').val 'UZB'
      @view.$('select.country').trigger 'change'
      @view.$('.postal-code label').text().should.equal 'Postal Code'

  describe '#onSubmit', ->

    xit 'shows errors for empty fields', ->
      @view.onSubmit()
      @view.$('.error').text().should.equal 'Invalid emailInvalid nameInvalid streetInvalid cityInvalid stateInvalid zipPlease review the error(s) above and try again.'

    it 'runs success callback', ->
      @view.fields.email.el.val 'a@b.com'
      @view.fields.name.el.val 'name'
      @view.fields.street.el.val '123 street'
      @view.fields.city.el.val 'Cool city brah'
      @view.fields.state.el.val 'City'
      @view.fields.zip.el.val '11238'

      @view.onSubmit()
      @view.$('.error').text().should.equal ''
      _.last(Backbone.sync.args)[2].success {}
      @success.should.equal true
