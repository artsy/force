import Cookies from "cookies-js"
import { useEffect } from "react"
import { fetchQuery, graphql } from "react-relay"
import { useSystemContext } from "System/useSystemContext"
import { getENV } from "Utils/getENV"
import { useScrollToOpenArtistAuthModalQuery } from "__generated__/useScrollToOpenArtistAuthModalQuery.graphql"
import { ContextModule, Intent } from "@artsy/cohesion"
import { useAuthDialog } from "Components/AuthDialog"

const KEY = "artist-page-signup-dismissed"

const dismiss = () => {
  Cookies.set(KEY, 1, { expires: 31536000 })
}

export const USE_SCROLL_TO_OPEN_ARTIST_AUTH_MODAL_QUERY = graphql`
  query useScrollToOpenArtistAuthModalQuery($id: String!) {
    artist(id: $id) {
      name
    }
  }
`

export const useScrollToOpenArtistAuthModal = () => {
  const { relayEnvironment } = useSystemContext()

  const { showAuthDialog } = useAuthDialog()

  useEffect(() => {
    if (!relayEnvironment) return

    // Is enabled by server-side middleware
    if (!getENV("ARTIST_PAGE_CTA_ENABLED")) return

    // Does not display if previously dismissed, is mobile, or is logged in
    if (Cookies.get(KEY) || getENV("IS_MOBILE") || getENV("CURRENT_USER")) {
      return
    }

    const id = getENV("ARTIST_PAGE_CTA_ARTIST_ID")

    if (!id) return

    const init = async () => {
      const response = await fetchQuery<useScrollToOpenArtistAuthModalQuery>(
        relayEnvironment,
        USE_SCROLL_TO_OPEN_ARTIST_AUTH_MODAL_QUERY,
        { id: id }
      ).toPromise()

      const artist = response?.artist

      if (!artist) return

      const handleScroll = () => {
        setTimeout(() => {
          showAuthDialog({
            mode: "SignUp",
            options: {
              image: true,
              onClose: dismiss,
              onSuccess: dismiss,
              title: mode => {
                const action = mode === "SignUp" ? "Sign up" : "Log in"
                return `${action} to discover new works by ${artist.name} and more artists you love`
              },
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
      }
    }

    init()
  }, [relayEnvironment, showAuthDialog])
}
