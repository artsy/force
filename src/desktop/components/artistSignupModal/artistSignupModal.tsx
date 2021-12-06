import { get } from "lodash"
import { data as sd } from "sharify"
import { handleScrollingAuthModal } from "desktop/lib/openAuthModal"
import { ContextModule, Intent } from "@artsy/cohesion"
import { mediator } from "lib/mediator"
import Cookies from "desktop/components/cookies/index"

const { metaphysics2 } = require("lib/metaphysics2")

export const query = `
query ArtistCTAQuery($artistID: String!) {
  artist(id: $artistID) {
    name
    filterArtworksConnection(first: 1, marketable: true, sort: "-decayed_merch") {
      edges {
        node {
          image {
            cropped(width: 390, height: 644) {
              url
            }
          }
        }
      }
    }
  }
}
`

export const setCookie = () => {
  Cookies.set("artist-page-signup-dismissed", 1, { expires: 3600 })
}
export const setupArtistSignUpModal = () => {
  const artistPageAuthDismissedCookie = Cookies.get(
    "artist-page-signup-dismissed"
  )

  if (
    sd.ARTIST_PAGE_CTA_ENABLED &&
    sd.ARTIST_PAGE_CTA_ARTIST_ID &&
    !artistPageAuthDismissedCookie
  ) {
    return metaphysics2({
      method: "post",
      query,
      variables: { artistID: sd.ARTIST_PAGE_CTA_ARTIST_ID },
    }).then(({ artist: artistData }) => {
      const image = get(
        artistData,
        "filterArtworksConnection.edges[0].node.image.cropped.url"
      )
      mediator.on("modal:closed", setCookie)
      handleScrollingAuthModal({
        copy: `Join Artsy to discover new works by ${artistData.name} and more artists you love`,
        intent: Intent.viewArtist,
        triggerSeconds: 4,
        destination: location.href,
        image,
        contextModule: ContextModule.popUpModal,
      })
    })
  }
}
