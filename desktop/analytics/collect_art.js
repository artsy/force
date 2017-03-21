(function () {
  'use strict'

  $(document).on('click', '.ba__email-signup-button, .ba__facebook-signup-button, .collect-art-signup-button', function (e) {
    var $button = $(e.currentTarget)

    analytics.track('Click', {
      type: 'button',
      label: $button.data('label'),
      context_module: $button.data('section'),
      destination_path: $button.attr('href')
    })
  })

})()