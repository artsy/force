import { type ShowAuthDialog, useAuthDialog } from "Components/AuthDialog"
import { getENV } from "Utils/getENV"
import Cookies from "cookies-js"
import { merge } from "lodash"
import { useEffect } from "react"

interface UseScrollToOpenAuthModal {
  key: string
  options: Parameters<ShowAuthDialog>[0]
}

export const useScrollToOpenAuthModal = ({
  key,
  options,
}: UseScrollToOpenAuthModal) => {
  const { showAuthDialog } = useAuthDialog()

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
        const payload = merge(
          {
            options: {
              onClose: dismiss,
              onSuccess: dismiss,
            },
          },
          options,
        )

        showAuthDialog(payload)
      }, 2000)
    }

    window.addEventListener("scroll", handleScroll, { once: true })

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [key, options, showAuthDialog])
}
