import { mediator } from "lib/mediator"
import type { LogoutEventOptions } from "lib/mediator"
import { MODAL_EROR_OPEN } from "v2/Components/Modal/FlashModal"

export function logoutEventHandler(
  options: LogoutEventOptions = {}
): Promise<void> {
  const redirectPath = options.redirectPath

  return fetch("/users/sign_out", {
    headers: {
      // TODO: To trick the logout page into thinking we made and xhr request
      "X-Requested-With": "XMLHttpRequest",
    },
    method: "DELETE",
  })
    .then(() => {
      if (window.analytics && window.analytics.reset) {
        // guard for aggressive ad blockers
        window.analytics.reset()
      }
      if (redirectPath) {
        location.assign(redirectPath)
      } else {
        location.reload()
      }
    })
    .catch(message => {
      mediator.trigger(MODAL_EROR_OPEN, { message })
    })
}
