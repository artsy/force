_ = require 'underscore'
Backbone = require 'backbone'
View = require './view.coffee'
Jump = require '../../../components/jump/view.coffee'

module.exports = class PartnershipsRouter extends Backbone.Router
  routes:
    'gallery-partnerships': 'toTop'
    'gallery-partnerships/:slug': 'toSection'
    'institution-partnerships': 'toTop'
    'institution-partnerships/:slug': 'toSection'
    'auction-partnerships': 'toTop'
    'auction-partnerships/:slug': 'toSection'

  initialize: ->
    @$window = $(window)
    @$body = $('body')
    @view = new View el: @$body
    @setupJump()

  setupJump: ->
    @jump = new Jump threshold: @$window.height(), direction: 'bottom'
    @$body.append @jump.$el

  toTop: ->
    @jump.scrollToTop() if @$window.scrollTop() isnt 0

  toSection: (slug) ->
    $nav = $ '.partnerships-section-nav'
    selector = "##{slug}"
    @jump.scrollToPosition $(selector)?.offset()?.top - $nav.outerHeight() / 2
