import React from 'react'
import { createFragmentContainer, graphql } from 'react-relay'

export const ArtistArtworks = createFragmentContainer(
  props => {
    return (
      <div>
        {props.artworks.map((artwork, index) => {
          return (
            <div key={index}>
              <h2>{artwork.artist.name}</h2>
              <h4>Gallery: {artwork.partner.name}</h4>
            </div>
          )
        })}
      </div>
    )
  },
  graphql`
    fragment ArtistArtworks_artworks on Artwork @relay(plural: true) {
      artist {
        name
      }
      meta {
        title
      }
      partner {
        name
      }
    }
  `
)
