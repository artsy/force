_ = require 'underscore'
Backbone = require 'backbone'
template = -> require('../templates/artists_list.jade') arguments...

module.exports = class PartnerArtistsListView extends Backbone.View

  defaults:
    linkToPartnerArtist: true # link to partner artist or artist page
    numberOfColumns: 6

  initialize: (options={}) ->
    { @numberOfColumns, @linkToPartnerArtist } = _.defaults options, @defaults
    @render()

  render: ->
    if @collection.length is 0
      @$el.html """
        <div class="artists-group artists-group-6-columns">
          <h2 class="avant-garde-header-center artists-group-label">No Results</h2>
        </div>
      """
    else
      @$el.html template
        groups: @groupArtists(@collection)
        linkToPartnerArtist: @linkToPartnerArtist

  groupArtists: (pas) ->
    h = Math.ceil pas.length / @numberOfColumns

    groups = _.groupBy pas, (pa) -> pa.get 'represented_by'
    bigger = label: "represented artists", list: groups.true or []
    smaller = label: "works available by", list: groups.false or []

    if bigger.list.length < smaller.list.length
      temp = bigger; bigger = smaller; smaller = temp
    if smaller.list.length is 0
      bigger.label = "artists"

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
