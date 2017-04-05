_ = require 'underscore'
Backbone = require 'backbone'
bootstrap = require '../../components/layout/bootstrap'
sd = require('sharify').data

module.exports.ArtistsView = class ArtistsView extends Backbone.View

module.exports.init = ->
  bootstrap()
  new ArtistsView
    el: $ 'body'
