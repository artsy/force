module.exports = (options = {}, predicate) ->
  { $input, message } = options

  if predicate $input.val()
    $alertable = $('<div class="alertable-input"/>')
      .attr 'data-alert', message

    $input
      .wrap $alertable
      .one 'focus', ->
        $input
          .unwrap()
          .focus()

    true
  else
    false
