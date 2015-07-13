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

  aroundDate: (date) ->
    start = moment(date).subtract(1, 'month')
    end = moment(date).add(1, 'month')

    new Fairs @filter (fair)->
      moment(fair.get('start_at')).isBetween start, end 

  currentRows: (date) ->
    fairs = @chain()
      .filter((fair) -> fair.isCurrent(date))
      .sortBy((fair) -> fair.get('tier'))
      .value()

    @fillCurrentRows fairs

  fillCurrentRows: (fairs) ->

    rows = []

    if fairs.length is 1
      rows.push @makeRow([fairs], 'full')
      return rows 
    
    if fairs.length is 3 and (_.every fairs, (fair) -> fair.get('tier') isnt 1)
      rows.push(@makeRow(fairs, 'three-third')) 
      return rows

    for fair in fairs
      unless fair.has('in_row')
        switch fair.get('tier')
          # highest tier fairs get a full row
          when 1
            rows.push @makeRow [fair], "full"
            break 
          # tier two looks for another tier 2 first, 
          # if it doesn't find one then it looks for a tier 3,
          # if not it settles for a two-third promo
          when 2
            neighbor = _.find fairs, (f) ->
              

            if neighbor
              rows.push @makeRow [fair, neighbor], 'half'
              break

            neighbor = _.find fairs, (f) -> 
              !f.has('in_row') and (f.get('tier') is 3 or f.get('tier') is 4) and f.id isnt fair.id
            
            if neighbor
              rows.push @makeRow [fair, neighbor], 'two-third'
            else
              rows.push @makeRow [fair], 'two-third-promo'
            
            break
          # tier 3 looks for two more fairs to complete a row,
          # if not it settles for a half row,
          # if not that, it settles for a half promo
          when 3, 4
            neighbors = _.chain(fairs)
              .filter((f) -> 
                !f.has('in_row') and (f.get('tier') is 3 or f.get('tier') is 4) and f.id isnt fair.id)
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
        
      
      
    

