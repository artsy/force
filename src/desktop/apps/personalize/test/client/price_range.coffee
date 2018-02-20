_ = require 'underscore'
benv = require 'benv'
Backbone = require 'backbone'
sinon = require 'sinon'
PersonalizeState = require '../../client/state'
CurrentUser = require '../../../../models/current_user.coffee'
{ fabricate } = require 'antigravity'
{ resolve } = require 'path'

describe 'PriceRangeView', ->
  before (done) ->
    benv.setup =>
      benv.expose { $: benv.require 'jquery' }
      Backbone.$ = $
      $.support.transition = { end: 'transitionend' }
      $.fn.emulateTransitionEnd = -> @trigger $.support.transition.end
      @PriceRangeView = benv.requireWithJadeify resolve(__dirname, '../../client/views/price_range'), ['template']
      done()

  after ->
    benv.teardown()

  beforeEach ->
    @user = new CurrentUser fabricate 'user'
    @state = new PersonalizeState user: @user
    @view = new @PriceRangeView(state: @state, user: @user)
    @view.state.set current_step: 'price_range'
    @view.render()

  describe '#flip', ->
    beforeEach ->
      @$target = @view.$('.flipper').eq(0)

    it 'sets the price_range attribute on the user', ->
      @$target.click()
      @view.user.get('price_range_min').should.equal '-1'
      @view.user.get('price_range_max').should.equal '500'

  describe '#render', ->
    it 'renders the view', ->
      html = @view.$el.html()
      html.should.containEql 'What price range are you considering?'
      _.each _.pluck(@view.prices, 'display'), (price) ->
        html.should.containEql price
