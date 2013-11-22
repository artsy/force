_         = require 'underscore'
Backbone  = require 'backbone'
JumpView  = require '../../components/jump/view.coffee'
mediator  = require '../../lib/mediator.coffee'

module.exports.AboutRouter = class AboutRouter extends Backbone.Router
  routes:
    'about': 'scrollToTop'
    'about/:slug': 'scrollToSection'

  initialize: ->
    @view = new AboutView el: $('#about-page'), $header: $('#main-layout-header')
    mediator.on 'about:selected', @triggerSection, this

  triggerSection: (slug) ->
    @navigate slug, { trigger: true }

  scrollToTop: ->
    mediator.trigger 'scroll:top'

  scrollToSection: (slug) ->
    mediator.trigger 'scroll:position', @view.positionFromSlug(slug)

module.exports.AboutView = class AboutView extends Backbone.View
  events:
    'click #about-page-jump': 'toTop'
    'click #about-page-nav a': 'toSection'

  initialize: (options) ->
    { @$header }      = options
    @$jumpContainer   = @$('#about-page-jump')
    @jump             = new JumpView threshold: @_getThreshold()

    @$jumpContainer.html @jump.$el.css
      # Line up jump nav with container
      right: 'inherit'

  _getThreshold: ->
    $nav = @$('#about-page-nav')
    $nav.offset().top + $nav.height()

  toTop: ->
    mediator.trigger 'about:selected', 'about'

  toSection: (e) ->
    e.preventDefault()
    mediator.trigger 'about:selected', $(e.target).attr('href')

  positionFromSlug: (slug) ->
    section   = slug.replace(/\/about\/|\-/g, '')
    @$("##{section}").offset().top - @$header.height()

module.exports.init = ->
  @router = new AboutRouter
  Backbone.history.start(pushState: true)
