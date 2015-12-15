Backbone = require 'backbone'
FollowButtonView = require '../../../../components/follow_button/view.coffee'
template = -> require('./index.jade') arguments...

module.exports = class PartnerCellView extends Backbone.View
  className: 'partner-cell'

  initialize: ({ @following, @partner }) ->
    { @profile, @locations } = @partner.related()

    @listenTo @partner, 'sync', @render
    @listenTo @profile, 'sync', @render
    @listenTo @locations, 'sync', @render

  postRender: ->
    @followButton = new FollowButtonView
      el: @$('.js-follow-button')
      following: @following
      model: @profile
      modelName: 'profile'

  render: ->
    @$el.html template
      partner: @partner
    @postRender()
    this
