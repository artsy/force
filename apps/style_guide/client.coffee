_ = require 'underscore'

module.exports.init = ->
  $('.sg-component-rendered a:not([disabled])').click (e) ->
    e.preventDefault()
    ($this = $(this)).addClass 'is-loading'
    _.delay ->
      $this.removeClass 'is-loading'
    , 1000