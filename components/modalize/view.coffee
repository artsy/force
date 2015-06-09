_ = require 'underscore'
Backbone = require 'backbone'
template = require './templates/index.coffee'

module.exports = class Modalize extends Backbone.View
  className: 'modalize'

  defaults: dimensions: width: '400px'

  events:
    'click .js-modalize-backdrop': 'maybeClose'
    'click .js-modalize-close': 'close'

  initialize: (options = {}) ->
    { @subView, @dimensions } = _.defaults options, @defaults

  state: (state, callback = $.noop) ->
    _.defer =>
      @$el
        .attr 'data-state', state
        .one $.support.transition.end, callback
        .emulateTransitionEnd 250

  render: ->
    @$el.html template()
    @postRender()
    this

  postRender: ->
    @$('.js-modalize-body')
      .css @dimensions
      .html @subView.render().$el

    $('body').addClass 'is-with-modal'

    @state 'open'

  maybeClose: (e) ->
    @close() if $(e.target).hasClass('js-modalize-backdrop')

  close: (callback) ->
    $('body').removeClass 'is-with-modal'

    @state 'close', =>
      @remove()
      callback?()
