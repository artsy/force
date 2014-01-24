_               = require 'underscore'
sd              = require('sharify').data
Backbone        = require 'backbone'
Gene            = require '../models/gene.coffee'
{ GRAVITY_URL } = require('sharify').data
{ Fetch, AToZ } = require 'artsy-backbone-mixins'

module.exports = class Genes extends Backbone.Collection

  _.extend @prototype, AToZ
  _.extend @prototype, Fetch(GRAVITY_URL)

  model: Gene

  url: "#{sd.ARTSY_URL}/api/v1/genes"
