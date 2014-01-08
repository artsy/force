_             = require 'underscore'
sd            = require('sharify').data
Backbone      = require 'backbone'
Gene          = require '../models/gene.coffee'
aToZ          = require './mixins/a_to_z.coffee'
fetchUntilEnd = require './mixins/fetch_until_end.coffee'

module.exports = class Genes extends Backbone.Collection

  _.extend @prototype, aToZ
  _.extend @prototype, fetchUntilEnd

  model: Gene

  url: "#{sd.ARTSY_URL}/api/v1/genes"
