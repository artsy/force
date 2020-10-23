import Cookies from "cookies-js"
import React from "react"
import { data as sd } from "sharify"

import {
  AuthService,
  createdAccount,
  successfullyLoggedIn,
} from "@artsy/cohesion"
import { handleSubmit, setCookies } from "../helpers"
import { ModalManager } from "v2/Components/Authentication/Desktop/ModalManager"
import { ModalOptions, ModalType } from "v2/Components/Authentication/Types"
import { mediator } from "lib/mediator"

interface SocialAuthArgs extends ModalOptions {
  service: AuthService
}

export class ModalContainer extends React.Component<any> {
  public manager: ModalManager | null

  UNSAFE_componentWillMount() {
    mediator.on("open:auth", this.onOpenAuth)
    mediator.on("auth:error", this.onAuthError)
  }

  onOpenAuth = (options: ModalOptions) => {
    options.destination = options.destination || location.href
    if (options && (options.mode as any) === "register") {
      options.mode = ModalType.signup
    }

    setCookies(options)
    setTimeout(
      () => {
        if (this.manager) {
          this.manager.openModal(options)
        }
      },
      document.readyState === "complete" ? 0 : 500
    )
  }

  onAuthError = (err: any) => {
    if (this.manager) {
      this.manager.setError(err)
    }
  }

  onSocialAuthEvent = ({
    contextModule,
    copy,
    destination,
    intent,
    mode,
    redirectTo,
    service,
    triggerSeconds,
  }: SocialAuthArgs) => {
    const options = {
      authRedirect: redirectTo || destination,
      contextModule,
      copy,
      intent,
      service,
      triggerSeconds,
      userId: sd.CURRENT_USER && sd.CURRENT_USER.id,
    }

    let analyticsOptions
    if (mode === "signup") {
      analyticsOptions = createdAccount({
        onboarding: !redirectTo,
        ...options,
      })
    } else {
      analyticsOptions = successfullyLoggedIn(options)
    }

    Cookies.set(`analytics-${mode}`, JSON.stringify(analyticsOptions), {
      expires: 60 * 60 * 24,
    })
  }

  render() {
    return (
      <ModalManager
        ref={ref => (this.manager = ref)}
        // FIXME: reaction migration
        // @ts-ignore
        submitUrls={{
          login: sd.AP.loginPagePath,
          signup: sd.AP.signupPagePath,
          apple: sd.AP.applePath,
          facebook: sd.AP.facebookPath,
          twitter: sd.AP.twitterPath,
        }}
        csrf={Cookies && Cookies.get && Cookies.get("CSRF_TOKEN")}
        handleSubmit={handleSubmit}
        onSocialAuthEvent={this.onSocialAuthEvent}
        onModalClose={() => {
          mediator.trigger("modal:closed")
        }}
        showRecaptchaDisclaimer={true}
      />
    )
  }
}
