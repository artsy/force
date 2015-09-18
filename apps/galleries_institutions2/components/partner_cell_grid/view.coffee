Backbone = require 'backbone'
{ CURRENT_USER } = require('sharify').data
PartnerCell = require '../partner_cell/view.coffee'
{ Following } = require '../../../../components/follow_button/index.coffee'
Profile = require '../../../../models/profile.coffee'

module.exports = class PartnerCellGrid extends Backbone.View
  initialize: ( options = {} ) ->
    @$el = options.$el
    partners = options.partners
    profileIds = partners.pluck('default_profile_id')

    following = new Following([], kind: 'profile') if CURRENT_USER?

    following?.syncFollows profileIds

    @$('.partner-cell').each ->
      id = ($el = $(this)).data 'id'
      new PartnerCell
        $el: $el
        partner: partners.get id
        following: following


