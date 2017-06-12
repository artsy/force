(function () {
  'use strict'

  $('.partner-profile-contact-email a').click(function (e) {
    analytics.track('Click',{
      partner_id: $(e.currentTarget).data('partner-id'),
      label: "Contact gallery by email"
    });
  })

  $('.partner-profile-contact-website a').click(function (e) {
    analytics.track('Click', {
      partner_id: $(e.currentTarget).data('partner-id'),
      label: "External partner site",
      destination_path: $(e.currentTarget).attr('href')
    })
  })
})()
