// Events ported from apps/artwork/components/contact.coffee
// & components/contact/inquiry.coffee

(function () {
  'use strict'

  // DOM events
  var $document = $(document)

  $document.on('click', '.js-send-embedded-inquiry', function () {
    analytics.track('Clicked "Contact Gallery" button', {
      id: $(this).data('artwork-id'),
      prequalify: (sd.ARTWORK && sd.ARTWORK.partner && sd.ARTWORK.partner.pre_qualify)
    })
  })

  $document.on('mouseover', '.js-send-embedded-inquiry', function () {
    analytics.track('Hovered over contact form \'Send\' button', {
      id: $(this).data('artwork-id')
    })
  })
})()
