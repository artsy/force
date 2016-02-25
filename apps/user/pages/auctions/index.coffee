{ invoke } = require 'underscore'
Backbone = require 'backbone'
ActiveBidsView = require '../../components/active_bids/view.coffee'
template = -> require('./index.jade') arguments...

module.exports = class AuctionsView extends Backbone.View
  subViews: []

  className: 'settings-page__auctions'

  initialize: ({ @user }) -> #

  postRender: ->
    activeBidsView = new ActiveBidsView user: @user
    @$('.js-settings-section__main--active-bids')
      .html activeBidsView.render().$el
    activeBidsView.fetch()

    @subViews = [
      activeBidsView
    ]

  render: ->
    @$el.html template
      user: @user
    @postRender()
    this

  remove: ->
    invoke @subViews, 'remove'
