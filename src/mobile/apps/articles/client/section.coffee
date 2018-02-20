Backbone = require 'backbone'

module.exports.SectionView = class SectionView extends Backbone.View

module.exports.init = ->
  new SectionView el: $('body')