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
    @fillCurrentRows @currentFairs()

  fillCurrentRows: (fairs) ->
    rows = []

    if fairs.length is 1
      rows.push @makeRow(fairs, 'full')
      return rows

    if fairs.length is 3 and (_.all fairs, (fair) -> fair.bannerSize() isnt 1)
      rows.push(@makeRow(fairs, 'three-third'))
      return rows

    for fair in fairs
      unless fair.has('in_row')
        switch fair.bannerSize()
          # x-large banner_size fairs get a full row
          when 1
            rows.push @makeRow [fair], "full"
            break
          # banner_size 'large' looks for another banner_size 'large' first,
          # if it doesn't find one then it looks for a banner_size 'medium' or 'small',
          # if not it settles for a two-third promo
          when 2
            neighbor = _.chain(fairs)
              .reject((f) -> f.id is fair.id)
              .reject((f) -> f.has('in_row'))
              .find((f) -> f.bannerSize() is 2)
              .value()

            if neighbor
              rows.push @makeRow [fair, neighbor], 'half'
              break

            neighbor = _.chain(fairs)
              .reject((f) -> f.id is fair.id)
              .reject((f) -> f.has('in_row'))
              .find((f) -> f.bannerSize() is 3 or f.bannerSize() is 4)
              .value()

            if neighbor
              rows.push @makeRow [fair, neighbor], 'two-third'
            else
              rows.push @makeRow [fair], 'two-third-promo'

            break
          # banner_size 'medium' looks for two more fairs to complete a row,
          # if not it settles for a half row,
          # if not that, it settles for a half promo
          when 3, 4
            neighbors = _.chain(fairs)
              .filter((f) -> f.bannerSize() is 3 or f.bannerSize() is 4)
              .reject((f) -> f.id is fair.id)
              .reject((f) -> f.has('in_row'))
              .take(2)
              .value()

            if neighbors.length is 2
              neighbors.unshift fair
              rows.push @makeRow neighbors, 'three-third'
            else if neighbors.length is 1
              neighbors.unshift fair
              rows.push @makeRow neighbors, 'half'
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





