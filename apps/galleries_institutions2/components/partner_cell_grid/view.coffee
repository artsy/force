Backbone = require 'backbone'
PartnerCell = require '../partner_cell/view.coffee'
{ Following } = require '../../../../components/follow_button/index.coffee'
Profile = require '../../../../models/profile.coffee'
template = -> require('./index.jade') arguments...

module.exports = class PartnerCellGrid extends Backbone.View
  initialize: ( options = {  } ) ->
    @partners = options.partners

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
