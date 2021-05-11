import $ from "jquery"
;(function () {
  "use strict"

  $(".partner-profile-contact-email a").click(function (e) {
    // @ts-expect-error STRICT_NULL_CHECK
    window.analytics.track("Click", {
      partner_id: $(e.currentTarget).data("partner-id"),
      label: "Contact gallery by email",
    })
  })

  $(".partner-profile-contact-website a").click(function (e) {
    // @ts-expect-error STRICT_NULL_CHECK
    window.analytics.track("Click", {
      partner_id: $(e.currentTarget).data("partner-id"),
      label: "External partner site",
      destination_path: $(e.currentTarget).attr("href"),
    })
  })
})()
