// import $ from "jquery"
import metaphysics from "lib/metaphysics.coffee"
// import Artist from "desktop/models/artist.coffee"
import { once } from "lodash"
import { data as sd } from "sharify"
const mediator = require("../../../lib/mediator.coffee")
// import ArtistPageCTAView from "desktop/components/artist_page_cta/view.coffee"

const query = `
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

if (sd.ARTIST_PAGE_CTA_ENABLED && sd.ARTIST_PAGE_CTA_ARTIST_ID) {
  metaphysics(send).then(({ artist: artistData }) => {
    const image =
      artistData.artworks &&
      artistData.artworks[0] &&
      artistData.artworks[0].image &&
      artistData.artworks[0].image.cropped &&
      artistData.artworks[0].image.cropped.url

    // const artist = new Artist(artistData)
    // const view = new ArtistPageCTAView({ artist })
    // $("body").append(view.render().$el)
    // view.initializeMailcheck()
    // setTimeout(() => {
    //   view.$el.removeClass("initial")
    // }, 500)

    if (!sd.CURRENT_USER && !sd.IS_MOBILE) {
      window.addEventListener(
        "scroll",
        once(() => {
          setTimeout(() => {
            mediator.trigger("open:auth", {
              mode: "signup",
              intent: "signup",
              signupIntent: "signup",
              trigger: "click",
              destination: location.href,
              image,
            })
          }, 2000)
        }),
        { once: true }
      )
    }
  })
}
