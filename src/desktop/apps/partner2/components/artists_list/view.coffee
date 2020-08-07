_ = require 'underscore'
Backbone = require 'backbone'
PartnerArtists = require '../../../../collections/partner_artists.coffee'
require '../../../../../lib/promiseDone'
template = -> require('./index.jade') arguments...

module.exports = class PartnerArtistsListView extends Backbone.View

  defaults:
    linkToPartnerArtist: true # link to partner artist or artist page
    numberOfColumns: 6

  initialize: (options = {}) ->
    { @partner, @collection, @numberOfColumns, @linkToPartnerArtist } = _.defaults options, @defaults
    @distinguishRepresentedArtists = @partner.get('distinguish_represented_artists') != false # default true
    @collection ?= new PartnerArtists()
    @collection.url = "#{@partner.url()}/partner_artists?display_on_partner_profile=1"

  startUp: ->
    @fetch().then(@render).done()

  fetch: (forced = false) ->
    if @collection.length is 0 or forced
      @collection.reset() unless @collection.length is 0
      @collection.fetchUntilEndInParallel()
        .then =>
          # Display represented artists or non- ones who have published artworks
          @collection.filter (pa) ->
            pa.get('represented_by') or
            pa.get('published_artworks_count') > 0
    else
      new Promise (resolve) => resolve @collection.models

  render: (artists) =>
    return @remove() if artists.length is 0

    @$el.html template
      groups: @groupArtists(artists)
      linkToPartnerArtist: @linkToPartnerArtist

  groupArtists: (pas) ->
    if @distinguishRepresentedArtists
      groups = _.groupBy pas, (pa) -> pa.get 'represented_by'
      bigger = label: "represented artists", list: groups.true or []
      smaller = label: "works available by", list: groups.false or []

      if bigger.list.length < smaller.list.length
        temp = bigger; bigger = smaller; smaller = temp
      if smaller.list.length is 0
        bigger.label = ''
    else
      bigger = { label: '', list: pas}
      smaller = { list: [] }

    h = Math.ceil pas.length / @numberOfColumns
    smaller.numOfCols = Math.ceil smaller.list.length / h
    bigger.numOfCols = @numberOfColumns - smaller.numOfCols

    # Split arrays into columns
    for g in [bigger, smaller]
      quot = Math.floor g.list.length / g.numOfCols
      remd = g.list.length % g.numOfCols
      steps = _.map(_.range(g.numOfCols), (i) -> if i >= remd then quot else quot + 1)

      g.cols = []; i = 0
      for step in steps
        g.cols.push g.list.slice(i, i + step); i += step

    _.filter [bigger, smaller], (g) -> g.list.length > 0

  remove: ->
    @$el.closest('.partner2-overview-section').remove()
    super
