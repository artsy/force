_ = require 'underscore'
Modalize = require './view'

module.exports = (subView, options = {}) ->
  subView.modal = modal =
    new Modalize _.extend {}, subView: subView, options

  {
    view: modal
    subView: subView

    load: (callback) ->
      return if @opened
      $('body').prepend modal.__render__().$el.addClass 'is-loading'
      @opened = true
      callback =>
        modal.render().$el.removeClass 'is-loading'

    open: ->
      return if @opened
      $('body').prepend modal.render().$el
      @opened = true

    close: (callback = $.noop) ->
      modal.close _.wrap callback, (cb) =>
        cb()
        @opened = false
  }
