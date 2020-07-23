_ = require 'underscore'
sd = require('sharify').data
Backbone = require 'backbone'
Genes = require '../../collections/genes'
{ Fetch } = require 'artsy-backbone-mixins'

module.exports.index = (req, res, next) ->
  results = []

  new Backbone.Collection().fetch
    url: "#{sd.API_URL}/api/v1/sets?key=artists:featured-genes"
    cache: true
    error: res.backboneError
    success: (sets) ->
      id = sets.models[0].get('id')
      (new Genes).fetch
        url: "#{sd.API_URL}/api/v1/set/#{id}/items"
        cache: true
        error: res.backboneError
        success: (genes) ->
          res.render 'index', { genes: genes.models }
