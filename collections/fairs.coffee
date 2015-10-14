_ = require 'underscore'
sd = require('sharify').data
moment = require 'moment'
Backbone = require 'backbone'
Fair = require '../models/fair.coffee'
{ API_URL } = require('sharify').data
{ Fetch } = require 'artsy-backbone-mixins'

module.exports = class Fairs extends Backbone.Collection

  _.extend @prototype, Fetch(API_URL)

  model: Fair

  url: "#{sd.API_URL}/api/v1/fairs"

  currentFairs: ->
    @chain()
      .filter((fair) -> fair.isCurrent())
      .sortBy((fair) -> fair.bannerSize())
      .value()

  currentRows: ->
    @fillRows @currentFairs()

  fillRows: (fairs) ->
    rows = []

    if fairs.length is 1
      rows.push @makeRow(fairs, 'full')
      return rows

    for fair in fairs
      unless fair.has('in_row')
        switch fair.bannerSize()
          # x-large banner_size fairs get a full row
          when 1
            rows.push @makeRow [fair], "full"
            break
          # every other size gets a half row
          else
            neighbor = _.chain(fairs)
              .reject((f) -> f.id is fair.id)
              .reject((f) -> f.has('in_row'))
              .find((f) -> f.bannerSize() isnt 1)
              .value()

            if neighbor
              rows.push @makeRow [fair, neighbor], 'half'
            else
              rows.push @makeRow [fair], 'half-promo'
            break
    rows

  makeRow: (fairs, type) ->
    _.each fairs, (fair) -> fair.set 'in_row', true

    {
      fairs: fairs
      type: type
    }

  # pastFairs is the array of links to the previous fairs,
  # since this should only include fairs that have microsites,
  # we filter on has_full_feature.
  # this also allows us to set a fair for the future and
  # have a countdown to the preview
  pastYearRoundFairs: ->
    @filter (fair) ->
      fair.isNotOver() && fair.get('has_full_feature')




