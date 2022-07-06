import { getENV } from "v2/Utils/getENV"
import { mediator } from "lib/mediator"
import { ModalOptions, ModalType } from "v2/Components/Authentication/Types"
import { openAuthModal } from "v2/Utils/openAuthModal"
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

    const setCookie = () => {
      console.log("set cookie")
      Cookies.set(key, 1, { expires: 31536000 })
    }

    const handleScroll = () => {
      console.log("handle scroll")
      setTimeout(() => {
        openAuthModal(mediator, {
          mode: ModalType.signup,
          triggerSeconds: 2,
          ...modalOptions,
        })
      }, 2000)
    }

    window.addEventListener("scroll", handleScroll, { once: true })
    mediator.once("modal:closed", setCookie)
    mediator.once("auth:sign_up:success", setCookie)

    return () => {
      window.removeEventListener("scroll", handleScroll)
      mediator.off("modal:closed", setCookie)
      mediator.off("auth:sign_up:success", setCookie)
    }
  }, [key, modalOptions])
}
