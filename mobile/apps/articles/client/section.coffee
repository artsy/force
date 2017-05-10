Backbone = require 'backbone'

module.exports.SectionView = class SectionView extends Backbone.View

  events:
    'click .venice-redirect-banner a.icon-close' : 'closeVeniceBanner'

  closeVeniceBanner: (e) ->
    e.preventDefault()
    $('.venice-redirect-banner').fadeOut()

module.exports.init = ->
  new SectionView el: $('body')