import Cookies from "cookies-js"
import { useEffect } from "react"
import { fetchQuery, graphql } from "react-relay"
import { useSystemContext } from "System"
import { getENV } from "Utils/getENV"
import { useScrollToOpenArtistAuthModalQuery } from "__generated__/useScrollToOpenArtistAuthModalQuery.graphql"
import { extractNodes } from "Utils/extractNodes"
import { openAuthModal } from "Utils/openAuthModal"
import { mediator } from "Server/mediator"
import { ModalType } from "Components/Authentication/Types"
import { ContextModule, Intent } from "@artsy/cohesion"

const KEY = "artist-page-signup-dismissed"

const dismiss = () => {
  Cookies.set(KEY, 1, { expires: 31536000 })
}

export const USE_SCROLL_TO_OPEN_ARTIST_AUTH_MODAL_QUERY = graphql`
  query useScrollToOpenArtistAuthModalQuery($id: String!) {
    artist(id: $id) {
      name
      filterArtworksConnection(
        first: 1
        marketable: true
        sort: "-decayed_merch"
      ) {
        edges {
          node {
            image {
              cropped(width: 450, height: 1075) {
                src
              }
            }
          }
        }
      }
    }
  }
`

export const useScrollToOpenArtistAuthModal = () => {
  const { relayEnvironment } = useSystemContext()

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

      const [artwork] = extractNodes(artist.filterArtworksConnection)

      if (!artwork) return

      const image = artwork.image?.cropped?.src

      const handleScroll = () => {
        setTimeout(() => {
          openAuthModal(mediator, {
            contextModule: ContextModule.popUpModal,
            copy: `Sign up to discover new works by ${artist.name} and more artists you love`,
            // TODO: Onboarding is triggered based on contents of redirectTo
            // prop. Move this to `afterSignupAction` prop
            redirectTo: location.href,
            image,
            intent: Intent.viewArtist,
            mode: ModalType.signup,
            triggerSeconds: 4,
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
    }

    init()
  }, [relayEnvironment])
}
