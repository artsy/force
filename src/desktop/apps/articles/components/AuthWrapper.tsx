import React from "react"
import { data as sd } from "sharify"
import qs from "querystring"
import { handleScrollingAuthModal } from "desktop/lib/openAuthModal"
import { AuthIntent, ContextModule } from "@artsy/cohesion"

const Cookies = require("desktop/components/cookies/index.coffee")
const mediator = require("desktop/lib/mediator.coffee")

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
      intent: AuthIntent.viewEditorial,
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
