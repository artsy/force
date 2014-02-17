_ = require 'underscore'
Backbone = require 'backbone'

module.exports = class BorderedPulldown extends Backbone.View

  initialize: ->
    @optionHeight = @$('.bordered-pulldown-toggle').outerHeight()

  events:
    'click .bordered-pulldown-options a': 'select'
    'mouseover': 'show'
    'mouseout': 'hide'

  select: (e) ->
    $a = $(e.currentTarget)
    $a.addClass('bordered-pulldown-active')
    @$('.bordered-pulldown-options').css 'margin-top': -@optionHeight * $a.index()
    @$('.bordered-pulldown-text').text $a.text()
    @hide()

  show: ->
    @$('.bordered-pulldown-options').show()

  hide: ->
    @$('.bordered-pulldown-options').hide()