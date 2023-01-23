import { ModalOptions, ModalType } from "Components/Authentication/Types"
import { mediator } from "Server/mediator"

/**
 * @deprecated Use `useAuthDialog` hook instead
 */
export const openAuthModal = (mode: ModalType, options: ModalOptions) => {
  mediator.trigger("open:auth", {
    mode,
    ...options,
  })
}
