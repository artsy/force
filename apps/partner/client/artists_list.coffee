_              = require 'underscore'
Backbone       = require 'backbone'
template       = -> require('../templates/artists_list.jade') arguments...

module.exports = class PartnerArtistsListView extends Backbone.View

  defaults:
    numberOfColumns: 6

  initialize: (options={}) ->
    { @numberOfColumns } = _.defaults options, @defaults
    @render()
    
  render: ->
    @$el.html template groups: @groupArtists(@collection)

  groupArtists: (pas) ->
    h = Math.ceil pas.length / @numberOfColumns

    groups = _.groupBy pas, (pa) -> pa.get 'represented_by'
    bigger  = label: "represented artists", list: groups.true or []
    smaller = label: "works available by", list: groups.false or []

    if bigger.list.length < smaller.list.length
      temp = bigger; bigger = smaller; smaller = temp
    if smaller.list.length is 0
      bigger.label = "artists"
 
    smaller.numOfCols = Math.ceil smaller.list.length / h
    bigger.numOfCols  = @numberOfColumns - smaller.numOfCols

    # Split arrays into columns
    for g in [bigger, smaller]
      g.cols = []; step = Math.ceil g.list.length / g.numOfCols
      for pa, i in g.list by step
        g.cols.push g.list.slice i, i + step
    
    _.filter [bigger, smaller], (g) -> g.list.length > 0
