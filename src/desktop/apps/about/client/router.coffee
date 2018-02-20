_ = require 'underscore'
Backbone = require 'backbone'
AboutView = require './view.coffee'
JumpView = require '../../../components/jump/view.coffee'

module.exports = class AboutRouter extends Backbone.Router
  routes:
    'about': 'toTop'
    'about/:slug': 'toSection'

  initialize: ->
    @$window = $(window)
    @$body = $('body')
    @view = new AboutView el: @$body
    @setupJump()

  setupJump: ->
    @jump = new JumpView threshold: @$window.height(), direction: 'bottom'
    @$body.append @jump.$el

  toTop: ->
    @jump.scrollToTop() if @$window.scrollTop() isnt 0

  toSection: (slug) ->
    @view.$spinner.attr 'data-state', 'loading'
    @view.loadUptoSection selector = "##{slug}", =>
      @view.$spinner.attr 'data-state', 'loaded'
      @jump.scrollToPosition @sectionPosition(selector) + 1

  sectionPosition: (selector) ->
    # May not exist if old route
    $(selector)?.offset()?.top
