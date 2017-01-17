(function () {
  'use strict'

  analyticsHooks.on('show_number:displayed', function () {
    analytics.track("Displayed 'show phone number' button", {nonInteraction: 1})
  })

  analyticsHooks.on('partner:non-claimed', function (options) {
    analytics.track('Non-claimed partner page', _.extend(options, {nonInteraction: 1}))
  })

  $('#partner-contact .email-gallery').click(function (e) {
    analytics.track('Clicked Contact Gallery Via Email', {
      gallery_id: $(e.currentTarget).data('id')
    })
  })

  $('#partner-contact .partner-website').click(function (e) {
    analytics.track('Clicked Gallery Website', {
      gallery_id: $(e.currentTarget).data('id')
    })
  })
})()
