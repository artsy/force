import { get } from "lodash"
import { data as sd } from "sharify"
import { handleScrollingAuthModal } from "desktop/lib/openAuthModal"
const Cookies = require("desktop/components/cookies/index.coffee")
const mediator = require("desktop/lib/mediator.coffee")
import { AuthIntent, ContextModule } from "@artsy/cohesion"
const metaphysics = require("lib/metaphysics.coffee")

export const query = `
query ArtistCTAQuery($artistID: String!) {
  artist(id: $artistID) {
    name
    artworks(size: 1) {
      image {
        cropped(width: 390, height: 644) {
          url
        }
      }
    }
  }
}
`
const send = {
  method: "post",
  query,
  variables: { artistID: sd.ARTIST_PAGE_CTA_ARTIST_ID },
}
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
    return metaphysics(send).then(({ artist: artistData }) => {
      const image = get(artistData, "artworks[0].image.cropped.url")
      mediator.on("modal:closed", setCookie)
      handleScrollingAuthModal({
        copy: `Join Artsy to discover new works by ${artistData.name} and more artists you love`,
        intent: AuthIntent.viewArtist,
        triggerSeconds: 4,
        destination: location.href,
        image,
        contextModule: ContextModule.popUpModal,
      })
    })
  }
}
