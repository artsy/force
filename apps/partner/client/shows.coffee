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
    @initShows()

  render: ->
    @$el.html $( template(
      featured: @featured
      current: @current.models
      upcoming: @upcoming.models
      past: @past.models
    ))

  initShows: ->
    return if @isFetchedAll
    data = sort: "-featured,-end_at", size: 30
    @collection.url = "#{@partner.url()}/shows"
    @collection.fetchUntilEnd
      data: data
      success: =>
        @featured = @collection.featured()
        @current = @collection.current [@featured]
        @upcoming = @collection.upcoming [@featured]
        @past = @collection.past [@featured]
        @isFetchedAll = true
        
        @render()

  renderLoading: ->
    unless @$loadingSpinner?
      @$el.after( @$loadingSpinner = $('<div class="loading-spinner"></div>') )
    @$loadingSpinner.show()

  hideLoading: -> @$loadingSpinner.hide()
