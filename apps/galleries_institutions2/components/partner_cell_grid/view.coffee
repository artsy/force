Backbone = require 'backbone'
{ CURRENT_USER } = require('sharify').data
PartnerCell = require '../partner_cell/view.coffee'
{ Following } = require '../../../../components/follow_button/index.coffee'
Profile = require '../../../../models/profile.coffee'
template = -> require('./index.jade') arguments...

module.exports = class PartnerCellGrid extends Backbone.View
  initialize: ( options = {  } ) ->
    @partners = options.partners

  setupFollowing: ->
    @following = new Following([], kind: 'profile') if CURRENT_USER?
    profileIds = partners.pluck('default_profile_id')
    @following?.syncFollows profileIds

  postRender: ->
    @cells = @$('.partner-cell').map (el) =>
      id = ($el = $(el)).data 'id'
      cell = new PartnerCell
        partner: @partners.get(id)
        following: @following
      $el.html = cell.render().$el
      cell
    this

  render: ->
    @$el.html template partners:partners
    _.defer => @postRender()
    this
    