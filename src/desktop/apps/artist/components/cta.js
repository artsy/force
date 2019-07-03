import * as $ from "jquery"
import { data as sd } from "sharify"

const metaphysics = require("lib/metaphysics.coffee")
const Artist = require("desktop/models/artist.coffee")
const ArtistPageCTAView = require("desktop/components/artist_page_cta/view.coffee")
const mediator = require("desktop/lib/mediator.coffee")
// Uncomment when we are ready to launch a/b test
// const split_test = require("desktop/components/split_test.coffee")
// split_test.view()

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

    if (sd.ARTIST_PAGE_SIGNUP_MODAL_QA === "experiment") {
      if (!sd.CURRENT_USER && !sd.IS_MOBILE) {
        window.addEventListener(
          "scroll",
          () => {
            setTimeout(() => {
              mediator.trigger("open:auth", {
                copy: `Join Artsy to discover new works by ${
                  artistData.name
                } and more artists you love`,
                mode: "signup",
                intent: "signup",
                signupIntent: "signup",
                trigger: "scroll",
                triggerSeconds: 2,
                destination: location.href,
                image,
              })
            }, 2000)
          },
          { once: true }
        )
      }
    } else {
      const artist = new Artist(artistData)
      const view = new ArtistPageCTAView({ artist })
      $("body").append(view.render().$el)
      view.initializeMailcheck()
      setTimeout(() => {
        view.$el.removeClass("initial")
      }, 500)
    }
  })
}
