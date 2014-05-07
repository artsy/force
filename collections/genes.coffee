_               = require 'underscore'
sd              = require('sharify').data
Backbone        = require 'backbone'
Gene            = require '../models/gene.coffee'
{ API_URL } = require('sharify').data
{ Fetch, AToZ } = require 'artsy-backbone-mixins'

module.exports = class Genes extends Backbone.Collection

  _.extend @prototype, AToZ
  _.extend @prototype, Fetch(API_URL)

  model: Gene

  url: "#{sd.API_URL}/api/v1/genes"
