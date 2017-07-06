(function () {
  'use strict'

  $(document).on('click', '.gallery-partnerships2-white-signup-button, .gallery-partnerships2-black-signup-button', function (e) {
    var $button = $(e.currentTarget)

    analytics.track('Click', {
      type: 'button',
      label: $button.data('label'),
      flow: 'partnership application',
      context_module: $button.data('section'),
      destination_path: null
    })
  })
})()