import $ from "jquery"
;(function () {
  "use strict"

  $(".partner-profile-contact-email a").click(function (e) {
    // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
    window.analytics.track("Click", {
      partner_id: $(e.currentTarget).data("partner-id"),
      label: "Contact gallery by email",
    })
  })

  $(".partner-profile-contact-website a").click(function (e) {
    // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
    window.analytics.track("Click", {
      partner_id: $(e.currentTarget).data("partner-id"),
      label: "External partner site",
      destination_path: $(e.currentTarget).attr("href"),
    })
  })
})()
