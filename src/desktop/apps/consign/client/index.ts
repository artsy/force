import $ from "jquery"

export const init = () => {
  $("body").on("click", "#consignments-open-faq-modal", e => {
    e.preventDefault()
    $(".consignments-faq").show()
    $("body").addClass("is-scrolling-disabled")
  })

  $("body").on("click", ".consignments-faq__close", e => {
    e.preventDefault()
    $(".consignments-faq").hide()
    $("body").removeClass("is-scrolling-disabled")
  })

  // Clicked the consign button in the consignments header
  $(document).on(
    "click",
    ".consignments-header .consignments-header__consign-button",
    function (e) {
      const buttonText = $(e.target).text()
      // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
      window.analytics.track("click", {
        type: "button",
        label: buttonText,
        flow: "consignments",
        destination_path: "/consign/submission/choose-artist",
        context_module: "sell your works",
      })
    }
  )

  // Clicked the consign button in the "How consignments work" section
  $(document).on(
    "click",
    ".consignments-how-consignments-work .consignments-section__consign-button",
    function (e) {
      const buttonText = $(e.target).text()
      // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
      window.analytics.track("click", {
        type: "button",
        label: buttonText,
        flow: "consignments",
        destination_path: "/consign/submission/choose-artist",
        context_module: "how consignments work",
      })
    }
  )

  // Clicked the consign button in the "top sale placements" section
  $(document).on(
    "click",
    ".consignments-top-sales .consignments-section__consign-button",
    function (e) {
      const buttonText = $(e.target).text()
      // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
      window.analytics.track("click", {
        type: "button",
        label: buttonText,
        flow: "consignments",
        destination_path: "/consign/submission/choose-artist",
        context_module: "top sale placements",
      })
    }
  )

  // Clicked the consign button in the "top sale placements" section
  $(document).on(
    "click",
    ".consignments-upcoming-sales .consignments-section__consign-button",
    function (e) {
      const buttonText = $(e.target).text()
      // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
      window.analytics.track("click", {
        type: "button",
        label: buttonText,
        flow: "consignments",
        destination_path: "/consign/submission/choose-artist",
        context_module: "upcoming partner sales",
      })
    }
  )

  // Clicked the consign button in the "start your submission" section
  $(document).on(
    "click",
    ".consignments-footer .consignments-header__consign-button",
    function (e) {
      const buttonText = $(e.target).text()
      // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
      window.analytics.track("click", {
        type: "button",
        label: buttonText,
        flow: "consignments",
        destination_path: "/consign/submission/choose-artist",
        context_module: "start your submission",
      })
    }
  )
}
