_ = require 'underscore'
Backbone = require 'backbone'
AboutView = require './view.coffee'
JumpView = require '../../../components/jump/view.coffee'

module.exports = class AboutRouter extends Backbone.Router
  routes:
    'about2': 'toTop'
    'about2/:slug': 'toSection'

  initialize: ->
    @$window = $(window)
    @$body = $('body')
    @view = new AboutView el: @$body
    @setupJump()

  setupJump: ->
    @jump = new JumpView threshold: @$window.height(), direction: 'bottom'
    @$body.append @jump.$el

  toTop: ->
    if @$window.scrollTop() isnt 0
      @jump.scrollToTop()

  toSection: (slug) ->
    _.defer =>
      @jump.scrollToPosition (@sectionPositionFromSlug(slug) + 1)

  sectionPositionFromSlug: (slug) ->
    # May not exist if old route
    $("##{slug}")?.offset()?.top
