import React from "react"
import { data as sd } from "sharify"
import qs from "querystring"
import { handleScrollingAuthModal } from "desktop/lib/openAuthModal"
import { ContextModule, Intent } from "@artsy/cohesion"
import { mediator } from "lib/mediator"

const Cookies = require("desktop/components/cookies/index.coffee")

export class AuthWrapper extends React.Component {
  public openModal

  UNSAFE_componentWillMount() {
    const hasCookie = Cookies.get("editorial-signup-dismissed")

    if (
      !hasCookie &&
      !this.isFromSailthru() &&
      !sd.IS_MOBILE &&
      !sd.CURRENT_USER
    ) {
      mediator.on("modal:closed", this.setDismissCookie)
      mediator.on("auth:sign_up:success", this.setDismissCookie)
      this.onOpenModal()
    }
  }

  isFromSailthru = () => {
    const params = qs.parse(location.search.replace(/^\?/, ""))

    if (params.utm_source || params.utm_content) {
      return (
        params.utm_source === "sailthru" ||
        params.utm_content.includes("st-", 0)
      )
    }
  }

  onOpenModal = () => {
    handleScrollingAuthModal({
      intent: Intent.viewEditorial,
      contextModule: ContextModule.popUpModal,
      copy: "Sign up for the best stories in art and visual culture",
      destination: location.href,
      afterSignUpAction: {
        action: "editorialSignup",
      },
    })
  }

  setDismissCookie = () => {
    Cookies.set("editorial-signup-dismissed", 1, { expires: 31536000 })
  }

  render() {
    return null
  }
}
