(function () {
  'use strict'

  $(document).on('click', '.ba__email-signup-button, .ba__facebook-signup-button', function (e) {
    var $button = $(e.currentTarget)

    analytics.track('Click', {
      label: 'Collector Marketing Landing Page',
      type: 'link',
      context_module: $button.data('section'),
      destination_path: $button.attr('href')
    })
  })

})()