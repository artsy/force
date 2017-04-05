_ = require 'underscore'
{ isTouchDevice } = require '../util/device'
Cookies = require '../cookies/index'

transitionLength = 250
dismissalLimit = 15

activatePulldown = (e) ->
  return if @activated
  @activated = true

  e.preventDefault()

  ($this = $(this)).attr 'data-state', 'active'

  ($backdrop = $('<div class="hover-pulldown-backdrop"/>')).insertAfter($this)
    .on 'click', (e) =>
      e.preventDefault()
      e.stopPropagation()

      $this.attr 'data-state', 'inactive'
      $backdrop.remove()

      @activated = false

dismissStatic = (e) ->
  $el = $(this)

  if cookie = $el.data 'cookie'
    persistCount cookie, dismissalLimit

  if isTouchDevice()
    $el.removeAttr 'data-state'
  else
    targetHeight = $el.find('.hover-pulldown-menu').outerHeight()

    ($static = $el.find('.hover-pulldown-static'))
      .addClass('is-fade-out')
      .animate { height: targetHeight }, transitionLength, ->
        _.delay ->
          $el.removeAttr 'data-state'
        , transitionLength

tickDismissal = (cookie) ->
  return unless cookie?
  n = parseInt(Cookies.get cookie) or 0
  return if n >= dismissalLimit
  persistCount cookie, (n + 1)

persistCount = (cookie, n) ->
  Cookies.set cookie, n, expires: (60 * 60 * 24 * 365)

module.exports = ->
  touch = isTouchDevice()

  ($pulldowns = $('.hover-pulldown'))
    .attr 'data-mode', (if touch then 'touch' else 'hover')

  $pulldowns.filter('[data-state="static"]')
    .mouseenter(dismissStatic)
    .each ->
      tickDismissal $(this).data('cookie')

  return unless touch

  $pulldowns.on 'click', activatePulldown
