_ = require 'underscore'
{ isTouchDevice } = require '../util/device.coffee'

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

module.exports = ->
  touch = isTouchDevice()

  ($pulldowns = $('.hover-pulldown'))
    .attr 'data-mode', (if touch then 'touch' else 'hover')

  return unless touch

  $pulldowns.on 'click', activatePulldown
