_             = require 'underscore'
sd            = require('sharify').data
Backbone      = require 'backbone'
CurrentUser   = require '../../../models/current_user.coffee'
Partner       = require '../../../models/partner.coffee'
PartnerShows  = require '../../../collections/partner_shows.coffee'
template      = -> require('../templates/shows.jade') arguments...

module.exports = class PartnerShowsView extends Backbone.View

  initialize: (options={}) ->
    { @profile, @partner } = options
    @collection ?= new PartnerShows()
    @initializeShows()

  render: ->
    @$el.html $( template(
      featured: @featured
      current: @current.models
      upcoming: @upcoming.models
      past: @past.models
    ))

  initializeShows: ->
    return if @isFetchedAllShows

    @renderLoading()
    data = sort: "-featured,-end_at", size: 30
    @collection.url = "#{@partner.url()}/shows"
    @collection.fetchUntilEnd
      data: data
      success: =>
        @isFetchedAllShows = true
        @organizeShows()
        @hideLoading()
        @render()

  organizeShows: ->
    @featured = if @profile.isGallery() then null else @collection.featured()
    exclude   = if @profile.isGallery() then [] else [@featured]
    @current  = @collection.current exclude
    @upcoming = @collection.upcoming exclude
    @past     = @collection.past exclude

  renderLoading: ->
    unless @$loadingSpinner?
      @$el.after( @$loadingSpinner = $('<div class="loading-spinner"></div>') )
    @$loadingSpinner.show()

  hideLoading: -> @$loadingSpinner.hide()
