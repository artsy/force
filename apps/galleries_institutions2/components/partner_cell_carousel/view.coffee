Backbone = require 'backbone'
template = -> require('./template.jade') arguments...
{ CURRENT_USER } = require('sharify').data
PartnerCell = require '../partner_cell/view.coffee'
{ Following } = require '../../../../components/follow_button/index.coffee'
Profile = require '../../../../models/profile.coffee'

module.exports = class PartnerCellCarousel extends Backbone.View
  initialize: ({@partners}) ->

  setupFollowing: ->
    @following = new Following([], kind: 'profile') if CURRENT_USER?
    profileIds = partners.pluck('default_profile_id')
    @following?.syncFollows profileIds

  renderCells: ->
    @cells = @$('.partner-cell').map (i, el) =>
      id = ($el = $(el)).data 'id'
      cell = new PartnerCell
        model: @partners.get(id)
        following: @following
        el: el
      cell.fetchMetadata()
      cell
    this

