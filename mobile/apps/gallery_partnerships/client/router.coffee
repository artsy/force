_ = require 'underscore'
Backbone = require 'backbone'
View = require './view.coffee'

module.exports = class GalleryPartnershipsRouter extends Backbone.Router
  routes:
    'gallery-partnerships': 'toTop'
    'gallery-partnerships/:slug': 'toSection'

  initialize: ->
    @$window = $(window)
    @$body = $('body')
    @view = new View el: @$body

  toSection: (slug) ->
    selector = "##{slug}"
    @$window.scrollTop $(selector)?.offset()?.top
