import { ContextModule, Intent } from "@artsy/cohesion"
import { useAuthDialog } from "Components/AuthDialog"
import { getENV } from "Utils/getENV"
import Cookies from "cookies-js"
import { useEffect } from "react"

const KEY = "artist-page-signup-dismissed"

const dismiss = () => {
  Cookies.set(KEY, 1, { expires: 31536000 })
}

export const useScrollToOpenArtistAuthModal = ({
  name,
}: {
  name: string | null | undefined
}) => {
  const { showAuthDialog } = useAuthDialog()

  useEffect(() => {
    // Is enabled by server-side middleware
    if (!getENV("ARTIST_PAGE_CTA_ENABLED")) return

    // Does not display if previously dismissed, is mobile, or is logged in
    if (Cookies.get(KEY) || getENV("IS_MOBILE") || getENV("CURRENT_USER")) {
      return
    }

    let timeout: ReturnType<typeof setTimeout> | null = null

    const handleScroll = () => {
      timeout = setTimeout(() => {
        showAuthDialog({
          options: {
            seoImage: true,
            onClose: dismiss,
            onSuccess: dismiss,
            title: `Sign up or log in to discover new works by ${
              name || "this artist"
            } and more artists you love`,
          },
          analytics: {
            contextModule: ContextModule.popUpModal,
            intent: Intent.viewArtist,
            trigger: "scroll",
          },
        })
      }, 2000)
    }

    window.addEventListener("scroll", handleScroll, { once: true })

    return () => {
      window.removeEventListener("scroll", handleScroll)
      if (timeout) clearTimeout(timeout)
    }
  }, [name, showAuthDialog])
}
