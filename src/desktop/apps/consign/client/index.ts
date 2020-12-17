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
      window.analytics.track("click", {
        context_module: "sell your works",
        destination_path: "/consign/submission/choose-artist",
        flow: "consignments",
        label: buttonText,
        type: "button",
      })
    }
  )

  // Clicked the consign button in the "How consignments work" section
  $(document).on(
    "click",
    ".consignments-how-consignments-work .consignments-section__consign-button",
    function (e) {
      const buttonText = $(e.target).text()
      window.analytics.track("click", {
        context_module: "how consignments work",
        destination_path: "/consign/submission/choose-artist",
        flow: "consignments",
        label: buttonText,
        type: "button",
      })
    }
  )

  // Clicked the consign button in the "top sale placements" section
  $(document).on(
    "click",
    ".consignments-top-sales .consignments-section__consign-button",
    function (e) {
      const buttonText = $(e.target).text()
      window.analytics.track("click", {
        context_module: "top sale placements",
        destination_path: "/consign/submission/choose-artist",
        flow: "consignments",
        label: buttonText,
        type: "button",
      })
    }
  )

  // Clicked the consign button in the "top sale placements" section
  $(document).on(
    "click",
    ".consignments-upcoming-sales .consignments-section__consign-button",
    function (e) {
      const buttonText = $(e.target).text()
      window.analytics.track("click", {
        context_module: "upcoming partner sales",
        destination_path: "/consign/submission/choose-artist",
        flow: "consignments",
        label: buttonText,
        type: "button",
      })
    }
  )

  // Clicked the consign button in the "start your submission" section
  $(document).on(
    "click",
    ".consignments-footer .consignments-header__consign-button",
    function (e) {
      const buttonText = $(e.target).text()
      window.analytics.track("click", {
        context_module: "start your submission",
        destination_path: "/consign/submission/choose-artist",
        flow: "consignments",
        label: buttonText,
        type: "button",
      })
    }
  )
}
