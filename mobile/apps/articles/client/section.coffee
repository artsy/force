Backbone = require 'backbone'
VeniceBanner = require '../../../../desktop/components/venice_banner/index.coffee'

module.exports.SectionView = class SectionView extends Backbone.View

module.exports.init = ->
  new SectionView el: $('body')
  new VeniceBanner el: $('.venice-redirect-banner--articles')