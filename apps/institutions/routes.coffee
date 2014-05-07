_             = require 'underscore'
sd            = require('sharify').data
Backbone      = require 'backbone'
OrderedSets   = require '../../collections/ordered_sets.coffee'
Profiles      = require '../../collections/profiles'

@index = (req, res) ->
  institutions = new OrderedSets(key: 'institutions')
  institutions.fetch({ cache: true }).then ->
    institutions = institutions.first()
    profiles = new Profiles([], { models: [] })
    currentLength = profiles.length
    options =
      data   : { size: 20 }
      url    : "#{sd.API_URL}/api/v1/set/#{institutions.get('id')}/items"
      cache  : true
      success: ->
        aToZGroup = profiles.groupByAlphaWithColumns 3
        res.render 'template',
          aToZGroup   : aToZGroup
          partnerCount: profiles.length
    profiles.fetchUntilEnd options
