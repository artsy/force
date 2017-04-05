Backbone = require 'backbone'
_ = require 'underscore'
{ Cities } = require '../../../../components/partner_cities/index'
FollowButtonView = require '../../../../components/follow_button/view'
ViewHelpers = require './view_helpers'
Profile = require '../../../../models/profile'
template = -> require('./index.jade') arguments...

module.exports = class PartnerCellView extends Backbone.View
  className: 'partner-cell'

  initialize: ({ @following, @partner, @preferredCitySlug }) ->

  postRender: -> _.defer =>
    @followButton = new FollowButtonView
      el: @$('.js-follow-button')
      following: @following
      model: new Profile @partner.profile
      context_module: 'Rails'
      modelName: 'profile'
      context_page: "Galleries / Institutions page"


  render: ->
    city = _.findWhere Cities, slug: @preferredCitySlug if @preferredCitySlug
    @$el.html template
      partner: @partner
      preferredCity: city?.name
      ViewHelpers: ViewHelpers
    @postRender()
    this
