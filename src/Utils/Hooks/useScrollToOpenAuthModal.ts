import { getENV } from "Utils/getENV"
import { mediator } from "Server/mediator"
import { ModalOptions, ModalType } from "Components/Authentication/Types"
import { openAuthModal } from "Utils/openAuthModal"
import { useEffect } from "react"
import Cookies from "cookies-js"

interface UseScrollToOpenAuthModal {
  key: string
  modalOptions: ModalOptions
}

export const useScrollToOpenAuthModal = ({
  key,
  modalOptions,
}: UseScrollToOpenAuthModal) => {
  useEffect(() => {
    // Does not display if previously dismissed, is mobile, or is logged in
    if (Cookies.get(key) || getENV("IS_MOBILE") || getENV("CURRENT_USER")) {
      return
    }

    const dismiss = () => {
      Cookies.set(key, 1, { expires: 31536000 })
    }

    const handleScroll = () => {
      setTimeout(() => {
        openAuthModal(mediator, {
          mode: ModalType.signup,
          triggerSeconds: 2,
          ...modalOptions,
        })
      }, 2000)
    }

    window.addEventListener("scroll", handleScroll, { once: true })
    mediator.once("modal:closed", dismiss)
    mediator.once("auth:sign_up:success", dismiss)

    return () => {
      window.removeEventListener("scroll", handleScroll)
      mediator.off("modal:closed", dismiss)
      mediator.off("auth:sign_up:success", dismiss)
    }
  }, [key, modalOptions])
}
