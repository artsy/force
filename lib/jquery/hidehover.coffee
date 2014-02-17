#
# For drop down menus that appear on hover you may want that menu to close once you click it.
# For these cases do `$el.click -> $(@).hidehover()` and the menu will hide and then remove
# the `display` property so the default CSS will kick in again.
#
$.fn.hidehover = ->
  $el = $(@)
  $el.css(display: 'none')
  setTimeout (-> $el.css display: ''), 200