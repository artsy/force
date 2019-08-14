import * as $ from "jquery"
import { data as sd } from "sharify"

const metaphysics = require("lib/metaphysics.coffee")
const Artist = require("desktop/models/artist.coffee")
const ArtistPageCTAView = require("desktop/components/artist_page_cta/view.coffee")

export const query = `
query ArtistCTAQuery($artistID: String!) {
  artist(id: $artistID) {
    href
    name
    cta_image: image {
      thumb: resized(width: 150, version: "square") {
        url
      }
    }
    cta_artists: artists(size: 1) {
      image {
        thumb: resized(width: 150, version: "square") {
          url
        }
      }
      name
    }
  }
}
`
const send = {
  method: "post",
  query,
  variables: { artistID: sd.ARTIST_PAGE_CTA_ARTIST_ID },
}

export const setupArtistSignUpModal = () => {
  if (sd.ARTIST_PAGE_CTA_ENABLED && sd.ARTIST_PAGE_CTA_ARTIST_ID) {
    return metaphysics(send).then(({ artist: artistData }) => {
      if (!artistData) {
        return
      }
      const artist = new Artist(artistData)
      const view = new ArtistPageCTAView({ artist })
      $("body").append(view.render().$el)
      view.initializeMailcheck()
      setTimeout(() => {
        view.$el.removeClass("initial")
      }, 500)
    })
  }
}
