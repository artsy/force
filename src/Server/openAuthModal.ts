import { ModalOptions, ModalType } from "Components/Authentication/Types"
import { mediator } from "Server/mediator"

/**
 * Open authentication modal via 'click' trigger
 */
export const openAuthModal = (mode: ModalType, options: ModalOptions) => {
  mediator.trigger("open:auth", {
    mode,
    ...options,
  })
}
