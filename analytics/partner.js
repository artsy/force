(function () {
  'use strict'

  analyticsHooks.on('show_number:displayed', function () {
    analytics.track("Displayed 'show phone number' button", {nonInteraction: 1})
  })

  analyticsHooks.on('partner:non-claimed', function (options) {
    analytics.track('Non-claimed partner page', _.extend(options, {nonInteraction: 1}))
  })

  $('#partner-contact .email-gallery').click(function () {
    analytics.track('Clicked Contact Gallery Via Email', {
      gallery_id: sd.CURRENT_PATH.split('/')[1] // gallery id
    })
  })

  $('#partner-contact .partner-website').click(function () {
    analytics.track('Clicked Gallery Website', {
      gallery_id: sd.CURRENT_PATH.split('/')[1] // gallery id
    })
  })
})()
