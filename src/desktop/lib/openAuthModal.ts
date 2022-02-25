import { ModalOptions, ModalType } from "v2/Components/Authentication/Types"
import { mediator } from "lib/mediator"
import { getENV } from "v2/Utils/getENV"

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
  if (getENV("CURRENT_USER") || getENV("IS_MOBILE")) {
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
