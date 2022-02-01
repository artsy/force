import Cookies from "cookies-js"
import { Component } from "react"
import { data as sd } from "sharify" // eslint-disable-line no-restricted-imports

import { ActionType, AuthModalType, AuthService } from "@artsy/cohesion"
import { handleSubmit, setCookies } from "v2/Apps/Authentication/Utils/helpers"
import { ModalManager } from "v2/Components/Authentication/ModalManager"
import { ModalOptions, ModalType } from "v2/Components/Authentication/Types"
import { mediator } from "lib/mediator"

interface SocialAuthArgs extends ModalOptions {
  service: AuthService
}

export class ModalContainer extends Component<any> {
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
      auth_redirect: redirectTo || destination,
      context_module: contextModule,
      modal_copy: copy,
      intent,
      service,
      trigger: "timed",
      trigger_seconds: triggerSeconds,
      user_id: sd.CURRENT_USER && sd.CURRENT_USER.id,
    }

    let analyticsOptions
    if (mode === "signup") {
      analyticsOptions = {
        action: ActionType.createdAccount,
        ...options,
        type: AuthModalType.signup,
        onboarding: !redirectTo,
      }
    } else {
      analyticsOptions = {
        action: ActionType.successfullyLoggedIn,
        ...options,
        type: AuthModalType.login,
      }
    }

    Cookies.set(`analytics-${mode}`, JSON.stringify(analyticsOptions), {
      expires: 60 * 60 * 24,
    })
  }

  render() {
    return (
      // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
      <ModalManager
        ref={ref => (this.manager = ref)}
        // FIXME: reaction migration
        // @ts-ignore
        submitUrls={{
          login: sd.AP.loginPagePath,
          signup: sd.AP.signupPagePath,
          apple: sd.AP.applePath,
          facebook: sd.AP.facebookPath,
          google: sd.AP.googlePath,
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
