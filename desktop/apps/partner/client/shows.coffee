_ = require 'underscore'
sd = require('sharify').data
Backbone = require 'backbone'
CurrentUser = require '../../../models/current_user'
Partner = require '../../../models/partner'
PartnerShows = require '../../../collections/partner_shows'
PartnerShowsGrid = require './shows_grid'
template = -> require('../templates/shows.jade') arguments...

module.exports = class PartnerShowsView extends Backbone.View

  initialize: (options={}) ->
    { @profile, @partner } = options
    @$el.html template()
    @initializeShows()

  initializeShows: ->
    new PartnerShowsGrid
      el: @$('#partner-shows')
      partner: @partner
      numberOfFeatured: if @profile.isGallery() then 0 else 1
