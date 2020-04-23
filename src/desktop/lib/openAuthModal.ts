import {
  ModalType,
  ModalOptions,
} from "reaction/Components/Authentication/Types"
import { data as sd } from "sharify"

const mediator = require("desktop/lib/mediator.coffee")

/**
 * Open authentication modal via 'click' trigger
 */
export const openAuthModal = (mode: ModalType, options: ModalOptions) => {
  mediator.trigger("open:auth", {
    mode,
    ...options,
  })
}

/**
 * Set up scroll event to open authentication modal via 'timed' trigger
 * Opens 2 seconds after first scroll by default
 */
export const handleScrollingAuthModal = (options: ModalOptions) => {
  if (sd.CURRENT_USER || sd.IS_MOBILE) {
    return
  }
  const modalOptions = Object.assign(
    {
      triggerSeconds: 2,
    },
    options
  )
  window.addEventListener(
    "scroll",
    () => {
      setTimeout(() => {
        openAuthModal(ModalType.signup, modalOptions)
      }, 2000)
    },
    { once: true }
  )
}
