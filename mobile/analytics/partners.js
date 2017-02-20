(function () {
  'use strict'

  $('.partner-profile-contact-email a').click(function (e) {
    analytics.track('Clicked Contact Gallery Via Email', {
      partner_id: $(e.currentTarget).data('partner-id'),
      partner_slug: $(e.currentTarget).data('partner-slug')
    })
  })

  $('.partner-profile-contact-website a').click(function (e) {
    analytics.track('Clicked Gallery Website', {
      partner_id: $(e.currentTarget).data('partner-id'),
      partner_slug: $(e.currentTarget).data('partner-slug')
    })
  })
})()
