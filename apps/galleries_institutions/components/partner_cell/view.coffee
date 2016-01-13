Backbone = require 'backbone'
FollowButtonView = require '../../../../components/follow_button/view.coffee'
ViewHelpers = require './view_helpers.coffee'
Profile = require '../../../../models/profile.coffee'
template = -> require('./index.jade') arguments...

module.exports = class PartnerCellView extends Backbone.View
  className: 'partner-cell'

  initialize: ({ @following, @partner, @preferredCity }) ->
    @listenTo this, 'postRender', @postRender

  postRender: ->
    @followButton = new FollowButtonView
      el: @$('.js-follow-button')
      following: @following
      model: new Profile @partner.profile
      modelName: 'profile'

  render: ->
    @$el.html template
      partner: @partner
      preferredCity: @preferredCity
      ViewHelpers: ViewHelpers
    @trigger 'postRender'
    this
