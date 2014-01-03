_         = require 'underscore'
Backbone  = require 'backbone'
JumpView  = require '../../components/jump/view.coffee'
mediator  = require '../../lib/mediator.coffee'

module.exports.AboutRouter = class AboutRouter extends Backbone.Router
  routes:
    'about': 'toTop'
    'about/:slug': 'toSection'

  initialize: ->
    @$header          = $('#main-layout-header')
    @$jumpContainer   = $('#about-page-jump')
    @jump             = new JumpView threshold: @_getThreshold()

    @$jumpContainer.html @jump.$el.css
      # Line up jump nav with container
      right: 'inherit'

  toTop: ->
    mediator.trigger 'scroll:top'

  toSection: (slug) ->
    _.defer => mediator.trigger 'scroll:position', @_positionFromSlug(slug)

  _positionFromSlug: (slug) ->
    section = slug.replace /\/about\/|\-/g, ''
    $("##{section}").offset().top - @$header.height()

  _getThreshold: ->
    $nav = $('#about-page-nav')
    $nav.offset().top + $nav.height()

module.exports.init = ->
  router = new AboutRouter

  $('#about-page-jump').on 'click', ->
    router.navigate '/about'

  $('#about-page-nav a').on 'click', (e) ->
    e.preventDefault()
    router.navigate $(this).attr('href'), { trigger: true }

  Backbone.history.start(pushState: true)
