_              = require 'underscore'
sd             = require('sharify').data
Backbone       = require 'backbone'
CurrentUser    = require '../../../models/current_user.coffee'
Partner        = require '../../../models/partner.coffee'
Artist         = require '../../../models/artist.coffee'
PartnerArtists = require '../../../collections/partner_artists.coffee'
artistsListTemplate    = -> require('../templates/artists_list.jade') arguments...
artistsDetailsTemplate = -> require('../templates/artists_details.jade') arguments...
template       = -> require('../templates/artists.jade') arguments...

module.exports = class PartnerArtistsView extends Backbone.View

  defaults:
    artistsListColumnSize: 6

  initialize: (options={}) ->
    { @profile, @partner, @artistsListColumnSize } = _.defaults options, @defaults
    @collection ?= new PartnerArtists()
    @initializeArtists()
    @render()

  render: ->
    @$el.html $( template() )

  initializeArtists: ->
    @collection.url = "#{@partner.url()}/partner_artists"
    @collection.fetchUntilEnd
      cache: true
      success: => @renderArtistsList()

  renderArtistsList: ->
    @$el.find('#artists-list').html(
      $( artistsListTemplate groups: @groupPartnerArtists(@collection) )
    )

  groupPartnerArtists: (pas) ->
    h = Math.ceil pas.length / @artistsListColumnSize
    groups = pas.groupBy (pa) -> pa.get('represented_by') or false

    bigger  = label: "represented artists", list: groups.true or []
    smaller = label: "works available by", list: groups.false or []
    if bigger.list.length < smaller.list.length
      temp = bigger; bigger = smaller; smaller = temp
    if smaller.list.length is 0
      bigger.label = "artists"
 
    smallerCols = Math.ceil(smaller.list.length / h)
    biggerCols = @artistsListColumnSize - smallerCols

    smaller.cols = _.values _.groupBy smaller.list, (pa, i) -> i % smallerCols
    bigger.cols = _.values _.groupBy bigger.list, (pa, i) -> i % biggerCols
    
    _.reduce [bigger, smaller], ((m, g) -> m.push(g) if g.cols.length > 0; m), []

  renderLoading: ->
    unless @$loadingSpinner?
      @$el.after( @$loadingSpinner = $('<div class="loading-spinner"></div>') )
    @$loadingSpinner.show()

  hideLoading: -> @$loadingSpinner.hide()
