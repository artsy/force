module.exports = class Element
  constructor: ($el) ->
    $el = $($el) unless $el instanceof $
    @$el = $el
    @recalculate()

  recalculate: ->
    @top = @$el.position().top
    @bottom = @top + @$el.outerHeight()
