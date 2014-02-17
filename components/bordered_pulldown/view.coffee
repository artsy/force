_ = require 'underscore'
Backbone = require 'backbone'

module.exports = class BorderedPulldown extends Backbone.View

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