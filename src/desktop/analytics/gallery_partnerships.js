;(function() {
  'use strict'

  $(document).on(
    'click',
    '.gallery-partnerships2-white-signup-button, .gallery-partnerships2-black-signup-button',
    function(e) {
      var $button = $(e.currentTarget)

      analytics.track('Click', {
        type: 'button',
        label: $button.data('label'),
        flow: 'partnership application',
        context_module: $button.data('section'),
        destination_path: null,
      })
    }
  )

  $(document).on('click', '.gallery-partnership-link', function(e) {
    analytics.track('Click', {
      type: 'link',
      flow: 'gallery application',
      destination_path: 'https://www.artsy.net/gallery-partnerships',
      context_module: $(e.currentTarget).data('context'),
    })
  })
})()
