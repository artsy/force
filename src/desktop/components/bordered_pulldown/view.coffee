_ = require 'underscore'
Backbone = require 'backbone'
sd = require('sharify').data

module.exports = class BorderedPulldown extends Backbone.View

  initialize: ->
    @fixEigenClickEvents() if sd.EIGEN

  fixEigenClickEvents: ->
    @$('a').click (e) ->
      e.preventDefault()
      $pulldown = $(e.currentTarget).closest('.bordered-scrollable-pulldown')
      location.assign $(e.currentTarget).attr('href') if $pulldown.hasClass('is-open')
      $pulldown.addClass('is-open')
    @$el.on 'mouseleave', (e) ->
      $(e.currentTarget).removeClass('is-open')

  events:
    'click .bordered-pulldown-options a': 'select'

  select: (e) ->
    $a = $(e.currentTarget)
    $a.addClass('bordered-pulldown-active')
    @$('.bordered-pulldown-options').css(
      'margin-top': -@$('.bordered-pulldown-toggle').outerHeight() * $a.index()
    )
    @$('.bordered-pulldown-text').text $a.text()
    @$('.bordered-pulldown-options').hidehover()
