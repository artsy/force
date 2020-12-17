import $ from "jquery"
;(function () {
  "use strict"

  $(".partner-profile-contact-email a").click(function (e) {
    window.analytics.track("Click", {
      label: "Contact gallery by email",
      partner_id: $(e.currentTarget).data("partner-id"),
    })
  })

  $(".partner-profile-contact-website a").click(function (e) {
    window.analytics.track("Click", {
      destination_path: $(e.currentTarget).attr("href"),
      label: "External partner site",
      partner_id: $(e.currentTarget).data("partner-id"),
    })
  })
})()
