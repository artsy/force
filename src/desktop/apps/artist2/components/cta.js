import cta from 'desktop/apps/artist/client/cta.coffee'
import metaphysics from 'lib/metaphysics.coffee'
import Artist from 'desktop/models/artist.coffee'
import { data as sd } from 'sharify'

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
  }
}
`
const send = {
  method: 'post',
  query,
  variables: { artistID: sd.ARTIST_PAGE_CTA_ARTIST_ID },
}

if (sd.ARTIST_PAGE_CTA_ENABLED && sd.ARTIST_PAGE_CTA_ARTIST_ID) {
  metaphysics(send).then(({ artist }) => {
    cta(new Artist(artist))
  })
}
