{ isTouchDevice } = require '../util/device.coffee'

module.exports =
  firstVisibleInput: ($el) ->
    $el.find('input:visible, textarea:visible').first()

  moveCursorToEnd: ($input) ->
    val = $input.val()
    $input.val('').val val

  autofocus: ($input) ->
    return if isTouchDevice()
    $input.focus()
    @moveCursorToEnd $input
