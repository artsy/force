module.exports = (options = {}, predicate) ->
  { $input, message, $submit, label } = options

  if predicate $input.val()
    $alertable = $('<div class="alertable-input"/>')
      .attr 'data-alert', message

    if $submit? and label?
      original = $submit.text()
      $submit.text label

    $input
      .trigger 'alert'
      .wrap $alertable
      .one 'focus', ->
        $input
          .unwrap()
          .focus()

        if original?
          $submit.text original

    true
  else
    false
