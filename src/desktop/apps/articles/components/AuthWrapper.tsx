import React from "react"
import { data as sd } from "sharify"
import qs from "querystring"
import Waypoint from "react-waypoint"
import { once } from "lodash"
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
      const timedModal = () => setTimeout(this.onOpenModal, 2000)
      this.openModal = once(timedModal)
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
    mediator.trigger("open:auth", {
      mode: "signup",
      intent: "Viewed editorial",
      signupIntent: "signup",
      trigger: "timed",
      triggerSeconds: 2,
      copy: "Sign up for the Best Stories in Art and Visual Culture",
      destination: location.href,
    })
  }

  setDismissCookie = () => {
    Cookies.set("editorial-signup-dismissed", 1, { expires: 31536000 })
  }

  render() {
    return <Waypoint topOffset={100} onPositionChange={this.openModal} />
  }
}
